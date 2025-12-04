import React, { useState, useRef } from 'react';
import { analyzeImageWithGemini } from '../services/geminiService';
import { Upload, ScanEye, Loader2, Image as ImageIcon, FileText, Sparkles, Brain, AlertCircle } from 'lucide-react';

const ImageAnalyzer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setIsLoading(true);
    setError(null);

    try {
      // Extract base64 data
      const base64Data = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1];

      const result = await analyzeImageWithGemini(base64Data, mimeType);
      setAnalysis(result);
    } catch (err: any) {
      setError(err.message || "Failed to analyze image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl transition-colors duration-300">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <ScanEye className="text-cyan-600 dark:text-cyan-400" />
          Visual Intelligence Analysis
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Upload an image to identify objects and understand the scene using the advanced reasoning capabilities of <span className="font-mono text-cyan-600 dark:text-cyan-400 mx-1">gemini-3-pro-preview</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Input */}
        <div className="space-y-6">
          <div 
            className={`relative group border-2 border-dashed rounded-xl h-80 flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden ${image ? 'border-cyan-500/50 bg-slate-50 dark:bg-slate-800/50' : 'border-slate-300 dark:border-slate-700 hover:border-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            onClick={() => fileInputRef.current?.click()}
          >
            {image ? (
              <img 
                src={image} 
                alt="Uploaded" 
                className="h-full w-full object-contain rounded-lg p-2" 
              />
            ) : (
              <div className="text-center p-6">
                <Upload className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto mb-3 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" />
                <p className="text-slate-600 dark:text-slate-300 font-medium">Click to upload an image</p>
                <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">JPG or PNG supported</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
            {image && (
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl z-10">
                 <span className="text-white font-medium flex items-center gap-2"><ImageIcon size={18} /> Change Image</span>
              </div>
            )}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!image || isLoading}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              !image || isLoading
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/25 active:scale-[0.98]'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Analyzing Scene...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Analyze Image
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

        {/* Right Column: Analysis Output */}
        <div className="relative min-h-[300px] h-full bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <FileText size={18} className="text-cyan-600" />
              Analysis Results
            </h4>
            {analysis && (
                <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-medium">
                    Completed
                </span>
            )}
          </div>
          
          <div className="flex-grow p-6 overflow-y-auto max-h-[500px] scroll-smooth custom-scrollbar">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                  <Brain className="absolute inset-0 m-auto text-cyan-600 dark:text-cyan-400 w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-white">Processing Visual Data</h5>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Identifying objects, relationships, and context...
                  </p>
                </div>
              </div>
            ) : analysis ? (
              <div className="prose dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                  {analysis}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-50">
                <ScanEye className="w-16 h-16 text-slate-400 mb-4" />
                <p className="text-slate-500 dark:text-slate-400">
                  Analysis results will appear here after you process an image.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageAnalyzer;