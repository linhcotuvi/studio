
import { GoogleGenAI, Modality } from "@google/genai";
import { VoiceID } from "../types";

const API_KEY = process.env.API_KEY || '';

export const generateSpeech = async (text: string, voice: VoiceID, speedInstruction: string) => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please check your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const fullPrompt = `${speedInstruction}${text}`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: fullPrompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (!base64Audio) {
      throw new Error("Failed to receive audio data from Gemini.");
    }

    return base64Audio;
  } catch (error) {
    console.error("Gemini TTS Error:", error);
    throw error;
  }
};
