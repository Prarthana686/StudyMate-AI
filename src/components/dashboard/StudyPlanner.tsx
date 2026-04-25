import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  CalendarDays, 
  AlertCircle, 
  CheckCircle2, 
  Plus, 
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { generateStudyPlan } from '../../services/ai';
import { StudyPlanDay } from '../../types';
import { cn } from '../../lib/utils';

export default function StudyPlanner() {
  const [subjects, setSubjects] = useState<string[]>(['Mathematics', 'Physics']);
  const [newSubject, setNewSubject] = useState('');
  const [examDate, setExamDate] = useState('2026-05-15');
  const [hoursPerDay, setHoursPerDay] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<StudyPlanDay[]>([]);

  const addSubject = () => {
    if (newSubject && !subjects.includes(newSubject)) {
      setSubjects([...subjects, newSubject]);
      setNewSubject('');
    }
  };

  const removeSubject = (s: string) => {
    setSubjects(subjects.filter(sub => sub !== s));
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    const result = await generateStudyPlan({ 
      examDate, 
      subjects, 
      hoursPerDay, 
      weakSubjects: subjects.slice(0, 1) 
    });
    setPlan(result.plan || []);
    setIsLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid lg:grid-cols-[350px_1fr] gap-8">
        {/* Settings Panel */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
             <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
               <Calendar className="w-5 h-5 text-brand-500" />
               Planner Settings
             </h3>
             
             <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Exam Target Date</label>
                  <input 
                    type="date" 
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Study Hours Per Day</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" min="1" max="12" step="1"
                      value={hoursPerDay}
                      onChange={(e) => setHoursPerDay(parseInt(e.target.value))}
                      className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
                    />
                    <span className="w-12 h-10 flex items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 font-bold border border-brand-100 dark:border-brand-800">
                      {hoursPerDay}h
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Subjects</label>
                  <div className="flex gap-2 mb-3">
                    <input 
                      type="text" 
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addSubject()}
                      placeholder="Add subject..."
                      className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none"
                    />
                    <button 
                      onClick={addSubject}
                      className="p-2 rounded-xl bg-brand-600 text-white hover:bg-brand-700 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map(s => (
                      <span key={s} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        {s}
                        <button onClick={() => removeSubject(s)} className="p-0.5 hover:text-red-500 transition-colors">×</button>
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="w-full py-4 rounded-2xl bg-brand-600 text-white font-bold hover:bg-brand-700 shadow-xl shadow-brand-500/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {isLoading ? 'Crafting Plan...' : 'Generate Smart Plan'}
                  <Sparkles className={cn("w-4 h-4", isLoading && "animate-spin")} />
                </button>
             </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/50 rounded-2xl p-4 flex gap-4">
             <AlertCircle className="w-6 h-6 text-orange-500 shrink-0" />
             <p className="text-sm text-orange-800 dark:text-orange-300">
               <span className="font-bold">Pro Tip:</span> Prioritize 2 hours for Mathematics as it has the highest weightage this week.
             </p>
          </div>
        </div>

        {/* Plan Display */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Your Study Timeline</h3>
            <button className="text-sm font-semibold text-brand-600 hover:underline flex items-center gap-1">
              <BookOpen className="w-4 h-4" /> Export Calendar
            </button>
          </div>

          {!plan.length && !isLoading ? (
            <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-[2rem] p-20 flex flex-col items-center justify-center text-center">
              <CalendarDays className="w-16 h-16 text-slate-200 dark:text-slate-800 mb-6" />
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Plan Generated</h4>
              <p className="text-slate-500 dark:text-slate-400 max-w-xs">Configure your subjects and exam date on the left to create your AI-powered study schedule.</p>
            </div>
          ) : isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex gap-6 animate-pulse">
                   <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl shrink-0" />
                   <div className="flex-1 space-y-3 pt-2">
                      <div className="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded shadow-sm" />
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded opacity-50" />
                      <div className="h-2 w-4/5 bg-slate-100 dark:bg-slate-800 rounded opacity-50" />
                   </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {plan.map((day, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-3 py-1 rounded-full">
                      {day.day}
                    </span>
                    <Clock className="w-4 h-4 text-slate-300" />
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                     <span className="w-1 h-5 bg-brand-500 rounded-full" />
                     {day.focus}
                  </h4>
                  <ul className="space-y-3">
                    {day.tasks.map((task, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle2 className="w-4 h-4 text-slate-300 dark:text-slate-700 mt-0.5 group-hover:text-emerald-500 transition-colors" />
                        {task}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-400 uppercase tracking-widest font-bold">
                    <span>Priority Low</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
