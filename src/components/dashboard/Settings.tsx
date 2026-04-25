import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Moon, 
  Sun, 
  Shield, 
  CreditCard,
  Keyboard,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface SettingsProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Settings({ isDarkMode, onToggleDarkMode }: SettingsProps) {
  const sections = [
    {
      title: 'Common',
      items: [
        { id: 'profile', label: 'Account Profile', desc: 'Manage your student details', icon: User },
        { id: 'mode', label: 'Dark Mode', desc: 'Switch app appearance', icon: isDarkMode ? Sun : Moon, toggle: true, onClick: onToggleDarkMode },
        { id: 'notifications', label: 'Notifications', desc: 'Manage study reminders', icon: Bell },
        { id: 'language', label: 'App Language', desc: 'English (US)', icon: Globe },
      ]
    },
    {
      title: 'Security & App',
      items: [
        { id: 'password', label: 'Password & Security', desc: 'Secure your study data', icon: Shield },
        { id: 'shortcuts', label: 'Keyboard Shortcuts', desc: 'Faster navigation', icon: Keyboard },
        { id: 'premium', label: 'StudyMate Premium', desc: 'Unlock advanced AI models', icon: CreditCard },
      ]
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex items-center gap-6 p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm">
         <div className="w-20 h-20 rounded-full bg-brand-600 flex items-center justify-center text-white text-3xl font-black ring-4 ring-brand-50 dark:ring-brand-900/40">
           S
         </div>
         <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Student User</h2>
            <p className="text-slate-500 dark:text-slate-400">prarthanabharathiraja@gmail.com</p>
            <div className="mt-2 flex gap-2">
               <span className="px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-900/50">Free Tier</span>
               <span className="px-2 py-0.5 rounded-lg bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 text-[10px] font-black uppercase tracking-widest border border-brand-100 dark:border-brand-900/50">Top 1% Learner</span>
            </div>
         </div>
         <button className="ml-auto px-5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-all">
           Edit Profile
         </button>
      </div>

      <div className="space-y-6">
        {sections.map((section, i) => (
          <div key={i} className="space-y-4">
             <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-4">{section.title}</h3>
             <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                  {section.items.map((item, j) => (
                    <div key={j} className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-500 group-hover:text-brand-600 transition-colors">
                            <item.icon className="w-6 h-6" />
                          </div>
                          <div>
                             <div className="font-bold text-slate-900 dark:text-white mb-0.5">{item.label}</div>
                             <div className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</div>
                          </div>
                       </div>
                       
                       {item.toggle ? (
                         <button 
                           onClick={item.onClick}
                           className={cn(
                             "w-12 h-6 rounded-full transition-all relative overflow-hidden",
                             isDarkMode ? "bg-brand-600" : "bg-slate-200"
                           )}
                         >
                           <motion.div 
                             className="w-4 h-4 bg-white rounded-full absolute top-1"
                             animate={{ left: isDarkMode ? 'auto' : '4px', right: isDarkMode ? '4px' : 'auto' }}
                             transition={{ type: "spring", stiffness: 500, damping: 30 }}
                           />
                         </button>
                       ) : (
                         <button className="p-2 rounded-lg text-slate-300 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-all">
                           <ChevronRight className="w-5 h-5" />
                         </button>
                       )}
                    </div>
                  ))}
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 py-8">
        <button className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-600 transition-colors group">
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Logout from StudyMate AI
        </button>
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
           Version 1.0.4 · Build 2026.04.25
        </div>
      </div>
    </div>
  );
}
