
import React from 'react';
import { Spinner } from './Spinner';

interface ImageDisplayProps {
  title: string;
  imageUrl: string | null;
  isLoading?: boolean;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ title, imageUrl, isLoading = false }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-xl font-semibold text-gray-300 mb-3">{title}</h2>
      <div className="w-full aspect-square rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center overflow-hidden">
        {isLoading ? (
          <Spinner />
        ) : imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
        ) : (
          <div className="text-gray-500">...</div>
        )}
      </div>
    </div>
  );
};
