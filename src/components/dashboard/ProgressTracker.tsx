import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar
} from 'recharts';
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Flame, 
  Calendar, 
  Clock, 
  CheckCircle2,
  BrainCircuit,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '../../lib/utils';

const studyData = [
  { name: 'Mon', hours: 4, quizzes: 2 },
  { name: 'Tue', hours: 5, quizzes: 1 },
  { name: 'Wed', hours: 3, quizzes: 3 },
  { name: 'Thu', hours: 6, quizzes: 2 },
  { name: 'Fri', hours: 4, quizzes: 4 },
  { name: 'Sat', hours: 8, quizzes: 5 },
  { name: 'Sun', hours: 2, quizzes: 1 },
];

export default function ProgressTracker() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-8 rounded-[2.5rem] bg-linear-to-br from-brand-600 to-indigo-700 text-white shadow-xl relative overflow-hidden group">
           <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
           <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                <Flame className="w-6 h-6 text-orange-300 fill-current" />
              </div>
              <div className="text-sm font-bold uppercase tracking-widest opacity-80">Current Streak</div>
           </div>
           <div className="text-5xl font-display font-black mb-1">07 Days</div>
           <p className="text-brand-100 text-sm">Best record: 14 days (March)</p>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
           <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> +12%
              </span>
           </div>
           <div className="mt-8">
              <div className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-1">84%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">Concept Mastery</div>
           </div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
           <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-xs font-bold text-slate-400">Total Points</span>
           </div>
           <div className="mt-8">
              <div className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-1">12,450</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">XP Earned</div>
           </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
           <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Study Activity</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Hours per day · Last 7 Days</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-500" />
                <span className="text-xs font-bold text-slate-500">Study Hours</span>
              </div>
           </div>
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={studyData}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', background: '#fff' }}
                  />
                  <Area type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
           <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Quiz Performance</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Tests completed · Success rate</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-slate-500">Completed</span>
              </div>
           </div>
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', background: '#fff' }}
                  />
                  <Bar dataKey="quizzes" fill="#10b981" radius={[8, 8, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Detailed Stats Table Placeholder */}
      <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Detailed Subject Analytics</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
             <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase font-black tracking-widest text-slate-400">
                   <th className="pb-4 pt-0">Subject</th>
                   <th className="pb-4 pt-0">Completion</th>
                   <th className="pb-4 pt-0">Masterative Score</th>
                   <th className="pb-4 pt-0">Last Active</th>
                   <th className="pb-4 pt-0">Status</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {[
                  { name: 'Computer Science', comp: '92%', score: 'A+', active: '2h ago', status: 'Ahead', color: 'text-emerald-500' },
                  { name: 'Mathematics', comp: '74%', score: 'B', active: 'Yesterday', status: 'On Track', color: 'text-brand-500' },
                  { name: 'Physics', comp: '45%', score: 'C', active: '3 Days ago', status: 'Behind', color: 'text-orange-500' },
                  { name: 'Literature', comp: '100%', score: 'A', active: '1 Week ago', status: 'Finished', color: 'text-slate-400' },
                ].map((s, i) => (
                  <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                     <td className="py-5 font-bold text-slate-800 dark:text-white">{s.name}</td>
                     <td className="py-5">
                        <div className="flex items-center gap-2">
                           <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-brand-500" style={{ width: s.comp }} />
                           </div>
                           <span className="text-xs font-bold text-slate-500">{s.comp}</span>
                        </div>
                     </td>
                     <td className="py-5 font-mono text-xs">{s.score}</td>
                     <td className="py-5 text-xs text-slate-400">{s.active}</td>
                     <td className="py-5">
                        <span className={cn("text-[10px] font-bold uppercase py-1 px-2 rounded-lg bg-slate-50 dark:bg-slate-800", s.color)}>
                           {s.status}
                        </span>
                     </td>
                  </tr>
                ))}
             </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
