import React, { useState, useRef } from 'react';
import { generateQuizFromDocument } from '../services/geminiService';
import { Upload, FileText, Loader2, Copy, Check, BookOpen, BrainCircuit, AlertCircle } from 'lucide-react';

interface Flashcard {
  term: string;
  definition: string;
}

const QuizGenerator: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file.');
        return;
      }
      
      setFile(selectedFile);
      setError(null);
      setFlashcards([]); // Reset previous results

      const reader = new FileReader();
      reader.onloadend = () => {
        setFileContent(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleGenerate = async () => {
    if (!fileContent) return;

    setIsLoading(true);
    setError(null);
    setCopied(false);

    try {
      // Extract base64 data (remove "data:application/pdf;base64," prefix)
      const base64Data = fileContent.split(',')[1];
      const mimeType = 'application/pdf';

      const results = await generateQuizFromDocument(base64Data, mimeType);
      
      if (results && results.length > 0) {
        setFlashcards(results);
      } else {
        throw new Error("Could not extract flashcards. Try a different document.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to generate flashcards. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyForQuizlet = () => {
    if (flashcards.length === 0) return;

    // Quizlet default import format: Term [Tab] Definition [New Line]
    const textToCopy = flashcards
      .map(card => `${card.term}\t${card.definition}`)
      .join('\n');

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl transition-colors duration-300">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <BookOpen className="text-emerald-600 dark:text-emerald-400" />
          PDF to Quizlet Generator
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Upload your study notes or textbook chapters (PDF). <span className="font-mono text-emerald-600 dark:text-emerald-400 mx-1">gemini-2.5-flash</span> will extract key concepts and format them for easy import into Quizlet.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Input */}
        <div className="lg:col-span-1 space-y-6">
          <div 
            className={`relative group border-2 border-dashed rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden ${file ? 'border-emerald-500/50 bg-slate-50 dark:bg-slate-800/50' : 'border-slate-300 dark:border-slate-700 hover:border-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            onClick={() => fileInputRef.current?.click()}
          >
            {file ? (
              <div className="text-center p-6">
                <FileText className="w-16 h-16 text-emerald-500 mx-auto mb-3" />
                <p className="text-slate-800 dark:text-white font-medium truncate max-w-[200px]">{file.name}</p>
                <p className="text-slate-500 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <p className="text-emerald-600 dark:text-emerald-400 text-xs mt-2 font-semibold">Click to change file</p>
              </div>
            ) : (
              <div className="text-center p-6">
                <Upload className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto mb-3 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors" />
                <p className="text-slate-600 dark:text-slate-300 font-medium">Click to upload PDF</p>
                <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">PDF documents supported</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="application/pdf" 
              className="hidden" 
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!file || isLoading}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              !file || isLoading
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 active:scale-[0.98]'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Processing...
              </>
            ) : (
              <>
                <BrainCircuit className="w-5 h-5" /> Generate Flashcards
              </>
            )}
          </button>
          
          {error && (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <AlertCircle size={18} />
              {error}
            </div>
          )}
        </div>

        {/* Right Column: Output */}
        <div className="lg:col-span-2 relative h-full bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden flex flex-col min-h-[400px]">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <FileText size={18} className="text-emerald-600" />
              Generated Flashcards
            </h4>
            {flashcards.length > 0 && (
              <button
                onClick={copyForQuizlet}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  copied
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                    : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 dark:text-emerald-300'
                }`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy for Quizlet'}
              </button>
            )}
          </div>
          
          <div className="flex-grow p-6 overflow-y-auto max-h-[600px] scroll-smooth custom-scrollbar">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-white">Reading Document</h5>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Extracting key terms and definitions...
                  </p>
                </div>
              </div>
            ) : flashcards.length > 0 ? (
              <div className="grid gap-4">
                 {flashcards.map((card, index) => (
                   <div key={index} className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:border-emerald-500/30 transition-colors">
                     <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">Term</div>
                     <h5 className="font-bold text-slate-900 dark:text-white mb-3 text-lg">{card.term}</h5>
                     <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Definition</div>
                     <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{card.definition}</p>
                   </div>
                 ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-50">
                <BookOpen className="w-16 h-16 text-slate-400 mb-4" />
                <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                  Upload a PDF document to generate flashcards.
                  <br/>
                  <span className="text-xs mt-2 block">
                    Supported export format: Tab-separated (Quizlet, Anki)
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizGenerator;