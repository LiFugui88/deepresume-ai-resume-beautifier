import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData } from "../types";

// We use the specific model version as requested for best performance with PDF analysis
const MODEL_NAME = "gemini-2.5-flash";

export const analyzeResume = async (fileBase64: string, mimeType: string): Promise<ResumeData> => {
    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileBase64, mimeType }),
        });

        if (!response.ok) {
            const errorData = await response.json() as { error?: string };
            throw new Error(errorData.error || 'Analysis failed');
        }

        const data = await response.json();
        return data as ResumeData;

    } catch (error) {
        console.error("Resume Analysis Error:", error);
        throw error;
    }
};

export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            // Remove the Data-URL prefix (e.g. "data:application/pdf;base64,")
            const base64 = result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = (error) => reject(error);
    });
};