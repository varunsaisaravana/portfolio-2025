import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const editImageWithGemini = async (
  base64Image: string,
  prompt: string,
  mimeType: string = "image/png"
): Promise<string> => {
  try {
    const ai = getAiClient();
    
    // Using gemini-2.5-flash-image for image editing/generation tasks
    const modelId = "gemini-2.5-flash-image";

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image,
            },
          },
          {
            text: `Edit this image: ${prompt}. Return only the edited image.`,
          },
        ],
      },
    });

    // Extract the image from the response
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
        const parts = candidates[0].content.parts;
        for (const part of parts) {
            if (part.inlineData && part.inlineData.data) {
                return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
            }
        }
    }

    throw new Error("No image data returned from the model.");

  } catch (error: any) {
    console.error("Gemini Image Edit Error:", error);
    throw new Error(error.message || "Failed to edit image");
  }
};

export const analyzeImageWithGemini = async (
  base64Image: string,
  mimeType: string = "image/png"
): Promise<string> => {
  try {
    const ai = getAiClient();
    
    // Using gemini-3-pro-preview for advanced image understanding as requested
    const modelId = "gemini-3-pro-preview";

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image,
            },
          },
          {
            text: "Identify objects in the image and describe the scene and the objects involved detailedly.",
          },
        ],
      },
    });

    if (response.text) {
      return response.text;
    }

    throw new Error("No analysis text returned from the model.");

  } catch (error: any) {
    console.error("Gemini Image Analysis Error:", error);
    throw new Error(error.message || "Failed to analyze image");
  }
};