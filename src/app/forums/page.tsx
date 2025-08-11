'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { mockForumPosts, subjects } from '@/lib/data';
import Navigation from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function ForumsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'votes' | 'replies'>('recent');

  if (!user) {
    return null;
  }

  // Filtrar y ordenar posts del foro
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = mockForumPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.authorName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSubject = selectedSubject === 'all' || post.subject === selectedSubject;
      
      return matchesSearch && matchesSubject;
    });

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'votes':
          return b.votes - a.votes;
        case 'replies':
          return b.replies.length - a.replies.length;
        case 'recent':
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

    return filtered;
  }, [searchTerm, selectedSubject, sortBy]);

  // Estadísticas por materia
  const subjectStats = useMemo(() => {
    return subjects.map(subject => {
      const subjectPosts = mockForumPosts.filter(post => post.subject === subject);
      const totalReplies = subjectPosts.reduce((sum, post) => sum + post.replies.length, 0);
      return {
        subject,
        posts: subjectPosts.length,
        replies: totalReplies,
        lastActivity: subjectPosts.length > 0 
          ? Math.max(...subjectPosts.map(p => p.createdAt.getTime()))
          : 0
      };
    }).filter(stat => stat.posts > 0);
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatRelativeTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Hoy';
    if (days === 1) return 'Ayer';
    if (days < 7) return `Hace ${days} días`;
    return formatDate(new Date(timestamp));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Foros de Discusión</h1>
          <p className="text-gray-600">
            Haz preguntas, comparte conocimientos y ayuda a otros estudiantes
          </p>
        </div>

        {/* Vista por materias */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Explorar por Materias</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjectStats.map((stat) => (
              <Link key={stat.subject} href={`/forums/${encodeURIComponent(stat.subject)}`}>
                <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{stat.subject}</CardTitle>
                    <CardDescription>
                      {stat.posts} pregunta{stat.posts !== 1 ? 's' : ''} • {stat.replies} respuesta{stat.replies !== 1 ? 's' : ''}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary" className="text-xs">
                        {stat.posts} posts
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {formatRelativeTime(stat.lastActivity)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 md:mb-0">
              Todas las Discusiones
            </h2>
            <Button>
              Nueva Pregunta
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Buscar discusiones..."
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
            
            <Select value={sortBy} onValueChange={(value: 'recent' | 'votes' | 'replies') => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Más recientes</SelectItem>
                <SelectItem value="votes">Más votados</SelectItem>
                <SelectItem value="replies">Más respuestas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Estadísticas generales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">{mockForumPosts.length}</div>
            <p className="text-sm text-gray-600">Total preguntas</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {mockForumPosts.reduce((sum, post) => sum + post.replies.length, 0)}
            </div>
            <p className="text-sm text-gray-600">Total respuestas</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-green-600">{filteredAndSortedPosts.length}</div>
            <p className="text-sm text-gray-600">Resultados encontrados</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">{subjects.length}</div>
            <p className="text-sm text-gray-600">Materias activas</p>
          </div>
        </div>

        {/* Lista de discusiones */}
        {filteredAndSortedPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.697-.413l-2.725.688c-.442.111-.905-.111-.905-.587l.688-2.725A8.955 8.955 0 014 12C4 7.582 7.582 4 12 4s8 3.582 8 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron discusiones</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedSubject !== 'all' 
                ? 'Intenta ajustar tus filtros de búsqueda'
                : 'Sé el primero en hacer una pregunta'
              }
            </p>
            <Button>Hacer la primera pregunta</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-purple-600">
                          {post.authorName.charAt(0)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {post.subject}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          por {post.authorName}
                        </span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        <Link 
                          href={`/forums/${encodeURIComponent(post.subject)}/${post.id}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {post.content}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <span>↑</span>
                          <span>{post.votes} votos</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>💬</span>
                          <span>{post.replies.length} respuestas</span>
                        </div>
                        <Link 
                          href={`/forums/${encodeURIComponent(post.subject)}/${post.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Ver discusión
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Paginación simulada */}
        {filteredAndSortedPosts.length > 0 && (
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
