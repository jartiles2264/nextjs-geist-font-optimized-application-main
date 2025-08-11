import { User, Note, Quiz, ForumPost, Subject } from './types';

// Usuarios simulados
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana García',
    email: 'ana@estudiante.com',
    reputation: 4.8,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Carlos López',
    email: 'carlos@estudiante.com',
    reputation: 4.2,
    createdAt: new Date('2024-02-10')
  },
  {
    id: '3',
    name: 'María Rodríguez',
    email: 'maria@estudiante.com',
    reputation: 4.9,
    createdAt: new Date('2024-01-20')
  }
];

// Apuntes simulados
export const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Introducción al Cálculo Diferencial',
    content: 'Conceptos básicos de límites y derivadas. Incluye ejemplos prácticos y ejercicios resueltos.',
    subject: 'Matemáticas',
    authorId: '1',
    authorName: 'Ana García',
    rating: 4.7,
    ratingsCount: 23,
    createdAt: new Date('2024-03-01')
  },
  {
    id: '2',
    title: 'Leyes de Newton - Mecánica Clásica',
    content: 'Explicación detallada de las tres leyes de Newton con ejemplos del mundo real.',
    subject: 'Física',
    authorId: '2',
    authorName: 'Carlos López',
    rating: 4.5,
    ratingsCount: 18,
    createdAt: new Date('2024-03-05')
  },
  {
    id: '3',
    title: 'Tabla Periódica y Propiedades',
    content: 'Organización de elementos químicos y sus propiedades fundamentales.',
    subject: 'Química',
    authorId: '3',
    authorName: 'María Rodríguez',
    rating: 4.8,
    ratingsCount: 31,
    createdAt: new Date('2024-03-10')
  }
];

// Cuestionarios simulados
export const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Derivadas Básicas',
    subject: 'Matemáticas',
    questions: [
      {
        id: '1',
        question: '¿Cuál es la derivada de x²?',
        options: ['x', '2x', 'x²', '2'],
        correctAnswer: 1
      },
      {
        id: '2',
        question: '¿Cuál es la derivada de una constante?',
        options: ['1', '0', 'La misma constante', 'x'],
        correctAnswer: 1
      }
    ],
    authorId: '1',
    authorName: 'Ana García',
    rating: 4.6,
    ratingsCount: 15,
    createdAt: new Date('2024-03-12')
  },
  {
    id: '2',
    title: 'Fuerzas y Movimiento',
    subject: 'Física',
    questions: [
      {
        id: '1',
        question: '¿Cuál es la unidad de fuerza en el SI?',
        options: ['Joule', 'Newton', 'Pascal', 'Watt'],
        correctAnswer: 1
      },
      {
        id: '2',
        question: 'La segunda ley de Newton establece que F = ?',
        options: ['mv', 'ma', 'mg', 'mv²'],
        correctAnswer: 1
      }
    ],
    authorId: '2',
    authorName: 'Carlos López',
    rating: 4.4,
    ratingsCount: 12,
    createdAt: new Date('2024-03-15')
  }
];

// Posts del foro simulados
export const mockForumPosts: ForumPost[] = [
  {
    id: '1',
    title: '¿Cómo resolver integrales por partes?',
    content: 'Tengo dificultades para entender el método de integración por partes. ¿Alguien puede explicar el proceso paso a paso?',
    subject: 'Matemáticas',
    authorId: '2',
    authorName: 'Carlos López',
    replies: [
      {
        id: '1',
        content: 'La fórmula es ∫u dv = uv - ∫v du. Primero identifica u y dv, luego aplica la fórmula.',
        authorId: '1',
        authorName: 'Ana García',
        votes: 8,
        createdAt: new Date('2024-03-16')
      },
      {
        id: '2',
        content: 'Un truco es recordar LIATE: Logarítmicas, Inversas trigonométricas, Algebraicas, Trigonométricas, Exponenciales.',
        authorId: '3',
        authorName: 'María Rodríguez',
        votes: 12,
        createdAt: new Date('2024-03-17')
      }
    ],
    votes: 5,
    createdAt: new Date('2024-03-15')
  },
  {
    id: '2',
    title: 'Diferencia entre velocidad y aceleración',
    content: '¿Puede alguien explicar claramente la diferencia entre velocidad y aceleración con ejemplos?',
    subject: 'Física',
    authorId: '3',
    authorName: 'María Rodríguez',
    replies: [
      {
        id: '1',
        content: 'Velocidad es qué tan rápido te mueves, aceleración es qué tan rápido cambia tu velocidad.',
        authorId: '1',
        authorName: 'Ana García',
        votes: 6,
        createdAt: new Date('2024-03-18')
      }
    ],
    votes: 3,
    createdAt: new Date('2024-03-17')
  }
];

// Lista de materias disponibles
export const subjects: Subject[] = [
  'Matemáticas',
  'Física',
  'Química',
  'Historia',
  'Literatura',
  'Inglés',
  'Biología',
  'Programación'
];

// Función para simular delay en operaciones async
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
