import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Check, 
  Download,
  List,
  Type,
  Lightbulb
} from 'lucide-react';
import { getGeminiResponse } from '../../services/ai';
import { cn } from '../../lib/utils';
import ReactMarkdown from 'react-markdown';

export default function NotesSummarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim() || isLoading) return;
    setIsLoading(true);
    
    const prompt = `Please summarize the following educational content into bullet points. 
    Include key concepts, formulas, and important takeaways. 
    Format it cleanly using Markdown.
    
    Content:
    ${text}`;
    
    const result = await getGeminiResponse(prompt, "You are an expert academic summarizer. Focus on clarity and critical information.");
    setSummary(result);
    setIsLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 h-full max-w-6xl mx-auto pb-10">
      {/* Input Panel */}
      <div className="flex flex-col h-[calc(100vh-14rem)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center text-white">
               <FileText className="w-6 h-6" />
             </div>
             <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Input Notes</h3>
          </div>
          <button 
            onClick={() => setText('')}
            className="text-[10px] uppercase font-bold text-slate-400 hover:text-red-500 transition-colors"
          >
            Clear All
          </button>
        </div>
        <div className="flex-1 p-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your long textbook text, research paper content, or class notes here..."
            className="w-full h-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl resize-none text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-sans leading-relaxed"
          />
        </div>
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
          <button 
            onClick={handleSummarize}
            disabled={!text.trim() || isLoading}
            className="w-full py-4 rounded-2xl bg-purple-600 text-white font-bold hover:bg-purple-700 shadow-xl shadow-purple-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 group"
          >
            {isLoading ? 'Processing...' : 'Summarize with AI'}
            <Sparkles className={cn("w-5 h-5", isLoading && "animate-spin")} />
          </button>
        </div>
      </div>

      {/* Output Panel */}
      <div className="flex flex-col h-[calc(100vh-14rem)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm relative">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white">
               <Lightbulb className="w-6 h-6" />
             </div>
             <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">AI Summary</h3>
          </div>
          {summary && (
            <div className="flex items-center gap-2">
              <button 
                onClick={copyToClipboard}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
                title="Copy"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
              <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600" title="Download PDF">
                <Download className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 relative">
          {!summary && !isLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
               <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-6">
                 <List className="w-8 h-8" />
               </div>
               <p className="text-slate-500 dark:text-slate-400 max-w-[200px]">Summary output will appear here after processing your text.</p>
            </div>
          ) : isLoading ? (
            <div className="space-y-6">
              <div className="h-2 w-1/2 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              <div className="space-y-3">
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                <div className="h-2 w-5/6 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                <div className="h-2 w-4/6 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              </div>
              <div className="h-2 w-1/3 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              <div className="space-y-3">
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                <div className="h-2 w-almost bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="prose dark:prose-invert prose-indigo max-w-none"
            >
              <ReactMarkdown>{summary}</ReactMarkdown>
            </motion.div>
          )}
        </div>
        
        {/* Revision Mode Overlay Badge */}
        {summary && (
          <div className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 text-xs font-black uppercase tracking-widest border border-orange-200 dark:border-orange-900/50 shadow-lg">
             ⚡ Quick Revision Mode
          </div>
        )}
      </div>
    </div>
  );
}
