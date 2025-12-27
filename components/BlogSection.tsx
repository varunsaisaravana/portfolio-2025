import React from 'react';
import Section from './Section';
import { Play, Calendar, User, Clock } from 'lucide-react';

const BlogSection: React.FC = () => {
  return (
    <Section id="blog" className="bg-[#f9f9f7] dark:bg-slate-900 transition-colors" darker>
      {/* Newspaper Masthead */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="border-b-4 border-black dark:border-slate-600 mb-1"></div>
        <div className="border-b border-black dark:border-slate-600 mb-6"></div>
        
        <div className="text-center">
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 font-newspaper-head text-slate-900 dark:text-slate-100 transform scale-y-90">
            The Daily Dev
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-b-2 border-black dark:border-slate-600 py-2 mt-2 font-sans text-xs md:text-sm uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400 gap-2 md:gap-0">
            <span className="flex-1 text-center md:text-left md:pl-2">Vol. 1, Issue 42</span>
            <span className="flex-1 text-center font-bold text-slate-900 dark:text-slate-200">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex-1 text-center md:text-right md:pr-2">Student Engineering Chronicles</span>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Article Column */}
        <div className="lg:col-span-8">
          <article className="prose dark:prose-invert max-w-none">
            <h1 className="text-2xl md:text-5xl font-bold font-newspaper-head text-slate-900 dark:text-slate-50 mb-4 leading-[1.1]">
              The Art of Digital Gardening: Maintaining a Personal Blog in 2024
            </h1>
            
            <h2 className="text-lg md:text-xl font-newspaper-body text-slate-600 dark:text-slate-300 italic mb-6 leading-relaxed font-light">
              Why consistency matters more than perfection in the student developer ecosystem, and how to build a habit of contributing.
            </h2>

            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm font-sans text-slate-500 dark:text-slate-400 mb-8 border-b border-slate-200 dark:border-slate-700 pb-6">
              <span className="flex items-center gap-2 font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                <User size={14} /> By Varun
              </span>
              <span className="flex items-center gap-2">
                <Clock size={14} /> 5 Min Read
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={14} /> Today
              </span>
            </div>

            <figure className="mb-10">
              <img 
                src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1200&auto=format&fit=crop&q=80" 
                alt="Workspace with coffee and laptop" 
                className="w-full h-auto rounded-sm shadow-sm border border-slate-200 dark:border-slate-700"
              />
              <figcaption className="mt-3 text-sm text-slate-500 dark:text-slate-400 font-sans text-right border-b border-slate-200 dark:border-slate-700 pb-2">
                <span className="uppercase font-bold text-xs mr-2">Fig 1.</span>
                The modern digital garden requires consistent tending. Image via Unsplash.
              </figcaption>
            </figure>

            <div className="font-newspaper-body text-slate-800 dark:text-slate-300 text-base md:text-lg leading-loose space-y-6">
              <p>
                <span className="float-left text-6xl md:text-7xl font-bold font-newspaper-head leading-[0.7] pr-3 mt-2 text-slate-900 dark:text-slate-100">C</span>
                onsistency is the currency of the internet. For student developers and aspiring engineers, a personal blog serves as more than just a diary; it is a living documentation of one's learning curve, a portfolio of thought processes, and a contribution to the wider open-source knowledge base.
              </p>
              
              <p>
                Contributing to your own blog regularly does not require groundbreaking discoveries every day. Rather, it thrives on the <strong>"Learn in Public"</strong> philosophy. Documenting the struggle of fixing a specific bug in a Robotics OS node or explaining the logic behind a new React component architecture often provides more value to peers than a polished press release.
              </p>

              <h3 className="font-newspaper-head text-2xl font-bold text-slate-900 dark:text-slate-100 mt-10 mb-4 pt-4 border-t border-slate-200 dark:border-slate-700 w-1/3">
                The Maintenance Mindset
              </h3>
              
              <p>
                Maintaining a personal site requires a shift in mindset from perfectionism to iteration. Just as software is never truly "finished," a blog is an evolving entity. Here are three pillars for sustainable blogging:
              </p>
              
              <ul className="list-disc pl-5 space-y-2 marker:text-slate-400 ml-4 italic">
                <li><strong>Schedule over Inspiration:</strong> Set a recurring time to write, regardless of motivation.</li>
                <li><strong>Curate, Don't Just Create:</strong> Share resources, videos, and articles that inspired you.</li>
                <li><strong>Technical Debt:</strong> Regularly update old posts as your understanding evolves.</li>
              </ul>

              <p>
                By treating your blog as a garden rather than a stone monument, you allow it to grow organically. Weeds (outdated posts) can be pruned, and new seeds (ideas) can be planted daily.
              </p>
            </div>
          </article>
        </div>

        {/* Sidebar / Multimedia Column */}
        <div className="lg:col-span-4 space-y-10 lg:pl-8 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 border-dashed pt-10 lg:pt-0 mt-4 lg:mt-0">
          
          {/* Video Widget */}
          <div className="bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700 shadow-lg lg:rotate-1 transform transition-transform hover:rotate-0">
            <h4 className="font-sans font-bold uppercase tracking-widest text-xs mb-4 text-red-600 dark:text-red-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              Video Report
            </h4>
            
            <div className="space-y-6">
              <a href="https://www.youtube.com/watch?v=sample1" target="_blank" rel="noreferrer" className="group block">
                <div className="relative aspect-video bg-slate-100 dark:bg-slate-900 mb-3 overflow-hidden border border-slate-100 dark:border-slate-600">
                  <img src="https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=500&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" alt="Coding setup" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors">
                    <div className="bg-white/90 p-3 rounded-full text-black shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={16} fill="currentColor" />
                    </div>
                  </div>
                </div>
                <h5 className="font-newspaper-head text-lg font-bold leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Setting up a Headless CMS for Personal Sites
                </h5>
                <span className="text-xs font-sans text-slate-500 mt-1 block">12:45 • Tech Talk</span>
              </a>

              <div className="border-t border-slate-200 dark:border-slate-700"></div>

              <a href="https://www.youtube.com/watch?v=sample2" target="_blank" rel="noreferrer" className="group block">
                <div className="relative aspect-video bg-slate-100 dark:bg-slate-900 mb-3 overflow-hidden border border-slate-100 dark:border-slate-600">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" alt="Team meeting" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors">
                    <div className="bg-white/90 p-3 rounded-full text-black shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={16} fill="currentColor" />
                    </div>
                  </div>
                </div>
                <h5 className="font-newspaper-head text-lg font-bold leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Documentation: The Unsung Hero of Engineering
                </h5>
                <span className="text-xs font-sans text-slate-500 mt-1 block">08:20 • Keynote</span>
              </a>
            </div>
          </div>

          {/* Advertisement / Promo Box */}
          <div className="bg-indigo-50 dark:bg-slate-800/50 p-6 border border-indigo-100 dark:border-slate-700 text-center">
            <h4 className="font-newspaper-head font-bold text-xl mb-2 text-indigo-900 dark:text-indigo-100">
              Join the Discussion
            </h4>
            <p className="font-newspaper-body text-sm text-slate-600 dark:text-slate-400 mb-4 italic">
              "The best way to learn is to teach."
            </p>
            <button className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-sans text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
              Subscribe to Newsletter
            </button>
          </div>

        </div>
      </div>
    </Section>
  );
};

export default BlogSection;