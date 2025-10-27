
import React, { useState, useCallback } from 'react';
import { removeBackgroundFromImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { ImageDropzone } from './components/ImageDropzone';
import { ImageDisplay } from './components/ImageDisplay';
import { Button } from './components/Button';
import { DownloadIcon } from './components/icons';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File) => {
    setOriginalImage(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setProcessedImageUrl(null);
    setError(null);
  }, []);

  const handleRemoveBackground = useCallback(async () => {
    if (!originalImage) return;

    setIsLoading(true);
    setError(null);
    setProcessedImageUrl(null);

    try {
      const { data, mimeType } = await fileToBase64(originalImage);
      const resultBase64 = await removeBackgroundFromImage({ data, mimeType });
      setProcessedImageUrl(`data:image/png;base64,${resultBase64}`);
    } catch (err) {
      console.error(err);
      setError('فشلت إزالة الخلفية. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage]);

  const handleClear = useCallback(() => {
    setOriginalImage(null);
    setOriginalImageUrl(null);
    setProcessedImageUrl(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-5xl text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          مزيل الخلفية بالذكاء الاصطناعي
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          قم بتحميل صورة وسيقوم Gemini API بإزالة الخلفية تلقائيًا.
        </p>
      </header>

      <main className="w-full max-w-5xl flex-grow flex flex-col items-center">
        {!originalImageUrl ? (
          <ImageDropzone onImageUpload={handleImageUpload} />
        ) : (
          <div className="w-full flex flex-col items-center">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ImageDisplay title="الصورة الأصلية" imageUrl={originalImageUrl} />
              <ImageDisplay
                title="النتيجة"
                imageUrl={processedImageUrl}
                isLoading={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-md mb-4 w-full text-center">
                <p>{error}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleRemoveBackground}
                disabled={isLoading || !originalImage}
              >
                {isLoading ? '...جار المعالجة' : 'إزالة الخلفية'}
              </Button>

              {processedImageUrl && (
                <a
                  href={processedImageUrl}
                  download="background-removed.png"
                  className="w-full sm:w-auto"
                >
                  <Button variant="secondary" className="w-full">
                    <DownloadIcon className="w-5 h-5 ml-2" />
                    تنزيل الصورة
                  </Button>
                </a>
              )}

              <Button variant="ghost" onClick={handleClear} disabled={isLoading}>
                مسح
              </Button>
            </div>
          </div>
        )}
      </main>
      <footer className="w-full max-w-5xl text-center mt-8 py-4 border-t border-gray-700">
        <p className="text-gray-500">
          مدعوم بواسطة Google Gemini API
        </p>
      </footer>
    </div>
  );
};

export default App;
