'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { mockNotes, mockQuizzes, mockForumPosts } from '@/lib/data';
import Navigation from '@/components/layout/Navigation';
import { CompactNoteCard } from '@/components/NoteCard';
import { SimpleRating } from '@/components/Rating';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  if (!user) {
    return null;
  }

  // Obtener contenido del usuario
  const userNotes = mockNotes.filter(note => note.authorId === user.id);
  const userQuizzes = mockQuizzes.filter(quiz => quiz.authorId === user.id);
  const userPosts = mockForumPosts.filter(post => post.authorId === user.id);

  // Calcular estadísticas
  const totalRatings = userNotes.reduce((sum, note) => sum + note.ratingsCount, 0) +
                      userQuizzes.reduce((sum, quiz) => sum + quiz.ratingsCount, 0);
  
  const averageRating = userNotes.length + userQuizzes.length > 0 
    ? (userNotes.reduce((sum, note) => sum + (note.rating * note.ratingsCount), 0) +
       userQuizzes.reduce((sum, quiz) => sum + (quiz.rating * quiz.ratingsCount), 0)) / totalRatings
    : 0;

  const handleSaveProfile = () => {
    // Aquí se actualizaría el perfil en una aplicación real
    console.log('Perfil actualizado:', editForm);
    setIsEditing(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel de información del usuario */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-blue-600">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent>
                {!isEditing ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {user.reputation.toFixed(1)}
                      </div>
                      <p className="text-sm text-gray-600">Reputación general</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">
                        {averageRating > 0 ? averageRating.toFixed(1) : 'N/A'}
                      </div>
                      <p className="text-sm text-gray-600">Valoración promedio</p>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setIsEditing(true)}
                    >
                      Editar perfil
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm(prev => ({...prev, name: e.target.value}))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm(prev => ({...prev, email: e.target.value}))}
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        onClick={handleSaveProfile}
                        className="flex-1"
                      >
                        Guardar
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Estadísticas rápidas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Apuntes creados:</span>
                  <span className="font-semibold text-blue-600">{userNotes.length}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Cuestionarios:</span>
                  <span className="font-semibold text-green-600">{userQuizzes.length}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Posts en foros:</span>
                  <span className="font-semibold text-purple-600">{userPosts.length}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total valoraciones:</span>
                  <span className="font-semibold text-orange-600">{totalRatings}</span>
                </div>

                <div className="pt-2 border-t">
                  <div className="text-xs text-gray-500">
                    Miembro desde {formatDate(user.createdAt)}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Logros */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Logros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {userNotes.length > 0 && (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm">📝</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Primer Apunte</p>
                      <p className="text-xs text-gray-500">Compartiste tu primer apunte</p>
                    </div>
                  </div>
                )}
                
                {userQuizzes.length > 0 && (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-sm">🎯</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Creador de Quiz</p>
                      <p className="text-xs text-gray-500">Creaste tu primer cuestionario</p>
                    </div>
                  </div>
                )}
                
                {totalRatings >= 10 && (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 text-sm">⭐</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Popular</p>
                      <p className="text-xs text-gray-500">Recibiste 10+ valoraciones</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Mi Actividad</CardTitle>
                <CardDescription>
                  Todo el contenido que has creado y compartido
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="notes" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="notes">
                      Apuntes ({userNotes.length})
                    </TabsTrigger>
                    <TabsTrigger value="quizzes">
                      Cuestionarios ({userQuizzes.length})
                    </TabsTrigger>
                    <TabsTrigger value="forum">
                      Foro ({userPosts.length})
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="notes" className="mt-6">
                    {userNotes.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">Aún no has creado ningún apunte</p>
                        <Button onClick={() => window.location.href = '/notes/create'}>
                          Crear mi primer apunte
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {userNotes.map((note) => (
                          <CompactNoteCard key={note.id} note={note} />
                        ))}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="quizzes" className="mt-6">
                    {userQuizzes.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">Aún no has creado ningún cuestionario</p>
                        <Button onClick={() => window.location.href = '/quizzes/create'}>
                          Crear mi primer cuestionario
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {userQuizzes.map((quiz) => (
                          <div key={quiz.id} className="border-l-4 border-green-500 pl-4 py-2">
                            <h4 className="font-semibold text-gray-900 mb-1">{quiz.title}</h4>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <span>{quiz.subject}</span>
                                <span>•</span>
                                <span>{quiz.questions.length} preguntas</span>
                              </div>
                              <SimpleRating 
                                rating={quiz.rating} 
                                ratingsCount={quiz.ratingsCount}
                                size="sm"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="forum" className="mt-6">
                    {userPosts.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">Aún no has participado en los foros</p>
                        <Button onClick={() => window.location.href = '/forums'}>
                          Explorar foros
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {userPosts.map((post) => (
                          <div key={post.id} className="border-l-4 border-purple-500 pl-4 py-2">
                            <h4 className="font-semibold text-gray-900 mb-1">{post.title}</h4>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <span>{post.subject}</span>
                                <span>•</span>
                                <span>{post.replies.length} respuestas</span>
                              </div>
                              <span className="text-sm text-gray-500">↑ {post.votes} votos</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
