'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { mockNotes } from '@/lib/data';
import Navigation from '@/components/layout/Navigation';
import Rating from '@/components/Rating';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

export default function NoteDetailPage() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const [comment, setComment] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [showCommentForm, setShowCommentForm] = useState(false);

  if (!user) {
    return null;
  }

  const note = mockNotes.find(n => n.id === params.id);

  if (!note) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Apunte no encontrado</h2>
              <p className="text-gray-600 mb-4">
                El apunte que buscas no existe o ha sido eliminado.
              </p>
              <Button onClick={() => router.push('/notes')}>
                Volver a apuntes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleRate = (rating: number) => {
    setUserRating(rating);
    // Aquí se actualizaría la valoración en una aplicación real
    console.log(`Usuario valoró con ${rating} estrellas`);
  };

  const handleComment = () => {
    if (comment.trim()) {
      // Aquí se agregaría el comentario en una aplicación real
      console.log('Comentario agregado:', comment);
      setComment('');
      setShowCommentForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <button 
              onClick={() => router.push('/notes')}
              className="hover:text-gray-900"
            >
              Apuntes
            </button>
            <span>›</span>
            <span className="text-gray-900">{note.title}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                      {note.title}
                    </CardTitle>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge variant="secondary" className="text-sm">
                        {note.subject}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        por <span className="font-medium">{note.authorName}</span>
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(note.createdAt)}
                      </span>
                    </div>

                    <div className="mb-4">
                      <Rating
                        rating={note.rating}
                        ratingsCount={note.ratingsCount}
                        onRate={handleRate}
                        size="md"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {note.content}
                  </div>
                </div>

                {/* Imagen de ejemplo para el apunte */}
                <div className="mt-8">
                  <img 
                    src="https://placehold.co/800x400?text=Diagrama+o+imagen+explicativa+del+apunte+con+contenido+educativo" 
                    alt="Diagrama o imagen explicativa del apunte con contenido educativo"
                    className="w-full rounded-lg border"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Sección de comentarios */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg">Comentarios y Discusión</CardTitle>
                <CardDescription>
                  Comparte tus dudas o aportes sobre este apunte
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!showCommentForm ? (
                  <Button 
                    onClick={() => setShowCommentForm(true)}
                    variant="outline"
                    className="w-full"
                  >
                    Agregar comentario
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Escribe tu comentario o pregunta..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                    />
                    <div className="flex space-x-2">
                      <Button onClick={handleComment} disabled={!comment.trim()}>
                        Publicar comentario
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setShowCommentForm(false);
                          setComment('');
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}

                {/* Comentarios simulados */}
                <div className="mt-6 space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-900">María Rodríguez</span>
                      <span className="text-sm text-gray-500">hace 2 días</span>
                    </div>
                    <p className="text-gray-700">
                      Excelente explicación! Me ayudó mucho a entender los conceptos básicos. 
                      ¿Podrías agregar algunos ejercicios de práctica?
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-900">Carlos López</span>
                      <span className="text-sm text-gray-500">hace 1 día</span>
                    </div>
                    <p className="text-gray-700">
                      Muy claro y bien estructurado. Lo voy a usar para mi examen de la próxima semana.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel lateral */}
          <div className="space-y-6">
            {/* Información del autor */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Autor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-blue-600">
                      {note.authorName.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{note.authorName}</h3>
                  <p className="text-sm text-gray-600 mt-1">Estudiante activo</p>
                  <div className="mt-3">
                    <div className="text-sm text-gray-600">
                      Reputación: <span className="font-medium">4.8/5</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estadísticas del apunte */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Valoraciones:</span>
                  <span className="text-sm font-medium">{note.ratingsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Puntuación:</span>
                  <span className="text-sm font-medium">{note.rating.toFixed(1)}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Vistas:</span>
                  <span className="text-sm font-medium">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Descargas:</span>
                  <span className="text-sm font-medium">43</span>
                </div>
              </CardContent>
            </Card>

            {/* Acciones */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Acciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  Compartir apunte
                </Button>
                <Button variant="outline" className="w-full">
                  Descargar PDF
                </Button>
                <Button variant="outline" className="w-full">
                  Reportar contenido
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
