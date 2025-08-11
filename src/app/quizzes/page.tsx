'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { mockQuizzes, subjects } from '@/lib/data';
import Navigation from '@/components/layout/Navigation';
import { SimpleRating } from '@/components/Rating';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function QuizzesPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'title'>('recent');

  if (!user) {
    return null;
  }

  // Filtrar y ordenar cuestionarios
  const filteredAndSortedQuizzes = useMemo(() => {
    let filtered = mockQuizzes.filter(quiz => {
      const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           quiz.authorName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSubject = selectedSubject === 'all' || quiz.subject === selectedSubject;
      
      return matchesSearch && matchesSubject;
    });

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'recent':
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

    return filtered;
  }, [searchTerm, selectedSubject, sortBy]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Cuestionarios</h1>
            <p className="text-gray-600">
              Pon a prueba tus conocimientos y crea nuevos desafíos
            </p>
          </div>
          
          <Link href="/quizzes/create">
            <Button className="mt-4 md:mt-0">
              Crear Cuestionario
            </Button>
          </Link>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Buscar cuestionarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las materias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las materias</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={(value: 'recent' | 'rating' | 'title') => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Más recientes</SelectItem>
                <SelectItem value="rating">Mejor valorados</SelectItem>
                <SelectItem value="title">Orden alfabético</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-green-600">{mockQuizzes.length}</div>
            <p className="text-sm text-gray-600">Total de cuestionarios</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{filteredAndSortedQuizzes.length}</div>
            <p className="text-sm text-gray-600">Resultados encontrados</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {mockQuizzes.reduce((sum, quiz) => sum + quiz.questions.length, 0)}
            </div>
            <p className="text-sm text-gray-600">Total de preguntas</p>
          </div>
        </div>

        {/* Lista de cuestionarios */}
        {filteredAndSortedQuizzes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron cuestionarios</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedSubject !== 'all' 
                ? 'Intenta ajustar tus filtros de búsqueda'
                : 'Sé el primero en crear un cuestionario'
              }
            </p>
            <Link href="/quizzes/create">
              <Button>Crear el primer cuestionario</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedQuizzes.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {quiz.subject}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {formatDate(quiz.createdAt)}
                    </span>
                  </div>
                  
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                    <Link 
                      href={`/quizzes/${quiz.id}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {quiz.title}
                    </Link>
                  </CardTitle>
                  
                  <CardDescription className="text-sm text-gray-600">
                    por {quiz.authorName}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{quiz.questions.length} preguntas</span>
                      <span>•</span>
                      <span>~{quiz.questions.length * 2} min</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <SimpleRating 
                      rating={quiz.rating} 
                      ratingsCount={quiz.ratingsCount}
                      size="sm"
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link href={`/quizzes/take/${quiz.id}`} className="flex-1">
                      <Button className="w-full" size="sm">
                        Realizar Quiz
                      </Button>
                    </Link>
                    <Link href={`/quizzes/${quiz.id}`}>
                      <Button variant="outline" size="sm">
                        Ver detalles
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Paginación simulada */}
        {filteredAndSortedQuizzes.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <Button variant="outline" disabled>
                Anterior
              </Button>
              <Button variant="outline" className="bg-blue-50 text-blue-600">
                1
              </Button>
              <Button variant="outline" disabled>
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
