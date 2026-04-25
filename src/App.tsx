import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  MessageSquare, 
  Calendar, 
  LayoutDashboard, 
  BrainCircuit, 
  FileText, 
  Zap, 
  GraduationCap, 
  BarChart3, 
  Settings as SettingsIcon,
  Sun,
  Moon,
  Menu,
  X,
  Target
} from 'lucide-react';

// Pages & Sections
import LandingPage from './components/landing/LandingPage';
import Sidebar from './components/layout/Sidebar';
import DashboardHome from './components/dashboard/DashboardHome';
import AskAI from './components/dashboard/AskAI';
import StudyPlanner from './components/dashboard/StudyPlanner';
import QuizGenerator from './components/dashboard/QuizGenerator';
import NotesSummarizer from './components/dashboard/NotesSummarizer';
import MotivationCoach from './components/dashboard/MotivationCoach';
import LanguageTutor from './components/dashboard/LanguageTutor';
import ProgressTracker from './components/dashboard/ProgressTracker';
import Settings from './components/dashboard/Settings';

import { DashboardTab } from './types';
import { cn } from './lib/utils';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const renderDashboardContent = () => {
    switch (activeTab) {
      case 'home': return <DashboardHome onNavigate={setActiveTab} />;
      case 'ask-ai': return <AskAI />;
      case 'planner': return <StudyPlanner />;
      case 'quiz': return <QuizGenerator />;
      case 'summarizer': return <NotesSummarizer />;
      case 'motivation': return <MotivationCoach />;
      case 'tutor': return <LanguageTutor />;
      case 'tracker': return <ProgressTracker />;
      case 'settings': return <Settings isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />;
      default: return <DashboardHome onNavigate={setActiveTab} />;
    }
  };

  if (currentPage === 'landing') {
    return (
      <div className={cn("min-h-screen transition-colors duration-300", isDarkMode ? "dark" : "")}>
        <LandingPage onStart={() => setCurrentPage('app')} />
        
        {/* Simple dark mode toggle for landing */}
        <button 
          onClick={toggleDarkMode}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 z-50 transition-transform hover:scale-110 active:scale-95"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-indigo-600" />}
        </button>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen flex bg-slate-50 dark:bg-slate-950 transition-colors duration-300", isDarkMode ? "dark" : "")}>
      {/* Mobile Backdrop */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden" 
          onClick={() => setIsSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLanding={() => setCurrentPage('landing')}
      />

      <main className={cn(
        "flex-1 flex flex-col min-w-0 transition-all duration-300",
        isSidebarOpen ? "lg:pl-0" : "lg:pl-0"
      )}>
        {/* Header */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100 capitalize">
              {activeTab.replace('-', ' ')}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>
            <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-brand-100 dark:ring-brand-900">
              S
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-6xl mx-auto"
            >
              {renderDashboardContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

