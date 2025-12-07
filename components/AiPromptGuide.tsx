import React, { useState } from 'react';
import { Lightbulb, ChevronDown, Copy, Check, Sparkles, Info, Play } from 'lucide-react';

interface AiPromptGuideProps {
  activeTab: 'edit' | 'analyze' | 'quiz';
  onPromptSelect?: (prompt: string) => void;
}

const PROMPTS = {
  edit: [
    "Transform this image into a cyberpunk city with neon lights.",
    "Convert this photo into a vintage 19th-century oil painting.",
    "Make the background a snowy mountain landscape.",
    "Turn this into a minimal line art sketch.",
    "Add a lens flare and cinematic lighting effects."
  ],
  analyze: [
    "Ensure the subject is well-lit for best detection.",
    "Complex scenes with many objects yield richer descriptions.",
    "Text within images (like signboards) will be identified.",
    "Try uploading technical diagrams for component analysis."
  ],
  quiz: [
    "PDFs with clear headings and bullet points work best.",
    "Limit documents to ~10 pages for faster processing.",
    "Handwritten notes may work if legible, but typed text is optimal.",
    "The AI focuses on definitions, dates, and key concepts."
  ]
};

const AiPromptGuide: React.FC<AiPromptGuideProps> = ({ activeTab, onPromptSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'edit': return 'Image Editor Prompt Ideas';
      case 'analyze': return 'Optimal Input Guide';
      case 'quiz': return 'Document Upload Tips';
    }
  };

  const items = PROMPTS[activeTab];

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all group shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-800 rounded-lg text-indigo-600 dark:text-indigo-300 group-hover:scale-110 transition-transform">
            <Lightbulb size={20} />
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm md:text-base">
              {getTitle()}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isOpen ? 'Click to collapse' : 'Need inspiration? Click for tips & prompts'}
            </p>
          </div>
        </div>
        <div className={`text-indigo-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={20} />
        </div>
      </button>

      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
           {activeTab === 'edit' ? (
             <div className="grid gap-2">
               <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                 <Sparkles size={12} /> Try these prompts
               </p>
               {items.map((prompt, idx) => (
                 <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group gap-3">
                   <p className="text-sm text-slate-700 dark:text-slate-300 font-medium truncate mr-4 italic">
                     "{prompt}"
                   </p>
                   <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                     {onPromptSelect && (
                       <button
                         onClick={() => onPromptSelect(prompt)}
                         className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold bg-indigo-100 hover:bg-indigo-200 text-indigo-700 dark:bg-indigo-900/50 dark:hover:bg-indigo-900/80 dark:text-indigo-300 transition-colors border border-indigo-200 dark:border-indigo-800"
                         title="Apply this prompt to editor"
                       >
                         <Play size={12} className="fill-current" /> Try this
                       </button>
                     )}
                     <button
                       onClick={() => handleCopy(prompt, idx)}
                       className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                       title="Copy prompt"
                     >
                       {copiedIndex === idx ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                     </button>
                   </div>
                 </div>
               ))}
             </div>
           ) : (
             <div className="grid gap-3">
               <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                 <Info size={12} /> Best Practices
               </p>
               {items.map((tip, idx) => (
                 <div key={idx} className="flex items-start gap-3 p-2">
                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                   <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                     {tip}
                   </p>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default AiPromptGuide;