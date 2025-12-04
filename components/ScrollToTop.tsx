import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`fixed bottom-8 right-8 z-40 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <button
        onClick={scrollToTop}
        className="p-4 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 dark:hover:bg-indigo-400 hover:scale-110 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 flex items-center justify-center group border border-indigo-400/20 backdrop-blur-sm"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default ScrollToTop;