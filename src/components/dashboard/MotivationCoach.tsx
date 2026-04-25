import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  Quote, 
  Coffee, 
  Brain,
  ShieldCheck,
  Target
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { getGeminiResponse } from '../../services/ai';

export default function MotivationCoach() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [quote, setQuote] = useState("Success is not final, failure is not fatal: it is the courage to continue that counts.");
  const [author, setAuthor] = useState("Winston Churchill");
  const [isGeneratingQuote, setIsGeneratingQuote] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const generateQuote = async () => {
    setIsGeneratingQuote(true);
    const prompt = "Generate a short, powerful motivational quote for a student who is feeling overwhelmed by exams. Format: 'Quote' - Author";
    const response = await getGeminiResponse(prompt, "You are a world-class life coach and academic mentor.");
    
    const parts = response.split(' - ');
    if (parts.length >= 2) {
      setQuote(parts[0].replace(/"/g, ''));
      setAuthor(parts[1]);
    } else {
      setQuote(response.replace(/"/g, ''));
      setAuthor('StudyMate Coach');
    }
    setIsGeneratingQuote(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-8 md:px-12 shadow-sm">
         <div className="text-center md:text-left flex-1">
            <h2 className="text-4xl font-display font-black text-slate-900 dark:text-white mb-4">You got this! 🚀</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
               Motivation is what gets you started. Habit is what keeps you going. Let's finish this session strong.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
               <div className="px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest border border-brand-100 dark:border-brand-800 flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4" /> Anti-Procrastination Mode Active
               </div>
               <div className="px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest border border-amber-100 dark:border-amber-800 flex items-center gap-2">
                 <Target className="w-4 h-4" /> Daily Goal: 4 Hours
               </div>
            </div>
         </div>
         <div className="relative group">
            <div className="absolute inset-0 bg-brand-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full border-8 border-brand-100 dark:border-slate-800 flex flex-col items-center justify-center bg-white dark:bg-slate-900 shadow-2xl">
               <div className="text-4xl sm:text-6xl font-display font-black text-slate-900 dark:text-white mb-2">{formatTime(timeLeft)}</div>
               <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500">Pomodoro Timer</div>
               
               <div className="absolute -bottom-4 flex gap-2">
                 <button 
                  onClick={toggleTimer}
                  className="w-12 h-12 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-500/30 hover:bg-brand-700 transition-all hover:scale-110 active:scale-95"
                 >
                   {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                 </button>
                 <button 
                  onClick={resetTimer}
                  className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95"
                 >
                   <RotateCcw className="w-5 h-5" />
                 </button>
               </div>
            </div>
         </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Quote Section */}
        <div className="bg-linear-to-br from-brand-600 to-indigo-700 rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-between group shadow-xl">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-1000" />
           <Quote className="w-12 h-12 text-white/20 mb-8" />
           
           <AnimatePresence mode="wait">
             <motion.div 
              key={quote}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="relative z-10"
             >
                <p className="text-2xl md:text-3xl font-display font-black leading-tight mb-6">"{quote}"</p>
                <p className="text-brand-100 font-bold uppercase tracking-widest text-sm">— {author}</p>
             </motion.div>
           </AnimatePresence>

           <div className="mt-12 flex justify-end">
              <button 
                onClick={generateQuote}
                disabled={isGeneratingQuote}
                className="px-6 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest border border-white/30 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isGeneratingQuote ? 'Inspiring...' : 'New Dose of Motivation'}
                <Zap className={cn("w-4 h-4", isGeneratingQuote && "animate-spin")} />
              </button>
           </div>
        </div>

        {/* Tips & Coaching */}
        <div className="space-y-6">
           {[
             { title: 'Focus Plan', desc: 'Avoid multi-tasking. Stick to one subject for 50 minutes and take a 10-minute break.', icon: Brain, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
             { title: 'Anti-Procrastination', desc: 'Starting is the hardest part. Just commit to the first 5 minutes. The rest will follow.', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
             { title: 'Rest Cycle', desc: 'Your brain needs downtime to consolidate memories. Drink water and stand up for a bit.', icon: Coffee, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' }
           ].map((tip, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex gap-6 hover:translate-x-2 transition-transform cursor-default">
                 <div className={cn("w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center shadow-inner", tip.bg)}>
                   <tip.icon className={cn("w-7 h-7 mb-0.5", tip.color)} />
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">{tip.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{tip.desc}</p>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
}
