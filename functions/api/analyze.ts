
import { GoogleGenAI, Type } from "@google/genai";

interface Env {
    GEMINI_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    try {
        const { fileBase64, mimeType } = await request.json() as { fileBase64: string; mimeType: string };

        if (!fileBase64 || !mimeType) {
            return new Response(JSON.stringify({ error: "Missing file data" }), { status: 400 });
        }

        if (!env.GEMINI_API_KEY) {
            return new Response(JSON.stringify({ error: "Server configuration error: Missing API Key" }), { status: 500 });
        }

        const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
        const MODEL_NAME = "gemini-2.5-flash";

        const systemInstruction = `
    You are an expert resume parser and designer.
    Your task is to extract data from the provided resume file into a structured JSON format.
    
    CRITICAL LANGUAGE RULES:
    1. **Detect the language** of the source resume (English or Chinese).
    2. **Output ALL content in the SAME language** as the source. 
    3. **Preserve original meaning**: Do not aggressively summarize or rewrite. Keep the details, metrics, and specific accomplishments provided in the source. Optimize for grammar and clarity, but strictly maintain the user's original intent and content depth.
    
    Data Extraction Rules:
    1. **Experience**: employment history (Company, Title).
    2. **Projects**: specific projects, side projects, or academic projects (Project Name, Role).
    3. **Skills**: Extract specific technical or professional skills.
    4. **Formatting**: Ensure proper capitalization.
    `;

        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: fileBase64,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: "Analyze this resume. Extract the data into the specified JSON schema. Strictly maintain the original language (Chinese or English) and preserve project experience."
                    }
                ]
            },
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        fullName: { type: Type.STRING },
                        title: { type: Type.STRING, description: "Current professional title" },
                        summary: { type: Type.STRING, description: "Professional summary" },
                        email: { type: Type.STRING },
                        phone: { type: Type.STRING },
                        location: { type: Type.STRING },
                        website: { type: Type.STRING },
                        linkedin: { type: Type.STRING },
                        skills: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        },
                        experience: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    company: { type: Type.STRING },
                                    role: { type: Type.STRING },
                                    duration: { type: Type.STRING },
                                    description: {
                                        type: Type.ARRAY,
                                        items: { type: Type.STRING }
                                    }
                                }
                            }
                        },
                        projects: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    role: { type: Type.STRING },
                                    duration: { type: Type.STRING },
                                    link: { type: Type.STRING },
                                    description: {
                                        type: Type.ARRAY,
                                        items: { type: Type.STRING }
                                    }
                                }
                            }
                        },
                        education: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    institution: { type: Type.STRING },
                                    degree: { type: Type.STRING },
                                    year: { type: Type.STRING }
                                }
                            }
                        }
                    },
                    required: ["fullName", "experience"]
                }
            }
        });

        const text = response.text;
        if (!text) throw new Error("No response from Gemini");

        return new Response(text, {
            headers: { "Content-Type": "application/json" },
        });

    } catch (error: any) {
        console.error("Analysis Error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
