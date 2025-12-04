import React, { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  darker?: boolean;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className = '', darker = false }) => {
  return (
    <section 
      id={id} 
      className={`py-20 px-6 md:px-12 lg:px-24 transition-colors duration-300 ${darker ? 'bg-slate-100 dark:bg-slate-950' : 'bg-white dark:bg-slate-900'} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="mb-16 text-center">
            {title && (
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
            <div className="h-1 w-24 bg-indigo-500 mx-auto mt-6 rounded-full opacity-50"></div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;