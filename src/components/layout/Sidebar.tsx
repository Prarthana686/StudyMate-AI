import { 
  Home, 
  MessageSquare, 
  Calendar, 
  BrainCircuit, 
  FileText, 
  Zap, 
  GraduationCap, 
  BarChart3, 
  Settings as SettingsIcon,
  LogOut,
  ChevronLeft
} from 'lucide-react';
import { DashboardTab } from '../../types';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  isOpen: boolean;
  onClose: () => void;
  onLanding: () => void;
}

const SIDEBAR_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'ask-ai', label: 'Ask AI', icon: MessageSquare },
  { id: 'planner', label: 'Study Planner', icon: Calendar },
  { id: 'quiz', label: 'Quiz Generator', icon: BrainCircuit },
  { id: 'summarizer', label: 'Summarizer', icon: FileText },
  { id: 'motivation', label: 'Motivation', icon: Zap },
  { id: 'tutor', label: 'Language Tutor', icon: GraduationCap },
  { id: 'tracker', label: 'Progress', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

export default function Sidebar({ activeTab, onTabChange, isOpen, onClose, onLanding }: SidebarProps) {
  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 lg:relative lg:translate-x-0",
      !isOpen && "-translate-x-full"
    )}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <span className="font-display font-bold text-lg dark:text-white">StudyMate AI</span>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id as DashboardTab)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group",
                activeTab === item.id 
                  ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform group-hover:scale-110",
                activeTab === item.id ? "text-brand-600 dark:text-brand-400" : "text-slate-400 dark:text-slate-500"
              )} />
              {item.label}
              {activeTab === item.id && (
                <motion.div 
                  layoutId="active-pill" 
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-600 dark:bg-brand-400" 
                />
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <button 
            onClick={onLanding}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 dark:hover:text-red-400 transition-all group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Landing
          </button>
        </div>
      </div>
    </aside>
  );
}
