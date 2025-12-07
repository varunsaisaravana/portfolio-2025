import React, { useEffect } from 'react';
import { X, Code2, AlertTriangle, Trophy, Lightbulb } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300" 
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 duration-200 flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black text-slate-800 dark:text-white transition-all z-20 backdrop-blur-md shadow-sm"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-2/5 relative h-64 md:h-auto shrink-0">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent md:hidden flex items-end p-6">
            <div>
              <span className="inline-block px-2 py-1 rounded text-xs font-bold bg-indigo-500 text-white mb-2">
                {project.category}
              </span>
              <h2 className="text-2xl font-bold text-white leading-tight">{project.title}</h2>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-6 md:p-8 w-full overflow-y-auto">
          <div className="hidden md:block mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                {project.category}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-3 flex items-center gap-2">
                <Code2 size={16} /> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium border border-slate-200 dark:border-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <div className="grid gap-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-xl border border-amber-100 dark:border-amber-900/30">
                <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                  <AlertTriangle size={18} /> Key Challenge
                </h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  {project.challenges}
                </p>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                <h4 className="font-bold text-emerald-800 dark:text-emerald-200 mb-2 flex items-center gap-2">
                  <Trophy size={18} /> Outcome & Impact
                </h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  {project.outcome}
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-100 dark:border-blue-900/30">
                <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                  <Lightbulb size={18} /> Key Learnings
                </h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  {project.learnings}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;