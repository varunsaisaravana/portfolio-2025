import { GoogleGenAI, Chat } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const createChatSession = (): Chat => {
  const ai = getAiClient();
  // Using gemini-3-pro-preview for high-quality conversational assistance
  return ai.chats.create({
    model: "gemini-3-pro-preview",
    config: {
      systemInstruction: `You are the intelligent assistant for Varun's Student Portfolio website. Your role is to help visitors navigate the site, understand Varun's projects, and utilize the AI Lab features.

      **Your Knowledge Base:**
      
      1.  **Varun's Profile:**
          *   **Role:** High school student, aspiring engineer, and innovator.
          *   **Key Skills:** Robotics (C++, ROS), Coding (React, Python), Engineering (PCB Design, SolidWorks).
          *   **Athletics:** Competitive Rowing and Sailing.
          *   **Arts:** Piano and Choir.
          *   **Projects:** Regional Robotics Competition (2nd Place), Autonomous Weather Rover, AI Recycling Sorter.
      
      2.  **AI Lab Features (How to guide users):**
          *   **AI Image Editor:** Uses 'gemini-2.5-flash-image'. Instruct users to upload a photo and type a prompt (e.g., "Turn this into a sketch") to creatively edit images.
          *   **Visual Intelligence:** Uses 'gemini-3-pro-preview'. Instruct users to upload an image to get a detailed scene description and object analysis.
          *   **PDF to Quizlet:** Uses 'gemini-2.5-flash'. Instruct users to upload a PDF (like study notes) to generate flashcards they can copy to Quizlet.
      
      3.  **Contact Info:**
          *   **Email:** varun.jo.sp@gmail.com
          *   **LinkedIn:** Mention that the link is available in the website footer.
      
      **Behavior:**
      *   Be helpful, encouraging, and professional.
      *   Keep responses concise and easy to read.
      *   If asked about features not on the site, politely clarify what IS available.
      *   Help users craft prompts for the AI tools if they are stuck.`,
    },
  });
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

export const generateQuizFromDocument = async (
  base64Data: string,
  mimeType: string = "application/pdf"
): Promise<Array<{ term: string; definition: string }>> => {
  try {
    const ai = getAiClient();
    // Using gemini-2.5-flash for fast text/document processing
    const modelId = "gemini-2.5-flash"; 

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data,
            },
          },
          {
            text: "Analyze this document and generate a set of flashcards for studying. Focus on key terms, important dates, and core concepts. Return the result as a JSON array of objects, where each object has a 'term' and a 'definition'. Limit to the most important 20 concepts.",
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response text");
    
    const data = JSON.parse(text);
    
    if (Array.isArray(data)) return data;
    if (data.flashcards && Array.isArray(data.flashcards)) return data.flashcards;
    if (data.cards && Array.isArray(data.cards)) return data.cards;
    
    // Attempt to handle wrapped responses or assume empty if structure doesn't match
    return [];

  } catch (error: any) {
    console.error("Gemini Quiz Gen Error:", error);
    throw new Error(error.message || "Failed to generate quiz from document");
  }
};