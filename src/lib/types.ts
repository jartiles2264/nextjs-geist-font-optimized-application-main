export interface User {
  id: string;
  name: string;
  email: string;
  reputation: number;
  createdAt: Date;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  authorId: string;
  authorName: string;
  rating: number;
  ratingsCount: number;
  createdAt: Date;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  questions: Question[];
  authorId: string;
  authorName: string;
  rating: number;
  ratingsCount: number;
  createdAt: Date;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  subject: string;
  authorId: string;
  authorName: string;
  replies: Reply[];
  votes: number;
  createdAt: Date;
}

export interface Reply {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  votes: number;
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export type Subject = 
  | 'Matemáticas'
  | 'Física'
  | 'Química'
  | 'Historia'
  | 'Literatura'
  | 'Inglés'
  | 'Biología'
  | 'Programación';
