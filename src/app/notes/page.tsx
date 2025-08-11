'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { mockNotes, subjects } from '@/lib/data';
import Navigation from '@/components/layout/Navigation';
import NoteCard from '@/components/NoteCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

export default function NotesPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'title'>('recent');

  if (!user) {
    return null;
  }

  // Filtrar y ordenar apuntes
  const filteredAndSortedNotes = useMemo(() => {
    let filtered = mockNotes.filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           note.authorName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject;
      
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Apuntes</h1>
            <p className="text-gray-600">
              Descubre y comparte conocimiento con la comunidad
            </p>
          </div>
          
          <Link href="/notes/create">
            <Button className="mt-4 md:mt-0">
              Crear Apunte
            </Button>
          </Link>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Buscar apuntes..."
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
            <div className="text-2xl font-bold text-blue-600">{mockNotes.length}</div>
            <p className="text-sm text-gray-600">Total de apuntes</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-green-600">{filteredAndSortedNotes.length}</div>
            <p className="text-sm text-gray-600">Resultados encontrados</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">{subjects.length}</div>
            <p className="text-sm text-gray-600">Materias disponibles</p>
          </div>
        </div>

        {/* Lista de apuntes */}
        {filteredAndSortedNotes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron apuntes</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedSubject !== 'all' 
                ? 'Intenta ajustar tus filtros de búsqueda'
                : 'Sé el primero en compartir un apunte'
              }
            </p>
            <Link href="/notes/create">
              <Button>Crear el primer apunte</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedNotes.map((note) => (
              <NoteCard key={note.id} note={note} showActions={true} />
            ))}
          </div>
        )}

        {/* Paginación simulada */}
        {filteredAndSortedNotes.length > 0 && (
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
