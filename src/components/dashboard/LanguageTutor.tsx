import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Languages, 
  MessageSquare, 
  Sparkles, 
  BookOpen, 
  Volume2,
  ChevronRight,
  RefreshCw,
  Globe
} from 'lucide-react';
import { getGeminiResponse } from '../../services/ai';
import { cn } from '../../lib/utils';
import ReactMarkdown from 'react-markdown';

export default function LanguageTutor() {
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('Tamil');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const translateAndExplain = async () => {
    if (!topic.trim() || isLoading) return;
    setIsLoading(true);
    
    const prompt = `Explain the following academic concept in ${language}:
    Concept: ${topic}
    Include English terminology where necessary. Format it for a student to understand clearly.`;
    
    const result = await getGeminiResponse(prompt, `You are a bilingual academic tutor expert in English and ${language}.`);
    setExplanation(result);
    setIsLoading(false);
  };

  const languages = ['Tamil', 'Hindi', 'Spanish', 'French', 'German', 'Telugu', 'Kannada'];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-display font-black text-slate-900 dark:text-white mb-4">Multilingual Tutor</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Understand complex concepts in your native language. We bridge the gap between English curriculum and your understanding.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <div className="grid md:grid-cols-[1fr_200px_auto] gap-4 items-end bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm">
           <div className="flex-1 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Concept to Learn</label>
              <input 
                type="text"
                placeholder="e.g. Photosynthesis, Binary Search, String Theory..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
           </div>
           
           <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Target Language</label>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-800 dark:text-white focus:outline-none"
              >
                {languages.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
           </div>

           <button 
             onClick={translateAndExplain}
             disabled={!topic.trim() || isLoading}
             className="px-10 py-4 h-[60px] rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
           >
             {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <>Translate & Teach <Sparkles className="w-5 h-5" /></>}
           </button>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 min-h-[400px] shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
           
           {!explanation && !isLoading ? (
             <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-40">
                <Globe className="w-16 h-16 text-slate-200 mb-6" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Explanation Yet</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                  Enter a concept and select your language above to get an instant explanation designed for clarity.
                </p>
             </div>
           ) : isLoading ? (
             <div className="space-y-8 py-10">
               <div className="h-10 w-48 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
               <div className="space-y-4">
                  <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                  <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                  <div className="h-4 w-4/6 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
               </div>
               <div className="h-[200px] w-full bg-slate-50 dark:bg-slate-800/50 rounded-3xl animate-pulse" />
             </div>
           ) : (
             <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose dark:prose-invert prose-indigo max-w-none"
             >
                <div className="flex items-center gap-4 mb-8">
                  <span className="px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest border border-indigo-100 dark:border-indigo-900/50">
                    Language: {language}
                  </span>
                  <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 group">
                    <Volume2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
                <ReactMarkdown>{explanation}</ReactMarkdown>
             </motion.div>
           )}
        </div>
      </div>

      {/* Suggested Topics Tile */}
      {!explanation && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {['Calculus', 'Microservices', 'French Revolution', 'Organic Chemistry'].map(t => (
             <button 
              key={t}
              onClick={() => setTopic(t)}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-sm font-medium text-slate-600 dark:text-slate-400 hover:border-indigo-300 hover:text-indigo-600 transition-all text-left flex items-center justify-between group"
             >
               {t}
               <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
             </button>
           ))}
        </div>
      )}
    </div>
  );
}
