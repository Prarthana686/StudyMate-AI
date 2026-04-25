import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BrainCircuit, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Trophy,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { generateQuiz } from '../../services/ai';
import { QuizQuestion } from '../../types';
import { cn } from '../../lib/utils';

export default function QuizGenerator() {
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [count, setCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const startQuiz = async () => {
    if (!subject) return;
    setIsLoading(true);
    setQuestions([]);
    setCurrentStep(0);
    setScore(0);
    setShowResults(false);
    
    const result = await generateQuiz(subject, difficulty, count);
    setQuestions(result.questions || []);
    setIsLoading(false);
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === questions[currentStep].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const restart = () => {
    setQuestions([]);
    setShowResults(false);
    setSubject('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      {!questions.length && !showResults ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 md:p-16 text-center shadow-sm"
        >
          <div className="w-20 h-20 rounded-3xl bg-brand-500 flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-brand-500/20">
            <BrainCircuit className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">Quiz Generator</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-sm mx-auto">
            Test your knowledge by generating custom quizzes from any subject using AI.
          </p>

          <div className="max-w-md mx-auto space-y-6 text-left">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">Subject / Topic</label>
              <input 
                type="text"
                placeholder="e.g. Quantum Physics, Javascript, World War II..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">Difficulty</label>
                <select 
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-800 dark:text-white focus:outline-none"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">Questions</label>
                <select 
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-800 dark:text-white focus:outline-none"
                >
                  <option>3</option>
                  <option>5</option>
                  <option>10</option>
                </select>
              </div>
            </div>

            <button 
              onClick={startQuiz}
              disabled={!subject || isLoading}
              className="w-full py-5 rounded-2xl bg-brand-600 text-white font-bold text-lg hover:bg-brand-700 shadow-xl shadow-brand-500/30 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? (
                 <Sparkles className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Generate Quiz
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      ) : showResults ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 text-center shadow-xl"
        >
          <div className="w-24 h-24 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 mx-auto mb-8">
            <Trophy className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-display font-black text-slate-900 dark:text-white mb-2">Quiz Results</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 uppercase tracking-widest font-bold">You scored {score} out of {questions.length}</p>
          
          <div className="grid grid-cols-3 gap-4 mb-10">
             <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50">
               <div className="text-2xl font-black text-brand-600">{Math.round((score/questions.length)*100)}%</div>
               <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Accuracy</div>
             </div>
             <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50">
               <div className="text-2xl font-black text-brand-600">{score}</div>
               <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Correct</div>
             </div>
             <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50">
               <div className="text-2xl font-black text-brand-600">{questions.length - score}</div>
               <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Wrong</div>
             </div>
          </div>

          <button 
            onClick={restart}
            className="px-10 py-4 rounded-2xl bg-brand-600 text-white font-bold hover:bg-brand-700 shadow-xl shadow-brand-500/20 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Try Another Quiz
          </button>
        </motion.div>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="font-bold text-slate-900 dark:text-white">{subject} Quiz</h3>
                   <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">{difficulty} · Question {currentStep + 1} of {questions.length}</p>
                </div>
             </div>
             <div className="bg-slate-200 dark:bg-slate-800 h-1.5 w-48 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-brand-500" 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
             </div>
          </div>

          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm"
          >
            <div className="p-10 md:p-14">
               <h2 className="text-2xl md:text-3xl font-display font-medium text-slate-900 dark:text-white mb-10 leading-tight">
                  {questions[currentStep].question}
               </h2>

               <div className="grid gap-4">
                  {questions[currentStep].options.map((opt, i) => {
                    const isCorrect = i === questions[currentStep].correctAnswer;
                    const isSelected = i === selectedAnswer;
                    
                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={isAnswered}
                        className={cn(
                          "w-full p-6 rounded-2xl border text-left transition-all flex items-center justify-between group",
                          !isAnswered 
                            ? "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700 hover:border-brand-500 hover:bg-white dark:hover:bg-slate-800" 
                            : isCorrect 
                              ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-900 dark:text-emerald-400"
                              : isSelected
                                ? "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-900 dark:text-red-400"
                                : "bg-slate-50 dark:bg-slate-800 opacity-40 border-slate-200 dark:border-slate-700"
                        )}
                      >
                        <span className="font-medium">{opt}</span>
                        {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                        {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500" />}
                      </button>
                    );
                  })}
               </div>

               <AnimatePresence>
                 {isAnswered && (
                   <motion.div 
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: 'auto' }}
                     className="mt-8 p-6 rounded-2xl bg-brand-50 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-900/50 flex gap-4"
                   >
                     <HelpCircle className="w-6 h-6 text-brand-500 shrink-0 mt-1" />
                     <div>
                       <div className="font-bold text-brand-700 dark:text-brand-400 mb-1">Explanation</div>
                       <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{questions[currentStep].explanation}</p>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
            
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
               <button 
                disabled={!isAnswered}
                onClick={nextQuestion}
                className="px-8 py-3 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-700 disabled:opacity-30 flex items-center gap-2 group transition-all"
               >
                 {currentStep < questions.length - 1 ? 'Next Question' : 'View Results'}
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
