'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { mockNotes, subjects } from '@/lib/data';
import { Note } from '@/lib/types';
import Navigation from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CreateNotePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    content: ''
  });

  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validaciones
    if (!formData.title.trim()) {
      setError('El título es obligatorio');
      setLoading(false);
      return;
    }

    if (!formData.subject) {
      setError('Debes seleccionar una materia');
      setLoading(false);
      return;
    }

    if (!formData.content.trim()) {
      setError('El contenido es obligatorio');
      setLoading(false);
      return;
    }

    if (formData.content.length < 50) {
      setError('El contenido debe tener al menos 50 caracteres');
      setLoading(false);
      return;
    }

    try {
      // Simular delay de creación
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Crear nuevo apunte
      const newNote: Note = {
        id: Date.now().toString(),
        title: formData.title.trim(),
        subject: formData.subject,
        content: formData.content.trim(),
        authorId: user.id,
        authorName: user.name,
        rating: 0,
        ratingsCount: 0,
        createdAt: new Date()
      };

      // Agregar a la lista simulada
      mockNotes.unshift(newNote);

      setSuccess(true);
      
      // Redirigir después de un momento
      setTimeout(() => {
        router.push('/notes');
      }, 2000);

    } catch (err) {
      setError('Error al crear el apunte. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-2xl mx-auto px-4 py-16">
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="text-green-600 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Apunte creado exitosamente!</h2>
              <p className="text-gray-600 mb-4">
                Tu apunte "{formData.title}" ha sido publicado y ya está disponible para la comunidad.
              </p>
              <p className="text-sm text-gray-500">
                Redirigiendo a la lista de apuntes...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Nuevo Apunte</h1>
          <p className="text-gray-600">
            Comparte tus conocimientos con la comunidad estudiantil
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Información del Apunte</CardTitle>
                <CardDescription>
                  Completa todos los campos para crear tu apunte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título del apunte *</Label>
                    <Input
                      id="title"
                      placeholder="Ej: Introducción al Cálculo Diferencial"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      disabled={loading}
                      maxLength={100}
                    />
                    <p className="text-xs text-gray-500">
                      {formData.title.length}/100 caracteres
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Materia *</Label>
                    <Select 
                      value={formData.subject} 
                      onValueChange={(value) => handleInputChange('subject', value)}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una materia" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Contenido del apunte *</Label>
                    <Textarea
                      id="content"
                      placeholder="Escribe aquí el contenido de tu apunte. Incluye conceptos, ejemplos, fórmulas, etc."
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      disabled={loading}
                      rows={12}
                      maxLength={5000}
                    />
                    <p className="text-xs text-gray-500">
                      {formData.content.length}/5000 caracteres (mínimo 50)
                    </p>
                  </div>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                      {error}
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="flex-1"
                    >
                      {loading ? 'Creando apunte...' : 'Publicar Apunte'}
                    </Button>
                    
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => router.back()}
                      disabled={loading}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Panel lateral con consejos */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Consejos para un buen apunte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">
                    Usa un título descriptivo y claro
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">
                    Organiza el contenido con subtítulos
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">
                    Incluye ejemplos prácticos
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">
                    Revisa la ortografía antes de publicar
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vista previa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">
                    {formData.title || 'Título del apunte'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {formData.subject || 'Materia'} • {user.name}
                  </p>
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {formData.content || 'El contenido de tu apunte aparecerá aquí...'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
