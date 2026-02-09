
import { GoogleGenAI } from "@google/genai";

export async function getVehicleRecommendation(userProfile: string) {
  // Always use the required initialization format and get API key from process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Você é o consultor digital da Maggi Veículos. O cliente disse: "${userProfile}". 
      Responda de forma curta e amigável (max 3 frases) recomendando que ele veja o estoque ou agende uma visita. 
      Seja profissional e premium.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "Olá! Como posso ajudar você a encontrar seu novo Maggi hoje?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Olá! Sou o consultor Maggi. Como posso te ajudar hoje?";
  }
}
