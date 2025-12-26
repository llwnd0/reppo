
import { GoogleGenAI } from "@google/genai";
import { Lead } from "../types";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateOutreachEmail = async (lead: Lead, context: string) => {
  const ai = getAIClient();
  const prompt = `
    Generate a professional and personalized cold outreach email for the following lead:
    Name: ${lead.name}
    Role: ${lead.role}
    Company: ${lead.company}
    
    Context/Goal of the email: ${context}
    
    The email should be:
    1. Short and punchy.
    2. Focused on a specific value proposition related to their role.
    3. Include a clear, low-friction call to action.
    4. Have a catchy subject line.
    
    Format the response as JSON with "subject" and "body" fields.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result;
  } catch (error) {
    console.error("Error generating email:", error);
    return {
      subject: "Connecting with " + lead.company,
      body: `Hi ${lead.name},\n\nI've been following the work you're doing at ${lead.company} and wanted to reach out regarding our solutions for ${lead.role}s.\n\nBest,\n[Your Name]`
    };
  }
};
