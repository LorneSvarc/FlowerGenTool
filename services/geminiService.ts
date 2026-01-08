
import { GoogleGenAI, Type } from "@google/genai";
import { FlowerDNA } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const FLOWER_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "A creative name for the flower." },
    description: { type: Type.STRING, description: "A short, poetic description." },
    petalCount: { type: Type.INTEGER, description: "Number of petals in a row, 3 to 24." },
    petalRows: { type: Type.INTEGER, description: "Number of rows of petals, 1 to 5." },
    petalLength: { type: Type.NUMBER, description: "Length of petals, 0.5 to 5.0." },
    petalWidth: { type: Type.NUMBER, description: "Width of petals, 0.2 to 3.0." },
    petalCurvature: { type: Type.NUMBER, description: "Curvature of petals, 0 to 1." },
    petalColor: { type: Type.STRING, description: "Hex code for petals." },
    centerColor: { type: Type.STRING, description: "Hex code for the center pistil." },
    stemColor: { type: Type.STRING, description: "Hex code for the stem." },
    glowIntensity: { type: Type.NUMBER, description: "Glow factor, 0.1 to 3.0." },
    wobbleSpeed: { type: Type.NUMBER, description: "Animation speed, 0.1 to 2.0." },
    scale: { type: Type.NUMBER, description: "Base scale, 0.5 to 1.5." },
  },
  required: [
    "name", "description", "petalCount", "petalRows", "petalLength", 
    "petalWidth", "petalCurvature", "petalColor", "centerColor", 
    "stemColor", "glowIntensity", "wobbleSpeed", "scale"
  ],
};

export const generateFlowerDNA = async (prompt?: string, mood?: string): Promise<FlowerDNA> => {
  const fullPrompt = `Design a unique 3D procedural flower ${mood ? `with a '${mood}' mood` : ""}. ${prompt ? `User inspiration: ${prompt}` : "Surprise me with something artistic and biological."} Return the botanical DNA as JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: FLOWER_SCHEMA,
      },
    });

    const dna = JSON.parse(response.text.trim()) as FlowerDNA;
    return dna;
  } catch (error) {
    console.error("Failed to generate flower DNA:", error);
    throw error;
  }
};
