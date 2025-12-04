import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation start slightly after mount for smooth transition
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className={`relative transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
        {/* Signature Text */}
        <h1 className="font-['Allura'] text-8xl md:text-9xl text-slate-900 dark:text-white relative z-10 leading-tight">
          Varun
        </h1>
        
        {/* Animated Underline */}
        <div className="absolute -bottom-2 left-4 right-4 h-1.5 bg-gradient-to-r from-indigo-600 via-cyan-500 to-indigo-600 rounded-full origin-left animate-[grow_2.5s_cubic-bezier(0.22,1,0.36,1)_forwards] opacity-80"></div>
      </div>
      
      {/* Loading Status */}
      <div className={`mt-12 flex flex-col items-center gap-3 transition-opacity duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"></div>
        </div>
        <p className="font-mono text-slate-400 text-xs tracking-[0.3em] uppercase">
          Initializing Portfolio
        </p>
      </div>

       <style>{`
        @keyframes grow {
          0% { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;