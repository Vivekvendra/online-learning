import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ rating = 0, reviewsCount, showScore = true, size = 'sm' }) => {
  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const starSize = starSizes[size] || starSizes.sm;
  const normalizedRating = Math.min(5, Math.max(0, Number(rating) || 0));

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= Math.round(normalizedRating)
                ? 'fill-amber-400 text-amber-400'
                : 'fill-slate-100 text-slate-300'
            }`}
          />
        ))}
      </div>
      {showScore && (
        <span className="text-xs font-bold text-slate-700 ml-0.5">
          {normalizedRating.toFixed(1)}
        </span>
      )}
      {reviewsCount !== undefined && (
        <span className="text-xs text-slate-400">
          ({Number(reviewsCount).toLocaleString()})
        </span>
      )}
    </div>
  );
};
