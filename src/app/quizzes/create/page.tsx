'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { mockQuizzes, subjects } from '@/lib/data';
import { Quiz, Question } from '@/lib/types';
import Navigation from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CreateQuizPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [quizData, setQuizData] = useState({
    title: '',
    subject: ''
  });

  const [questions, setQuestions] = useState<Omit<Question, 'id'>[]>([
    {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }
  ]);

  if (!user) {
    return null;
  }

  const addQuestion = () => {
    setQuestions([...questions, {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updated = [...questions];
    if (field === 'question') {
      updated[index].question = value;
    } else if (field === 'correctAnswer') {
      updated[index].correctAnswer = value;
    }
    setQuestions(updated);
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = value;
    setQuestions(updated);
  };

  const validateQuiz = () => {
    if (!quizData.title.trim()) {
      return 'El título es obligatorio';
    }

    if (!quizData.subject) {
      return 'Debes seleccionar una materia';
    }

    if (questions.length === 0) {
      return 'Debes agregar al menos una pregunta';
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      
      if (!q.question.trim()) {
        return `La pregunta ${i + 1} no puede estar vacía`;
      }

      const filledOptions = q.options.filter(opt => opt.trim() !== '');
      if (filledOptions.length < 2) {
        return `La pregunta ${i + 1} debe tener al menos 2 opciones`;
      }

      if (!q.options[q.correctAnswer]?.trim()) {
        return `La respuesta correcta de la pregunta ${i + 1} no puede estar vacía`;
      }
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const validationError = validateQuiz();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      // Simular delay de creación
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Crear nuevo cuestionario
      const newQuiz: Quiz = {
        id: Date.now().toString(),
        title: quizData.title.trim(),
        subject: quizData.subject,
        questions: questions.map((q, index) => ({
          id: `${Date.now()}-${index}`,
          question: q.question.trim(),
          options: q.options.filter(opt => opt.trim() !== ''),
          correctAnswer: q.correctAnswer
        })),
        authorId: user.id,
        authorName: user.name,
        rating: 0,
        ratingsCount: 0,
        createdAt: new Date()
      };

      // Agregar a la lista simulada
      mockQuizzes.unshift(newQuiz);

      setSuccess(true);
      
      // Redirigir después de un momento
      setTimeout(() => {
        router.push('/quizzes');
      }, 2000);

    } catch (err) {
      setError('Error al crear el cuestionario. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Cuestionario creado exitosamente!</h2>
              <p className="text-gray-600 mb-4">
                Tu cuestionario "{quizData.title}" ha sido publicado y ya está disponible para la comunidad.
              </p>
              <p className="text-sm text-gray-500">
                Redirigiendo a la lista de cuestionarios...
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Nuevo Cuestionario</h1>
          <p className="text-gray-600">
            Crea un cuestionario para que otros estudiantes pongan a prueba sus conocimientos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información básica */}
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
              <CardDescription>
                Datos generales del cuestionario
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título del cuestionario *</Label>
                <Input
                  id="title"
                  placeholder="Ej: Derivadas Básicas"
                  value={quizData.title}
                  onChange={(e) => setQuizData(prev => ({...prev, title: e.target.value}))}
                  disabled={loading}
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Materia *</Label>
                <Select 
                  value={quizData.subject} 
                  onValueChange={(value) => setQuizData(prev => ({...prev, subject: value}))}
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
            </CardContent>
          </Card>

          {/* Preguntas */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Preguntas</CardTitle>
                  <CardDescription>
                    Agrega las preguntas y opciones de respuesta
                  </CardDescription>
                </div>
                <Badge variant="secondary">
                  {questions.length} pregunta{questions.length !== 1 ? 's' : ''}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-gray-900">
                      Pregunta {questionIndex + 1}
                    </h4>
                    {questions.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeQuestion(questionIndex)}
                        disabled={loading}
                      >
                        Eliminar
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Pregunta *</Label>
                    <Input
                      placeholder="Escribe tu pregunta aquí"
                      value={question.question}
                      onChange={(e) => updateQuestion(questionIndex, 'question', e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Opciones de respuesta *</Label>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name={`correct-${questionIndex}`}
                          checked={question.correctAnswer === optionIndex}
                          onChange={() => updateQuestion(questionIndex, 'correctAnswer', optionIndex)}
                          disabled={loading}
                          className="text-blue-600"
                        />
                        <Input
                          placeholder={`Opción ${optionIndex + 1}`}
                          value={option}
                          onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                          disabled={loading}
                          className="flex-1"
                        />
                        <span className="text-xs text-gray-500 w-16">
                          {question.correctAnswer === optionIndex ? 'Correcta' : ''}
                        </span>
                      </div>
                    ))}
                    <p className="text-xs text-gray-500">
                      Selecciona la opción correcta marcando el círculo correspondiente
                    </p>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addQuestion}
                disabled={loading}
                className="w-full"
              >
                Agregar otra pregunta
              </Button>
            </CardContent>
          </Card>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex space-x-4">
            <Button 
              type="submit" 
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Creando cuestionario...' : 'Publicar Cuestionario'}
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
      </div>
    </div>
  );
}
