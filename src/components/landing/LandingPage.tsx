import { motion } from 'motion/react';
import { 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  BrainCircuit, 
  Calendar, 
  MessageSquare,
  ChevronRight,
  PlayCircle,
  FileText,
  GraduationCap,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="bg-white dark:bg-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-100 dark:border-slate-900 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <span className="font-display font-bold text-xl dark:text-white">StudyMate AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a href="#features" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">How it Works</a>
            <a href="#testimonials" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Testimonials</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onStart}
              className="px-5 py-2.5 rounded-full bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 shadow-lg shadow-brand-500/20 active:scale-95 transition-all"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden hero-gradient">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none opacity-50">
          <div className="absolute top-20 left-10 w-64 h-64 bg-brand-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest border border-brand-100 dark:border-brand-800">
              Personalized Learning for the Future
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
              Study Smarter with <span className="gradient-text">StudyMate AI</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Your personal AI study partner for notes, quizzes, plans, motivation, and concept clarity. Built for the modern student.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={onStart}
                className="group px-8 py-4 rounded-2xl bg-brand-600 text-white font-bold text-lg hover:bg-brand-700 shadow-xl shadow-brand-500/30 active:scale-95 transition-all flex items-center gap-2"
              >
                Try it for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2">
                <PlayCircle className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Dashboard Mockup Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-20 relative px-4"
            >
              <div className="max-w-5xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden bg-slate-900 aspect-video relative group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="p-8 glass-morphism rounded-3xl text-left max-w-lg animate-float">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-brand-500 animate-pulse" />
                        <div className="space-y-2">
                          <div className="h-2 w-32 bg-slate-400/30 rounded" />
                          <div className="h-2 w-20 bg-slate-400/20 rounded" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-4 w-full bg-slate-400/20 rounded" />
                        <div className="h-4 w-5/6 bg-slate-400/20 rounded" />
                        <div className="h-4 w-4/6 bg-slate-400/20 rounded" />
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Active Students', value: '50k+' },
            { label: 'Concepts Simplified', value: '1M+' },
            { label: 'Questions Solved', value: '5M+' },
            { label: 'Positive Rating', value: '4.9/5' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-4 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">Everything you need to succeed</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our suite of AI tools is designed to handle the heavy lifting of study organization and concept clarity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Ask Anything', 
                desc: 'Get instant, clear explanations for complex doubts. No more getting stuck for hours.',
                icon: MessageSquare,
                color: 'bg-blue-500'
              },
              { 
                title: 'Auto-Summarizer', 
                desc: 'Turn long textbook chapters into concise bullet points and key formulas instantly.',
                icon: FileText,
                color: 'bg-purple-500'
              },
              { 
                title: 'Smart Planner', 
                desc: 'A dynamic schedule that adapts to your weak subjects and upcoming exam dates.',
                icon: Calendar,
                color: 'bg-orange-500'
              },
              { 
                title: 'Quiz Master', 
                desc: 'Generate mock tests from your own notes to check your readiness level.',
                icon: BrainCircuit,
                color: 'bg-emerald-500'
              },
              { 
                title: 'Motivation Coach', 
                desc: 'Beat procrastination with time-management tools and real-time encouragement.',
                icon: Zap,
                color: 'bg-yellow-500'
              },
              { 
                title: 'Language Tutor', 
                desc: 'Learn in your preferred language. We support English, Tamil, Hindi and more.',
                icon: GraduationCap,
                color: 'bg-indigo-500'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6", feature.color)}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Solver (Hackathon Section) */}
      <section className="py-32 px-4 bg-brand-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-20" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
           <div>
              <h2 className="text-4xl font-display font-bold text-white mb-8">The Problem We Solve</h2>
              <div className="space-y-6">
                {[
                  "Complex concepts that take hours to understand.",
                  "Overwhelming exams with poor planning and stress.",
                  "Language barriers in technical subjects.",
                  "Procrastination and lack of consistent motivation."
                ].map((problem, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                      <X className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-white/80 text-lg">{problem}</p>
                  </div>
                ))}
              </div>
           </div>
           <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[3rem] border border-white/20">
              <h2 className="text-4xl font-display font-bold text-white mb-8">The StudyMate Solution</h2>
              <div className="space-y-6">
                {[
                  "Instant, personalized AI explanations.",
                  "Dynamic, adaptive study schedules.",
                  "Native language support for better clarity.",
                  "Integrated Pomodoro and dopamine-driven rewards."
                ].map((solution, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-950" />
                    </div>
                    <p className="text-white text-lg font-medium">{solution}</p>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">Master any subject in 3 steps</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Input Context', desc: 'Paste your notes or ask a specific doubt to get started.' },
              { step: '02', title: 'AI Processing', desc: 'Our AI analyzes the material and creates a custom learning path.' },
              { step: '03', title: 'Achieve Mastery', desc: 'Take quizzes, track progress, and ace your exams with confidence.' }
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-display font-black text-slate-100 dark:text-slate-800 mb-6">{s.step}</div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{s.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 px-4 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">Loved by students worldwide</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Arjun S.', role: 'College Student', text: 'The quiz generator changed how I study for finals. I scored 15% higher than last semester!' },
              { name: 'Sarah K.', role: 'High School Junior', text: 'I finally understand Physics concepts specifically in my native language. Such a lifesaver.' },
              { name: 'David M.', role: 'Competitive Aspirant', text: 'The study planner is incredibly adaptive. It knows exactly when I need to focus on my weak spots.' }
            ].map((t, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm relative">
                <div className="flex gap-1 mb-4 text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 font-medium italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{t.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Is StudyMate AI free to use?', a: 'We offer a comprehensive free tier to help every student. Premium features are available for more advanced AI models.' },
              { q: 'Which languages are supported?', a: 'Currently we support English, Tamil, Hindi, Spanish, and French for all explanations and tutoring.' },
              { q: 'Can I export my notes and plans?', a: 'Yes! You can export any AI-generated summary or study plan as a PDF or text file.' }
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{faq.q}</h3>
                <p className="text-slate-600 dark:text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10 px-4 border-t border-slate-100 dark:border-slate-900 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <span className="font-display font-bold text-xl dark:text-white">StudyMate AI</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8">
                Building the future of personalized education with AI that understands the way you learn.
              </p>
              <div className="flex gap-4">
                {/* Social placeholders */}
                {[1,2,3,4].map(s => <div key={s} className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-brand-600 hover:border-brand-600 transition-all cursor-pointer">?</div>)}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-sm tracking-wider">Product</h4>
              <ul className="space-y-4 text-slate-500 dark:text-slate-400 text-sm">
                <li className="hover:text-brand-600 transition-colors cursor-pointer">Dashboard</li>
                <li className="hover:text-brand-600 transition-colors cursor-pointer">AI Tutor</li>
                <li className="hover:text-brand-600 transition-colors cursor-pointer">Planner</li>
                <li className="hover:text-brand-600 transition-colors cursor-pointer">Summarizer</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-sm tracking-wider">Company</h4>
              <ul className="space-y-4 text-slate-500 dark:text-slate-400 text-sm">
                <li className="hover:text-brand-600 transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-brand-600 transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-brand-600 transition-colors cursor-pointer">Terms of Service</li>
                <li className="hover:text-brand-600 transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-slate-500 dark:text-slate-400 text-sm">© 2026 StudyMate AI. All rights reserved.</span>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
               Built for <span className="font-bold text-slate-900 dark:text-white">AI Studio Hackathon</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
