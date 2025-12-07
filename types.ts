export interface Project {
  id: string;
  title: string;
  category: 'Robotics' | 'Coding' | 'Engineering' | 'Research';
  description: string;
  imageUrl: string;
  technologies: string[];
  challenges: string;
  outcome: string;
  learnings: string;
}

export interface Activity {
  id: string;
  title: string;
  role: string;
  description: string;
  iconName: string; 
}

export interface ImageEditState {
  original: string | null;
  generated: string | null;
  prompt: string;
  isLoading: boolean;
  error: string | null;
}