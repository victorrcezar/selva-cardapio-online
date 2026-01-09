import { GoogleGenAI, Type } from "@google/genai";

const getAiClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please select a paid key from the menu.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateDishDescription = async (dishName: string, ingredients: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, appetizing, and mouth-watering description (max 120 characters) for a menu item named "${dishName}" containing these ingredients: ${ingredients}. Language: Portuguese (Brazil).`,
    });
    return response.text?.trim() || "Deliciosa opção feita com ingredientes frescos.";
  } catch (error) {
    console.error("AI Text Error:", error);
    return "Descrição indisponível no momento.";
  }
};

export const suggestPrice = async (dishName: string): Promise<number> => {
    try {
        const ai = getAiClient();
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Suggest a realistic price in BRL (Brazilian Real) for a restaurant dish named "${dishName}". Return ONLY the number, no currency symbol.`,
            config: {
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        price: { type: Type.NUMBER }
                    }
                }
            }
        });
        const json = JSON.parse(response.text || '{}');
        return json.price || 25.00;
    } catch (error) {
        return 25.00;
    }
}

export const generateDishImage = async (prompt: string): Promise<string | null> => {
  try {
    const ai = getAiClient();
    // Using gemini-2.5-flash-image for standard generation as per guidelines
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `Professional food photography, appetizing, high resolution, 4k, close up of: ${prompt}` }]
      },
      config: {
        imageConfig: {
            aspectRatio: '1:1',
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("AI Image Error:", error);
    return null;
  }
};