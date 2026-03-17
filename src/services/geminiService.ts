import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeCase(content: string, type: 'text' | 'image' | 'audio') {
  const model = ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        parts: [
          { text: `You are a professional legal AI assistant. Analyze the following ${type} content for a legal case. 
          Identify: 
          1. Case Type (Civil, Criminal, Debt, etc.)
          2. Key Facts
          3. Winning Probability (%)
          4. Recommended Legal Steps
          5. Required Documents
          
          Content: ${content}` }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
    }
  });

  const response = await model;
  return JSON.parse(response.text || '{}');
}

export async function generateLegalDocument(caseData: any, docType: string) {
  const model = ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        parts: [
          { text: `Generate a professional legal ${docType} based on this case data: ${JSON.stringify(caseData)}. 
          The document should be formal and follow legal standards.` }
        ]
      }
    ]
  });

  const response = await model;
  return response.text;
}
