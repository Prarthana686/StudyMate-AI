import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  RotateCcw, 
  Download, 
  Save, 
  Sparkles, 
  User, 
  Bot,
  Eraser,
  Search,
  BookOpen
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getGeminiResponse } from '../../services/ai';
import { ChatMessage } from '../../types';
import { cn } from '../../lib/utils';

export default function AskAI() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState('General');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const systemPrompt = `You are a professional academic tutor specialized in ${subject}. 
    Provide clear, structured, and easy to understand explanations. 
    Use examples where possible. Be encouraging.`;

    const response = await getGeminiResponse(input, systemPrompt);
    
    const botMsg: ChatMessage = { role: 'assistant', content: response };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(true);
    
    // Simulate typing effect by setting loading false after short delay
    setTimeout(() => setIsLoading(false), 500);
  };

  const clearChat = () => setMessages([]);

  const suggestedPrompts = [
    "Explain Binary Tree data structure in simple terms.",
    "What are the laws of Thermodynamics?",
    "Summarize the French Revolution causes.",
    "Help me solve a quadratic equation x^2 + 5x + 6 = 0"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto border border-slate-200 dark:border-slate-800 rounded-[2rem] bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
      {/* Top Bar */}
      <div className="h-14 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 bg-slate-50/50 dark:bg-slate-800/30">
        <div className="flex items-center gap-4">
          <select 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)}
            className="text-xs font-bold uppercase tracking-wide bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {['General', 'Science', 'Maths', 'History', 'Programming', 'Language'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={clearChat}
            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-colors"
            title="Clear Chat"
          >
            <Eraser className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors" title="Export">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
            <div className="w-20 h-20 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-6 animate-float">
               <Sparkles className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-display font-medium text-slate-900 dark:text-white mb-2">How can I help you today?</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-xs mb-8">Ask about any subject and get instant personalized tutoring.</p>
            
            <div className="grid md:grid-cols-2 gap-3 w-full max-w-xl">
              {suggestedPrompts.map((p, i) => (
                <button 
                  key={i} 
                  onClick={() => setInput(p)}
                  className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-brand-300 hover:bg-white dark:hover:bg-slate-800 transition-all text-left text-sm text-slate-700 dark:text-slate-300"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex items-start gap-4 w-full",
                msg.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-110",
                msg.role === 'user' ? "bg-slate-900 dark:bg-slate-700 text-white" : "bg-brand-600 text-white"
              )}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={cn(
                "max-w-[80%] rounded-2xl px-5 py-3.5 text-[0.9375rem] leading-relaxed shadow-sm",
                msg.role === 'user' 
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200" 
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              )}>
                <div className="prose dark:prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))
        )}
        
        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shrink-0 shadow-sm animate-pulse">
               <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 rounded-full px-5 py-3 flex gap-1.5 items-center">
               <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
               <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
               <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="relative group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your question or doubt..."
            rows={1}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 pr-16 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all resize-none text-slate-900 dark:text-white"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl transition-all",
              !input.trim() || isLoading 
                ? "text-slate-300 dark:text-slate-600" 
                : "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-500/20"
            )}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-3 text-[10px] text-center text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
          <BookOpen className="w-3 h-3" />
          Powered by Gemini 3 Flash · AI can make mistakes, verify information.
        </p>
      </div>
    </div>
  );
}
