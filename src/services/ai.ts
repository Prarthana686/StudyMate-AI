import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const getGeminiResponse = async (prompt: string, systemInstruction?: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I'm having trouble processing that right now. Please try again.";
  }
};

export const generateQuiz = async (subject: string, difficulty: string, count: number) => {
  try {
    const prompt = `Generate a ${difficulty} difficulty quiz about ${subject} with ${count} multiple choice questions. 
    Return the response in JSON format matching this schema:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": number, // index of options (0-3)
          "explanation": "string"
        }
      ]
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correctAnswer: { type: Type.NUMBER },
                  explanation: { type: Type.STRING }
                },
                required: ["question", "options", "correctAnswer", "explanation"]
              }
            }
          },
          required: ["questions"]
        }
      }
    });

    return JSON.parse(response.text || '{"questions": []}');
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    return { questions: [] };
  }
};

export const generateStudyPlan = async (data: { examDate: string, subjects: string[], hoursPerDay: number, weakSubjects: string[] }) => {
  try {
    const prompt = `Create a personalized study plan for a student preparing for exams on ${data.examDate}. 
    Subjects: ${data.subjects.join(", ")}. 
    Hours per day: ${data.hoursPerDay}. 
    Weak subjects to prioritize: ${data.weakSubjects.join(", ")}.
    Return a JSON object with a daily schedule and priority tasks.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            plan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.STRING },
                  tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
                  focus: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || '{"plan": []}');
  } catch (error) {
    console.error("Study Plan Error:", error);
    return { plan: [] };
  }
};
