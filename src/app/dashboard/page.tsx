'use client';

import { useAuth } from '@/context/AuthContext';
import { mockNotes, mockQuizzes, mockForumPosts } from '@/lib/data';
import Navigation from '@/components/layout/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  // Obtener contenido reciente
  const recentNotes = mockNotes.slice(0, 3);
  const recentQuizzes = mockQuizzes.slice(0, 2);
  const recentPosts = mockForumPosts.slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header de bienvenida */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Hola, {user.name}!
          </h1>
          <p className="text-gray-600">
            Bienvenido de vuelta a tu plataforma de estudio
          </p>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">{mockNotes.length}</div>
              <p className="text-sm text-gray-600">Apuntes disponibles</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">{mockQuizzes.length}</div>
              <p className="text-sm text-gray-600">Cuestionarios</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600">{mockForumPosts.length}</div>
              <p className="text-sm text-gray-600">Discusiones activas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-orange-600">{user.reputation.toFixed(1)}</div>
              <p className="text-sm text-gray-600">Tu reputación</p>
            </CardContent>
          </Card>
        </div>

        {/* Accesos rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href="/notes/create">
            <Button className="w-full h-20 text-left flex flex-col items-start justify-center">
              <span className="font-semibold">Crear Apunte</span>
              <span className="text-sm opacity-90">Comparte tus notas</span>
            </Button>
          </Link>
          
          <Link href="/quizzes/create">
            <Button variant="outline" className="w-full h-20 text-left flex flex-col items-start justify-center">
              <span className="font-semibold">Nuevo Quiz</span>
              <span className="text-sm opacity-70">Crea un cuestionario</span>
            </Button>
          </Link>
          
          <Link href="/forums">
            <Button variant="outline" className="w-full h-20 text-left flex flex-col items-start justify-center">
              <span className="font-semibold">Hacer Pregunta</span>
              <span className="text-sm opacity-70">Participa en foros</span>
            </Button>
          </Link>
          
          <Link href="/profile">
            <Button variant="outline" className="w-full h-20 text-left flex flex-col items-start justify-center">
              <span className="font-semibold">Mi Perfil</span>
              <span className="text-sm opacity-70">Ver estadísticas</span>
            </Button>
          </Link>
        </div>

        {/* Contenido reciente */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Apuntes recientes */}
          <Card>
            <CardHeader>
              <CardTitle>Apuntes Recientes</CardTitle>
              <CardDescription>Los últimos apuntes compartidos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentNotes.map((note) => (
                <div key={note.id} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900">{note.title}</h4>
                  <p className="text-sm text-gray-600">{note.subject} • {note.authorName}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-yellow-600">★ {note.rating}</span>
                    <span className="text-sm text-gray-500 ml-2">({note.ratingsCount} valoraciones)</span>
                  </div>
                </div>
              ))}
              <Link href="/notes">
                <Button variant="link" className="p-0 h-auto">
                  Ver todos los apuntes →
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Actividad del foro */}
          <Card>
            <CardHeader>
              <CardTitle>Actividad del Foro</CardTitle>
              <CardDescription>Discusiones recientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900">{post.title}</h4>
                  <p className="text-sm text-gray-600">{post.subject} • {post.authorName}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-500">{post.replies.length} respuestas</span>
                    <span className="text-sm text-gray-500 ml-2">↑ {post.votes} votos</span>
                  </div>
                </div>
              ))}
              <Link href="/forums">
                <Button variant="link" className="p-0 h-auto">
                  Ver todos los foros →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
