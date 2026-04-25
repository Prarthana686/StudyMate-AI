export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export type DashboardTab = 
  | 'home' 
  | 'ask-ai' 
  | 'planner' 
  | 'quiz' 
  | 'summarizer' 
  | 'motivation' 
  | 'tutor' 
  | 'tracker' 
  | 'settings';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface StudyPlanDay {
  day: string;
  tasks: string[];
  focus: string;
}
