export interface WorkExperience {
    company: string;
    role: string;
    duration: string;
    description: string[];
}

export interface Project {
    name: string;
    role: string;
    duration: string; // e.g. "2023.01 - 2023.06" or "3 months"
    description: string[];
    link?: string;
}

export interface Education {
    institution: string;
    degree: string;
    year: string;
}

export interface ResumeData {
    fullName: string;
    title: string;
    summary: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    skills: string[];
    experience: WorkExperience[];
    projects?: Project[]; // Added projects support
    education: Education[];
}

export enum AppState {
    IDLE = 'IDLE',
    ANALYZING = 'ANALYZING',
    PREVIEW = 'PREVIEW',
    ERROR = 'ERROR'
}

// For Gemini Tool Configs
export interface AnalyzeResponse {
    resume: ResumeData;
}