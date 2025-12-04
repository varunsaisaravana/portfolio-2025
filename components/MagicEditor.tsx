import React, { useState, useRef, useEffect } from 'react';
import { editImageWithGemini } from '../services/geminiService';
import { Upload, Wand2, Loader2, Image as ImageIcon, Download, Brain, Sparkles } from 'lucide-react';

const LOADING_MESSAGES = [
  "Analyzing image composition...",
  "Identifying subjects and background...",
  "Consulting the Gemini neural network...",
  "Applying creative transformations...",
  "Refining pixel details...",
  "Enhancing lighting and colors...",
  "Polishing the final masterpiece..."
];

const MagicEditor: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle progress simulation and message rotation
  useEffect(() => {
    let progressInterval: ReturnType<typeof setInterval>;
    let messageInterval: ReturnType<typeof setInterval>;

    if (isLoading) {
      setLoadingProgress(0);
      setLoadingMessageIndex(0);

      // Simulate progress up to 95%
      progressInterval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 95) return prev;
          // Random increment for organic feel
          const increment = Math.random() * 1.5 + 0.2; 
          return Math.min(prev + increment, 95);
        });
      }, 100);

      // Rotate messages every 1.5s
      messageInterval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 1500);
    } else {
      setLoadingProgress(100);
    }

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [isLoading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        setGeneratedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!originalImage || !prompt) return;

    setIsLoading(true);
    setError(null);

    try {
      // Extract base64 data (remove "data:image/png;base64," prefix)
      const base64Data = originalImage.split(',')[1];
      const mimeType = originalImage.split(';')[0].split(':')[1];

      const result = await editImageWithGemini(base64Data, prompt, mimeType);
      setGeneratedImage(result);
    } catch (err: any) {
      setError(err.message || "Failed to generate image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl transition-colors duration-300">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <Wand2 className="text-indigo-600 dark:text-indigo-400" />
          Varun's AI Creative Lab
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Demonstrating my interest in Applied AI and Engineering. Upload a photo and use a prompt to edit it using the 
          <span className="font-mono text-indigo-600 dark:text-indigo-400 mx-1">gemini-2.5-flash-image</span> model.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Input */}
        <div className="space-y-6">
          {/* Upload Area */}
          <div 
            className={`relative group border-2 border-dashed rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden ${originalImage ? 'border-indigo-500/50 bg-slate-50 dark:bg-slate-800/50' : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            onClick={() => fileInputRef.current?.click()}
          >
            {originalImage ? (
              <img 
                src={originalImage} 
                alt="Original" 
                className="h-full w-full object-contain rounded-lg p-2 transition-transform duration-700 ease-in-out group-hover:scale-110" 
              />
            ) : (
              <div className="text-center p-6">
                <Upload className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto mb-3 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
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
            {originalImage && (
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl z-10">
                 <span className="text-white font-medium flex items-center gap-2"><ImageIcon size={18} /> Change Image</span>
              </div>
            )}
          </div>

          {/* Prompt Input */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Edit Instructions
            </label>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., 'Add a retro filter', 'Make it look like a sketch', 'Remove the background'..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none h-32 transition-colors"
              />
              <button
                onClick={handleGenerate}
                disabled={!originalImage || !prompt || isLoading}
                className={`absolute bottom-3 right-3 px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all ${
                  !originalImage || !prompt || isLoading
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate <Wand2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
            {error && (
              <p className="text-red-600 dark:text-red-400 text-sm bg-red-100 dark:bg-red-400/10 p-3 rounded-lg border border-red-200 dark:border-red-400/20">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Output */}
        <div className="relative min-h-[300px] bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center overflow-hidden transition-colors group">
          {generatedImage ? (
             <div className="relative w-full h-full p-2 flex flex-col">
               <div className="flex-1 relative overflow-hidden rounded-lg">
                 <img 
                   src={generatedImage} 
                   alt="Generated" 
                   className="w-full h-full object-contain rounded-lg shadow-2xl transition-transform duration-700 ease-in-out group-hover:scale-110" 
                 />
               </div>
               <div className="mt-4 px-2 pb-2">
                 <a 
                   href={generatedImage} 
                   download="varun-ai-edit.png"
                   className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-indigo-500/25 active:scale-95"
                 >
                   <Download size={18} /> Download Image
                 </a>
               </div>
             </div>
          ) : (
            <div className="text-center p-8 max-w-sm">
               <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200 dark:border-slate-700">
                 <Wand2 className="text-slate-400 dark:text-slate-600 w-8 h-8" />
               </div>
               <h4 className="text-slate-700 dark:text-slate-300 font-medium mb-2">Ready to Create</h4>
               <p className="text-slate-500 dark:text-slate-500 text-sm">
                 Upload an image and enter a prompt to see the power of Generative AI in action.
               </p>
            </div>
          )}
          
          {isLoading && (
            <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center z-20 transition-all duration-300">
              {/* Central Animation */}
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-800 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent border-l-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-4 border-4 border-cyan-400/30 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="w-6 h-6 text-yellow-400 animate-bounce" />
                </div>
              </div>

              {/* Status Text */}
              <div className="text-center mb-6 max-w-xs px-6 h-16 flex flex-col justify-center">
                <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
                  Generative Magic in Progress
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 animate-fade-in transition-all duration-300">
                  {LOADING_MESSAGES[loadingMessageIndex]}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-64 h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 transition-all duration-200 ease-out relative"
                  style={{ width: `${loadingProgress}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 w-full h-full animate-pulse"></div>
                </div>
              </div>
              <div className="mt-2 text-xs font-mono text-slate-400 dark:text-slate-500">
                {Math.round(loadingProgress)}% Complete
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MagicEditor;