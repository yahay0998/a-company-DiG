
import { GoogleGenAI, Modality } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface ImageData {
  data: string;
  mimeType: string;
}

export const removeBackgroundFromImage = async (imageData: ImageData): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageData.data,
              mimeType: imageData.mimeType,
            },
          },
          {
            text: 'remove the background. make the background transparent. output a png.',
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    
    throw new Error("No image data found in the API response.");

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to remove background from image.");
  }
};
