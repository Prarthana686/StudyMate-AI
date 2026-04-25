import { motion } from 'motion/react';
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  BrainCircuit, 
  Clock, 
  ChevronRight,
  ArrowRight,
  BookOpen,
  MessageSquare,
  Sparkles,
  FileText,
  Zap,
  GraduationCap
} from 'lucide-react';
import { DashboardTab } from '../../types';
import { cn } from '../../lib/utils';

interface DashboardHomeProps {
  onNavigate: (tab: DashboardTab) => void;
}

export default function DashboardHome({ onNavigate }: DashboardHomeProps) {
  const stats = [
    { label: 'Hours Studied', value: '12', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Quizzes Done', value: '5', icon: BrainCircuit, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Streak Days', value: '7', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Target Score', value: '92%', icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="relative overflow-hidden p-8 rounded-3xl bg-linear-to-br from-brand-600 to-indigo-700 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-display font-bold mb-2">Welcome back, Student! 👋</h2>
            <p className="text-brand-100 max-w-md">
              You're on a 7-day streak! Your exam for Mathematics is in 12 days. Let's keep the momentum going.
            </p>
            <button 
              onClick={() => onNavigate('planner')}
              className="mt-6 px-6 py-2.5 rounded-xl bg-white text-brand-600 font-bold text-sm flex items-center gap-2 hover:bg-brand-50 transition-colors shadow-lg"
            >
              Resume Study Plan
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="hidden md:block w-32 h-32 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center p-6 border border-white/30 animate-pulse">
            <Sparkles className="w-full h-full text-white" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-2">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.bg)}>
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full mb-2">
           <h3 className="text-xl font-bold text-slate-900 dark:text-white px-2">Launch Quick Tools</h3>
        </div>
        {[
          { id: 'ask-ai', title: 'Ask AI', desc: 'Clear your doubts instantly', icon: MessageSquare, color: 'bg-blue-500' },
          { id: 'planner', title: 'Planner', desc: 'Manage your time effectively', icon: Calendar, color: 'bg-orange-500' },
          { id: 'quiz', title: 'Quiz Generator', icon: BrainCircuit, desc: 'Test your knowledge', color: 'bg-emerald-500' },
          { id: 'summarizer', title: 'Summarizer', icon: FileText, desc: 'Quick points for revision', color: 'bg-purple-500' },
          { id: 'motivation', title: 'Motivation', icon: Zap, desc: 'Beat procrastination', color: 'bg-yellow-500' },
          { id: 'tutor', title: 'Multilingual Tutor', icon: GraduationCap, desc: 'Learn in your language', color: 'bg-indigo-500' },
        ].map((tool, i) => (
          <button
            key={i}
            onClick={() => onNavigate(tool.id as DashboardTab)}
            className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-brand-200 dark:hover:border-brand-800 transition-all text-left flex items-start gap-4"
          >
            <div className={cn("w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center text-white", tool.color)}>
              <tool.icon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors uppercase tracking-wide text-xs mb-1">
                 {tool.title}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-snug">{tool.desc}</p>
            </div>
            <ChevronRight className="ml-auto w-5 h-5 text-slate-300 group-hover:text-brand-600 transition-colors self-center" />
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Activity</h3>
           <button className="text-sm font-semibold text-brand-600 hover:underline">View All</button>
        </div>
        <div className="space-y-6">
          {[
            { title: 'Quiz Completed', subject: 'Computer Science', time: '2 hours ago', icon: BrainCircuit, color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' },
            { title: 'Explanation Saved', subject: 'Thermodynamics', time: 'Yesterday', icon: MessageSquare, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' },
            { title: 'Study Plan Updated', subject: 'Board Preparation', time: '2 days ago', icon: Calendar, color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' },
          ].map((act, i) => (
            <div key={i} className="flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", act.color)}>
                  <act.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white mb-0.5">{act.title}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{act.subject}</div>
                </div>
              </div>
              <div className="text-xs font-medium text-slate-400">{act.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
