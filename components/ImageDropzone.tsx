
import React, { useCallback } from 'react';
import { UploadIcon } from './icons';

interface ImageDropzoneProps {
  onImageUpload: (file: File) => void;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onImageUpload }) => {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-8">
      <label
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadIcon className="w-10 h-10 mb-4 text-gray-400" />
          <p className="mb-2 text-sm text-gray-400">
            <span className="font-semibold">انقر للتحميل</span> أو اسحب وأفلت
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, WEBP (بحد أقصى 5 ميجابايت)</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};
