'use client';

import Link from 'next/link';
import { Note } from '@/lib/types';
import { SimpleRating } from '@/components/Rating';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface NoteCardProps {
  note: Note;
  showActions?: boolean;
}

export default function NoteCard({ note, showActions = false }: NoteCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
              <Link 
                href={`/notes/${note.id}`}
                className="hover:text-blue-600 transition-colors"
              >
                {note.title}
              </Link>
            </CardTitle>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {note.subject}
              </Badge>
              <span className="text-sm text-gray-500">
                por {note.authorName}
              </span>
            </div>
          </div>
        </div>
        
        <CardDescription className="line-clamp-2">
          {note.content}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <SimpleRating 
            rating={note.rating} 
            ratingsCount={note.ratingsCount}
            size="sm"
          />
          
          <span className="text-xs text-gray-500">
            {formatDate(note.createdAt)}
          </span>
        </div>
        
        {showActions && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex space-x-2">
              <Link 
                href={`/notes/${note.id}`}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Ver completo
              </Link>
              <span className="text-gray-300">•</span>
              <button className="text-sm text-gray-600 hover:text-gray-800">
                Compartir
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Componente compacto para listas
export function CompactNoteCard({ note }: { note: Note }) {
  return (
    <div className="border-l-4 border-blue-500 pl-4 py-2">
      <Link 
        href={`/notes/${note.id}`}
        className="block hover:bg-gray-50 rounded p-2 -m-2 transition-colors"
      >
        <h4 className="font-semibold text-gray-900 mb-1">{note.title}</h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>{note.subject}</span>
            <span>•</span>
            <span>{note.authorName}</span>
          </div>
          <SimpleRating 
            rating={note.rating} 
            ratingsCount={note.ratingsCount}
            size="sm"
          />
        </div>
      </Link>
    </div>
  );
}
