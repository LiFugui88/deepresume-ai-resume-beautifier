import { ResumeData } from "../types";
import * as pdfjsLib from 'pdfjs-dist';

// Set worker source for Vite
const workerUrl = new URL(
    'pdfjs-dist/build/pdf.worker.mjs',
    import.meta.url
).toString();

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

export const analyzeResume = async (file: File): Promise<ResumeData> => {
    try {
        // 1. Extract text from PDF
        const text = await extractTextFromPDF(file);

        // 2. Send text to API
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ resumeText: text }),
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

const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
            .map((item: any) => item.str)
            .join(' ');
        fullText += pageText + '\n';
    }

    return fullText;
};