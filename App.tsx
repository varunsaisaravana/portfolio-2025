import React, { useState, useEffect } from 'react';
import Section from './components/Section';
import MagicEditor from './components/MagicEditor';
import ImageAnalyzer from './components/ImageAnalyzer';
import ProjectModal from './components/ProjectModal';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import { Project } from './types';
import { 
  Bot, 
  Code2, 
  Anchor, 
  Music2, 
  Menu, 
  X, 
  Award, 
  Brain, 
  Mic2,
  Waves,
  Sun,
  Moon,
  ArrowRight,
  Cpu,
  Layers,
  Wand2,
  ScanEye
} from 'lucide-react';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
    }
    return 'dark';
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeAiTab, setActiveAiTab] = useState<'edit' | 'analyze'>('edit');

  // Handle Loading State
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Theme
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Engineering & Robotics', href: '#engineering' },
    { name: 'Arts & Music', href: '#arts' },
    { name: 'Athletics', href: '#athletics' },
    { name: 'AI Lab', href: '#ai-lab' },
    { name: 'Family & Travel', href: '#gallery' },
  ];

  const projects: Project[] = [
    {
      id: 'robotics-comp',
      title: 'Regional Robotics Competition',
      category: 'Robotics',
      description: 'Lead programmer and mechanical designer for regional robotics team. Developed autonomous navigation routines and optimized mechanical intake systems.',
      imageUrl: 'https://picsum.photos/600/400?random=101',
      technologies: ['C++', 'PID Control', 'Computer Vision', 'SolidWorks', 'ROS'],
      challenges: 'Integrating the autonomous navigation system with unreliable sensor data under variable lighting conditions was a major hurdle. The original optical sensors were too sensitive to the venue lighting.',
      outcome: 'Achieved 2nd place in regionals. My redesigned intake mechanism was awarded "Best Engineering Design" for its reliability and speed.'
    },
    {
      id: 'weather-rover',
      title: 'Autonomous Weather Rover',
      category: 'Engineering',
      description: 'Designed custom PCBs and 3D printed chassis for a weather monitoring rover capable of traversing rough terrain while collecting environmental data.',
      imageUrl: 'https://picsum.photos/600/400?random=102',
      technologies: ['Eagle PCB', 'Arduino', '3D Printing', 'LoRaWAN', 'Fusion 360'],
      challenges: 'Power management for 24-hour operation and weatherproofing the electronics enclosure without causing overheating were significant constraints.',
      outcome: 'Successfully deployed in a local park for 2 weeks, collecting temperature, humidity, and pressure data. The custom power distribution board efficiency exceeded initial calculations by 15%.'
    },
    {
      id: 'recycling-cv',
      title: 'AI Recycling Sorter',
      category: 'Research',
      description: 'Exploring computer vision applications for sorting recyclable materials. Created a prototype conveyor belt system that identifies and separates plastics.',
      imageUrl: 'https://picsum.photos/600/400?random=103',
      technologies: ['Python', 'OpenCV', 'TensorFlow', 'Raspberry Pi', 'Stepper Motors'],
      challenges: 'Differentiating between crushed plastic bottles and aluminum cans with low-resolution camera input required training a custom model on a very specific dataset.',
      outcome: 'Prototype achieves 85% accuracy in controlled lighting. The research paper on "Accessible Automated Recycling" was presented at the school science fair.'
    }
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500/30 transition-colors duration-300 animate-in fade-in duration-700">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold font-mono tracking-tighter hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            VARUN<span className="text-indigo-600 dark:text-indigo-500">.</span>DEV
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
              >
                {link.name}
              </a>
            ))}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border border-slate-200 dark:border-slate-700"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border border-slate-200 dark:border-slate-700"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-6 px-6 flex flex-col gap-4 shadow-2xl">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Abstract Background Elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-cyan-600/10 dark:bg-cyan-600/10 rounded-full blur-[100px] -z-10"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 text-sm font-semibold uppercase tracking-wider">
            Prospective High School Portfolio
          </div>
          <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight leading-tight text-slate-900 dark:text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-cyan-600 to-indigo-600 dark:from-indigo-400 dark:via-cyan-400 dark:to-indigo-400">
              Autodidact.<br/>
            </span> 
            Innovator.<br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-cyan-600 to-indigo-600 dark:from-indigo-400 dark:via-cyan-400 dark:to-indigo-400">
              Future Engineer.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Hi, I'm Varun. I bridge the gap between mechanical systems and digital intelligence.
            My passion lies in Robotics, Coding, AI Research and the disciplined pursuit of excellence in both Arts and Athletics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#engineering" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2">
              Explore My Work <Award size={18} />
            </a>
            <a href="#ai-lab" className="px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-bold border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-2">
              Try the AI Lab <Brain size={18} />
            </a>
          </div>
        </div>
      </header>

      {/* About & Academics */}
      <Section id="about" title="Academic Excellence" subtitle="Building a strong foundation in STEM to solve tomorrow's problems." darker>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 transition-all group shadow-sm">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Brain className="text-indigo-600 dark:text-indigo-400 w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Math & Science</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Consistently top-tier performance in Advanced Mathematics and Physics. Passionate about applying theoretical concepts to real-world engineering challenges.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 transition-all group shadow-sm">
            <div className="bg-cyan-100 dark:bg-cyan-900/30 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Code2 className="text-cyan-600 dark:text-cyan-400 w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Computer Science</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Fluent in Python, TypeScript, and React. Developing software that interacts with the physical world through sensors and actuators.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 transition-all group shadow-sm">
            <div className="bg-purple-100 dark:bg-purple-900/30 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Bot className="text-purple-600 dark:text-purple-400 w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Research & Inquiry</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Actively conducting independent research in automation. Deep interest in continuing research throughout high school and university.
            </p>
          </div>
        </div>
      </Section>

      {/* Engineering & Robotics */}
      <Section id="engineering" title="Engineering & Robotics" subtitle="From concept to prototype, I love building things that move. Click on a project to learn more." className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white px-4 py-2 rounded-full text-sm font-semibold transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-lg">
                    View Details
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                   {project.category === 'Robotics' && <Bot size={16} className="text-indigo-500" />}
                   {project.category === 'Engineering' && <Cpu size={16} className="text-cyan-500" />}
                   {project.category === 'Research' && <Layers size={16} className="text-purple-500" />}
                   <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{project.category}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-grow">
                  {project.description}
                </p>
                <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold text-sm group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* AI Creative Lab */}
      <Section id="ai-lab" title="AI Research Lab" subtitle="I explore the boundaries of AI with Google's Gemini models. Try both tools below." darker>
        
        <div className="flex justify-center mb-10">
          <div className="bg-slate-200 dark:bg-slate-800 p-1.5 rounded-xl inline-flex relative shadow-inner">
            <button 
              onClick={() => setActiveAiTab('edit')}
              className={`relative z-10 flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeAiTab === 'edit' ? 'text-indigo-600 dark:text-white bg-white dark:bg-indigo-600 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
            >
              <Wand2 size={18} />
              AI Image Editor
            </button>
            <button 
              onClick={() => setActiveAiTab('analyze')}
              className={`relative z-10 flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeAiTab === 'analyze' ? 'text-cyan-600 dark:text-white bg-white dark:bg-cyan-600 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
            >
              <ScanEye size={18} />
              AI Image Analyzer
            </button>
          </div>
        </div>

        <div className="transition-all duration-500 ease-in-out">
           {activeAiTab === 'edit' ? <MagicEditor /> : <ImageAnalyzer />}
        </div>

      </Section>

      {/* Athletics */}
      <Section id="athletics" title="Athletics" subtitle="Discipline, teamwork, and endurance on the water." className="bg-slate-900 dark:bg-slate-900">
        {/* Force dark bg for this section specifically for contrast with images */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 relative group rounded-3xl overflow-hidden h-96 shadow-lg">
            <img 
              src="https://picsum.photos/800/600?random=3" 
              alt="Rowing" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
              <div className="flex items-center gap-3 mb-2">
                <Waves className="text-cyan-400" />
                <h3 className="text-3xl font-bold text-white">Rowing</h3>
              </div>
              <p className="text-slate-200">Competitive rower committed to early mornings and synchronous teamwork. Developing resilience and physical stamina.</p>
            </div>
          </div>
          
          <div className="relative group rounded-3xl overflow-hidden h-96 shadow-lg">
            <img 
              src="https://picsum.photos/400/600?random=4" 
              alt="Sailing" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
              <div className="flex items-center gap-3 mb-2">
                <Anchor className="text-indigo-400" />
                <h3 className="text-2xl font-bold text-white">Sailing</h3>
              </div>
              <p className="text-slate-200">Navigating complex variables and making quick decisions under pressure.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-3 bg-white dark:bg-slate-800/50 px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-slate-700 dark:text-slate-300 font-medium">Also active in Recreational Swimming</span>
            </div>
        </div>
      </Section>

      {/* Arts */}
      <Section id="arts" title="Arts & Culture" subtitle="Exploring creativity through music and harmony." darker>
        <div className="grid md:grid-cols-2 gap-12">
           <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center shadow-sm">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <Music2 className="text-purple-600 dark:text-purple-400 w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Piano</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Classically trained with a focus on romantic era compositions. Piano teaches me patience, precision, and the ability to express complex emotions without words.
              </p>
              <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden relative">
                  <img src="https://picsum.photos/500/300?grayscale&random=5" alt="Piano Keys" className="w-full h-full object-cover opacity-60" />
              </div>
           </div>

           <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center shadow-sm">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <Mic2 className="text-pink-600 dark:text-pink-400 w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Choir</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Member of the school choir. Learning the importance of listening to others and contributing to a collective sound that is greater than the sum of its parts.
              </p>
              <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden relative">
                  <img src="https://picsum.photos/500/300?grayscale&random=6" alt="Choir Sheet Music" className="w-full h-full object-cover opacity-60" />
              </div>
           </div>
        </div>
      </Section>

      {/* Gallery */}
      <Section id="gallery" title="Family & Travel" subtitle="A glimpse into my world, family, and adventures.">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {[7, 8, 9, 10, 11, 12].map((i) => (
            <div key={i} className="break-inside-avoid relative group rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
              <img 
                src={`https://picsum.photos/400/${i % 2 === 0 ? '500' : '300'}?random=${i}`} 
                alt="Travel and Family" 
                className="w-full h-auto transform transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-medium border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">View Memory</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-slate-950 py-12 border-t border-slate-200 dark:border-slate-900 transition-colors">
        <div className="container mx-auto px-6 text-center">
          <a href="#" className="text-2xl font-bold font-mono tracking-tighter hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            VARUN<span className="text-indigo-600 dark:text-indigo-500">.</span>DEV
          </a>
          <div className="flex justify-center gap-8 mb-8">
            <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/varun-sai-saravana-776b65248/" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">LinkedIn</a>
            <a href="mailto:varun.jo.sp@gmail.com" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Email</a>
          </div>
          <p className="text-slate-500 dark:text-slate-600 text-sm">
            © {new Date().getFullYear()} Varun's Portfolio. Built with React, Tailwind, and Gemini AI.
          </p>
        </div>
      </footer>

      {/* Scroll to Top */}
      <ScrollToTop />
    </div>
  );
};

export default App;