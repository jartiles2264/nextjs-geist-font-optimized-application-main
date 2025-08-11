'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface RatingProps {
  rating: number;
  ratingsCount: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Rating({ 
  rating, 
  ratingsCount, 
  onRate, 
  readonly = false,
  size = 'md' 
}: RatingProps) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [userRating, setUserRating] = useState(0);

  const handleRate = (newRating: number) => {
    if (readonly) return;
    
    setUserRating(newRating);
    onRate?.(newRating);
  };

  const displayRating = hoveredRating || userRating || rating;
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const starSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`${starSizes[size]} ${
              readonly 
                ? 'cursor-default' 
                : 'cursor-pointer hover:scale-110 transition-transform'
            } ${
              star <= displayRating 
                ? 'text-yellow-400' 
                : 'text-gray-300'
            }`}
            onClick={() => handleRate(star)}
            onMouseEnter={() => !readonly && setHoveredRating(star)}
            onMouseLeave={() => !readonly && setHoveredRating(0)}
            disabled={readonly}
          >
            ★
          </button>
        ))}
      </div>
      
      <div className={`${sizeClasses[size]} text-gray-600`}>
        <span className="font-medium">{displayRating.toFixed(1)}</span>
        <span className="text-gray-500 ml-1">
          ({ratingsCount} {ratingsCount === 1 ? 'valoración' : 'valoraciones'})
        </span>
      </div>
      
      {userRating > 0 && !readonly && (
        <span className={`${sizeClasses[size]} text-green-600 font-medium`}>
          ¡Valorado!
        </span>
      )}
    </div>
  );
}

// Componente simplificado para mostrar solo la valoración
export function SimpleRating({ rating, ratingsCount, size = 'sm' }: {
  rating: number;
  ratingsCount: number;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`flex items-center space-x-1 ${sizeClasses[size]}`}>
      <span className="text-yellow-400">★</span>
      <span className="font-medium text-gray-700">{rating.toFixed(1)}</span>
      <span className="text-gray-500">({ratingsCount})</span>
    </div>
  );
}
