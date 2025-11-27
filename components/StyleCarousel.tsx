import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Mail, Phone, Globe } from 'lucide-react';

// Sample resume data based on CVGoPro CEO
const SAMPLE_DATA = {
    fullName: "CVGoPro",
    title: "CEO",
    email: "support@cvgopro.com",
    phone: "888-88888",
    website: "https://cvgopro.com/",
    summary: "I excel in blending aesthetic visual design with ATS (Applicant Tracking System) compatibility to create high-impact resumes.",
    experience: [
        {
            company: "CVGoPro",
            role: "CEO",
            duration: "2025 - 2046",
            description: [
                "As a Senior Resume Format Optimization Specialist with 8+ years of expertise",
                "Excel in blending aesthetic visual design with ATS compatibility",
                "Tailoring layout structures, optimizing font hierarchies",
                "Ensuring resumes pass ATS scans with 98% accuracy"
            ]
        }
    ],
    education: [
        {
            institution: "CVGoPro",
            degree: "PhD in Design",
            year: "2025 - 2046"
        }
    ],
    skills: ["Optimization", "Design", "Tailoring", "Refinement"]
};

interface StyleTemplate {
    id: string;
    name: string;
    category: string;
    categoryEn: string;
}

const templates: StyleTemplate[] = [
    { id: 'oslo', name: 'OSLO', category: 'Bento 风格', categoryEn: 'Bento Style' },
    { id: 'nyc', name: 'NYC', category: 'Bento 风格', categoryEn: 'Bento Style' },
    { id: 'tokyo', name: 'TOKYO', category: 'Bento 风格', categoryEn: 'Bento Style' },
    { id: 'milan', name: 'MILAN', category: 'Bento 风格', categoryEn: 'Bento Style' },
    { id: 'bloom', name: 'Bloom', category: '渐变风格', categoryEn: 'Gradient Style' },
    { id: 'midnight', name: 'Midnight', category: '渐变风格', categoryEn: 'Gradient Style' },
];

// OSLO - Brutalist Bento Style
const OsloPreview = () => (
    <div className="w-full h-full bg-white text-black p-6 font-mono text-[8px] leading-tight">
        <div className="border-4 border-black h-full flex flex-col">
            {/* Header */}
            <div className="grid grid-cols-12 border-b-4 border-black">
                <div className="col-span-8 p-4 flex flex-col justify-center border-r-4 border-black">
                    <h1 className="text-3xl font-bold uppercase leading-none tracking-tighter mb-2">{SAMPLE_DATA.fullName}</h1>
                    <p className="bg-black text-white inline-block px-2 py-1 text-[10px] self-start">{SAMPLE_DATA.title}</p>
                </div>
                <div className="col-span-4 p-3 flex flex-col justify-between bg-[#f0f0f0]">
                    <div className="text-[7px] font-bold uppercase underline decoration-2">CONTACT</div>
                    <div className="flex flex-col gap-1 text-[7px] font-bold">
                        <p>{SAMPLE_DATA.email}</p>
                        <p>{SAMPLE_DATA.phone}</p>
                        <p className="truncate">{SAMPLE_DATA.website}</p>
                    </div>
                </div>
            </div>
            {/* Body */}
            <div className="flex-1 grid grid-cols-12">
                {/* Sidebar */}
                <div className="col-span-4 border-r-4 border-black flex flex-col">
                    <div className="p-3 border-b-4 border-black">
                        <div className="bg-black text-white px-2 py-1 inline-block text-[7px] font-bold mb-2 uppercase">EDUCATION</div>
                        <div>
                            <p className="font-bold text-[9px] leading-tight">{SAMPLE_DATA.education[0].institution}</p>
                            <p className="text-[7px] mt-1">{SAMPLE_DATA.education[0].degree}</p>
                            <p className="text-[6px] text-gray-500 mt-1">{SAMPLE_DATA.education[0].year}</p>
                        </div>
                    </div>
                    <div className="p-3 flex-1 bg-gray-50">
                        <div className="bg-black text-white px-2 py-1 inline-block text-[7px] font-bold mb-2 uppercase">SKILLS</div>
                        <div className="flex flex-col gap-2">
                            {SAMPLE_DATA.skills.map((skill, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-black"></div>
                                    <span className="text-[8px] font-bold uppercase">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Main Content */}
                <div className="col-span-8 flex flex-col">
                    <div className="p-3 border-b-4 border-black bg-[#ffff00]">
                        <p className="text-[8px] font-bold leading-relaxed uppercase">{SAMPLE_DATA.summary}</p>
                    </div>
                    <div className="p-4 flex-1">
                        <div className="mb-3 border-b-2 border-black pb-2 flex justify-between items-end">
                            <h3 className="text-xl font-bold uppercase">EXPERIENCE</h3>
                            <div className="text-[8px]">01 // WORK</div>
                        </div>
                        {SAMPLE_DATA.experience.map((job, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-sm font-bold bg-black text-white px-2 py-1 inline-block">{job.company}</h4>
                                    <span className="text-[8px] font-bold border-2 border-black px-2 py-1">{job.duration}</span>
                                </div>
                                <p className="text-[10px] font-bold uppercase mb-2 underline decoration-2">{job.role}</p>
                                <ul className="space-y-1">
                                    {job.description.map((desc, i) => (
                                        <li key={i} className="text-[8px] font-medium pl-3 relative before:content-['■'] before:absolute before:left-0 before:text-[6px]">{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// NYC - Bold Pop Style
const NYCPreview = () => (
    <div className="w-full h-full bg-white text-black p-4 font-sans overflow-hidden text-[8px]">
        <div className="grid grid-cols-12 gap-3 h-full">
            {/* Header Row */}
            <div className="col-span-8 bg-black text-white p-4 flex flex-col justify-between">
                <p className="text-[6px] font-mono tracking-widest opacity-50">PORTFOLIO // 2025</p>
                <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">{SAMPLE_DATA.fullName}</h1>
            </div>
            <div className="col-span-4 bg-[#FF3B30] p-4 flex flex-col justify-center items-center text-center">
                <p className="text-lg font-bold text-white leading-tight uppercase">{SAMPLE_DATA.title}</p>
            </div>
            {/* Contact Bar */}
            <div className="col-span-12 bg-gray-100 p-2 flex justify-between items-center font-mono text-[7px] border-y-2 border-black">
                <div className="flex gap-4">
                    <span>{SAMPLE_DATA.email}</span>
                    <span>{SAMPLE_DATA.phone}</span>
                </div>
                <span className="truncate max-w-[150px]">{SAMPLE_DATA.website}</span>
            </div>
            {/* Main Content */}
            <div className="col-span-8 flex flex-col gap-3">
                <div className="bg-white border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="font-bold text-[9px] leading-relaxed">{SAMPLE_DATA.summary}</p>
                </div>
                <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex-1">
                    <h3 className="text-xl font-black uppercase mb-4 decoration-4 underline decoration-[#FF3B30]">EXPERIENCE</h3>
                    {SAMPLE_DATA.experience.map((job, idx) => (
                        <div key={idx}>
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-sm font-black">{job.company}</h4>
                                <span className="bg-black text-white text-[6px] px-2 py-0.5 font-mono">{job.duration}</span>
                            </div>
                            <p className="text-[9px] font-bold text-[#FF3B30] mb-2 uppercase">{job.role}</p>
                            <ul className="space-y-1">
                                {job.description.map((desc, i) => (
                                    <li key={i} className="text-[8px] font-medium">• {desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            {/* Sidebar */}
            <div className="col-span-4 flex flex-col gap-3">
                <div className="bg-black text-white p-3 shadow-[4px_4px_0px_0px_rgba(200,200,200,1)]">
                    <h3 className="font-mono text-[7px] text-[#FF3B30] mb-2 uppercase">SKILLS</h3>
                    <div className="flex flex-wrap gap-2">
                        {SAMPLE_DATA.skills.map((skill, idx) => (
                            <span key={idx} className="text-[9px] font-bold hover:text-[#FF3B30]">{skill}</span>
                        ))}
                    </div>
                </div>
                <div className="bg-gray-100 border-2 border-black p-3 flex-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="font-black text-sm mb-3 uppercase">EDUCATION</h3>
                    {SAMPLE_DATA.education.map((edu, idx) => (
                        <div key={idx}>
                            <p className="font-bold text-[9px]">{edu.institution}</p>
                            <p className="text-[8px]">{edu.degree}</p>
                            <p className="text-[7px] font-mono text-gray-500 mt-1">{edu.year}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// TOKYO - Dark Cyberpunk Style
const TokyoPreview = () => (
    <div className="w-full h-full bg-[#0F0F0F] text-gray-300 p-4 font-sans text-[8px]">
        <div className="grid grid-cols-3 gap-3 h-full">
            {/* Header */}
            <div className="col-span-3 bg-[#1A1A1A] p-4 border-l-4 border-[#00FF94] flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tighter mb-1">{SAMPLE_DATA.fullName}</h1>
                    <p className="text-[#00FF94] text-sm tracking-widest uppercase font-mono">{SAMPLE_DATA.title}</p>
                </div>
                <div className="text-right text-[7px] font-mono text-gray-500">
                    <p>REV. 2025</p>
                    <p>CONFIDENTIAL</p>
                </div>
            </div>
            {/* Sidebar */}
            <div className="col-span-1 space-y-3">
                <div className="bg-[#1A1A1A] p-3 border border-gray-800">
                    <h3 className="text-white font-bold uppercase tracking-wider text-[7px] mb-3 border-b border-gray-800 pb-2">CONTACT</h3>
                    <div className="space-y-2 text-[8px]">
                        <div><p className="text-[6px] text-gray-500">EMAIL</p><p className="text-white truncate">{SAMPLE_DATA.email}</p></div>
                        <div><p className="text-[6px] text-gray-500">PHONE</p><p className="text-white">{SAMPLE_DATA.phone}</p></div>
                        <div><p className="text-[6px] text-gray-500">WEB</p><p className="text-[#00FF94] truncate text-[7px]">{SAMPLE_DATA.website}</p></div>
                    </div>
                </div>
                <div className="bg-[#1A1A1A] p-3 border border-gray-800">
                    <h3 className="text-white font-bold uppercase tracking-wider text-[7px] mb-3 border-b border-gray-800 pb-2">SKILLS</h3>
                    <div className="flex flex-wrap gap-1">
                        {SAMPLE_DATA.skills.map((skill, idx) => (
                            <span key={idx} className="text-[8px] border border-gray-700 px-2 py-1 text-gray-400 hover:border-[#00FF94] hover:text-[#00FF94]">{skill}</span>
                        ))}
                    </div>
                </div>
                <div className="bg-[#1A1A1A] p-3 border border-gray-800">
                    <h3 className="text-white font-bold uppercase tracking-wider text-[7px] mb-3 border-b border-gray-800 pb-2">EDUCATION</h3>
                    {SAMPLE_DATA.education.map((edu, idx) => (
                        <div key={idx}>
                            <p className="text-white font-bold text-[9px]">{edu.institution}</p>
                            <p className="text-[8px] text-gray-500">{edu.degree}</p>
                            <p className="text-[7px] text-[#00FF94] font-mono mt-1">{edu.year}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Main Content */}
            <div className="col-span-2 space-y-3">
                <div className="bg-[#1A1A1A] p-4 border border-gray-800">
                    <p className="text-sm leading-relaxed text-gray-300 border-l-2 border-gray-700 pl-3 italic">{SAMPLE_DATA.summary}</p>
                </div>
                <div className="bg-[#1A1A1A] p-4 border border-gray-800 flex-1">
                    <h3 className="text-white font-bold uppercase tracking-wider text-[9px] mb-4 flex items-center gap-3">
                        EXPERIENCE
                        <div className="h-px bg-gray-800 flex-1"></div>
                    </h3>
                    {SAMPLE_DATA.experience.map((job, idx) => (
                        <div key={idx}>
                            <div className="flex justify-between items-end mb-2 border-b border-gray-800 pb-2">
                                <h4 className="text-xl font-bold text-white">{job.company}</h4>
                                <span className="font-mono text-[9px] text-[#00FF94]">{job.duration}</span>
                            </div>
                            <p className="text-[10px] text-gray-400 mb-3 uppercase tracking-wide">{job.role}</p>
                            <ul className="space-y-2">
                                {job.description.map((desc, i) => (
                                    <li key={i} className="text-[9px] pl-3 relative before:content-['>'] before:absolute before:left-0 before:text-gray-600 before:text-[8px]">{desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// MILAN - Elegant Magazine Style
const MilanPreview = () => (
    <div className="w-full h-full bg-[#FDFBF7] text-[#2C2C2C] p-6 font-serif text-[8px]">
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="border-b border-[#D4D4D4] pb-4 mb-6">
                <h1 className="text-4xl font-normal italic mb-2">{SAMPLE_DATA.fullName}</h1>
                <div className="flex justify-between items-end">
                    <p className="text-[10px] uppercase tracking-widest font-sans text-[#666]">{SAMPLE_DATA.title}</p>
                    <div className="flex gap-4 text-[8px] font-sans text-[#666]">
                        <span>{SAMPLE_DATA.email}</span>
                        <span>{SAMPLE_DATA.phone}</span>
                    </div>
                </div>
            </div>
            {/* Summary */}
            <div className="bg-white p-4 shadow-sm mb-6">
                <p className="text-sm leading-7 font-light text-[#444] italic">{SAMPLE_DATA.summary}</p>
            </div>
            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-8 flex-1">
                {/* Left Column - Experience */}
                <div>
                    <h3 className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#999] mb-4">Experience</h3>
                    {SAMPLE_DATA.experience.map((job, idx) => (
                        <div key={idx}>
                            <h4 className="text-lg font-medium mb-1">{job.company}</h4>
                            <div className="flex justify-between text-[9px] font-sans text-[#666] mb-3 border-b border-dotted border-[#ccc] pb-2">
                                <span>{job.role}</span>
                                <span>{job.duration}</span>
                            </div>
                            <ul className="space-y-2">
                                {job.description.map((desc, i) => (
                                    <li key={i} className="text-[9px] leading-5 text-[#444] list-none">– {desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                {/* Right Column - Education & Skills */}
                <div className="border-l border-[#E5E5E5] pl-8 space-y-8">
                    <div>
                        <h3 className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#999] mb-4">Education</h3>
                        {SAMPLE_DATA.education.map((edu, idx) => (
                            <div key={idx}>
                                <p className="font-medium text-lg">{edu.institution}</p>
                                <p className="text-[10px] font-sans text-[#666] uppercase mt-1">{edu.degree}</p>
                                <p className="text-[9px] font-sans text-[#999] mt-1">{edu.year}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h3 className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#999] mb-4">Skills</h3>
                        <div className="flex flex-wrap gap-3">
                            {SAMPLE_DATA.skills.map((skill, idx) => (
                                <span key={idx} className="text-sm italic text-[#444] border-b border-[#E5E5E5] pb-1">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// BLOOM - Soft Radial Glow Style
const BloomPreview = () => (
    <div className="w-full h-full bg-[#FFFCF9] relative overflow-hidden p-6 font-sans text-[8px]">
        {/* Central Glow */}
        <div className="absolute top-[30%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#FFD1C1] rounded-full filter blur-[80px] opacity-40"></div>

        <div className="relative z-10 h-full flex flex-col">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-normal text-[#4A4A4A] mb-2">{SAMPLE_DATA.fullName}</h1>
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#9C6666] mb-4">{SAMPLE_DATA.title}</p>
                <div className="flex justify-center gap-6 text-[9px] font-medium text-[#7A7A7A]">
                    <span>{SAMPLE_DATA.email}</span>
                    <span>{SAMPLE_DATA.phone}</span>
                </div>
            </div>
            {/* Summary */}
            <div className="max-w-lg mx-auto text-center mb-8">
                <p className="text-[#5C5C5C] leading-6 italic font-serif text-sm">{SAMPLE_DATA.summary}</p>
            </div>
            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-12 flex-1">
                {/* Left - Experience */}
                <div className="text-right border-r border-[#E6D5D5] pr-8">
                    <h3 className="text-xl text-[#4A4A4A] mb-4">Experience</h3>
                    {SAMPLE_DATA.experience.map((job, idx) => (
                        <div key={idx}>
                            <h4 className="font-bold text-[#4A4A4A] text-lg">{job.company}</h4>
                            <p className="text-[10px] text-[#9C6666] font-bold uppercase mb-1">{job.role}</p>
                            <p className="text-[9px] text-[#888] font-mono mb-3">{job.duration}</p>
                            <ul className="space-y-1">
                                {job.description.map((desc, i) => (
                                    <li key={i} className="text-[9px] text-[#5C5C5C] leading-5">{desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                {/* Right - Education & Skills */}
                <div className="pl-4 space-y-8">
                    <div>
                        <h3 className="text-xl text-[#4A4A4A] mb-4">Skills</h3>
                        <div className="flex flex-wrap gap-3">
                            {SAMPLE_DATA.skills.map((skill, idx) => (
                                <span key={idx} className="text-sm text-[#5C5C5C] border-b border-[#E6D5D5] pb-1">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl text-[#4A4A4A] mb-4">Education</h3>
                        {SAMPLE_DATA.education.map((edu, idx) => (
                            <div key={idx}>
                                <p className="font-bold text-[#4A4A4A] text-sm">{edu.institution}</p>
                                <p className="text-[10px] text-[#7A7A7A] italic">{edu.degree}</p>
                                <p className="text-[9px] text-[#9C6666] mt-1">{edu.year}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// MIDNIGHT - Dark Space Gradient Style
const MidnightPreview = () => (
    <div className="w-full h-full bg-[#050511] text-white relative overflow-hidden p-6 font-sans text-[8px]">
        {/* Space Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-900/40 rounded-full filter blur-[80px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/30 rounded-full filter blur-[80px]"></div>

        <div className="relative z-10 h-full flex flex-col">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-block mb-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <span className="text-[10px] font-medium tracking-[0.3em] text-blue-200 uppercase">{SAMPLE_DATA.title}</span>
                </div>
                <h1 className="text-4xl font-light tracking-tight mb-3">{SAMPLE_DATA.fullName}</h1>
                <div className="flex justify-center gap-6 text-[9px] text-blue-300/60 font-mono">
                    <span>{SAMPLE_DATA.email}</span>
                    <span>{SAMPLE_DATA.phone}</span>
                </div>
            </div>
            {/* Two Column Layout */}
            <div className="grid grid-cols-12 gap-8 flex-1">
                {/* Sidebar */}
                <div className="col-span-4 space-y-4">
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4 backdrop-blur-sm">
                        <h3 className="text-[9px] font-bold text-blue-400 mb-3 uppercase tracking-widest">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {SAMPLE_DATA.skills.map((skill, idx) => (
                                <span key={idx} className="text-[10px] text-gray-300 border border-white/10 px-3 py-1 rounded-lg bg-black/20">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4 backdrop-blur-sm">
                        <h3 className="text-[9px] font-bold text-blue-400 mb-3 uppercase tracking-widest">Education</h3>
                        {SAMPLE_DATA.education.map((edu, idx) => (
                            <div key={idx}>
                                <p className="font-bold text-sm">{edu.institution}</p>
                                <p className="text-[10px] text-gray-400 mt-1">{edu.degree}</p>
                                <p className="text-[9px] text-blue-500 font-mono mt-1">{edu.year}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Main Content */}
                <div className="col-span-8 space-y-6">
                    <p className="text-sm font-light leading-6 text-gray-300 border-l-2 border-blue-500/50 pl-4">{SAMPLE_DATA.summary}</p>
                    <div>
                        <h3 className="text-xl font-light mb-4 flex items-center gap-3 text-blue-100">
                            <span className="w-8 h-[1px] bg-blue-500"></span>
                            Experience
                        </h3>
                        {SAMPLE_DATA.experience.map((job, idx) => (
                            <div key={idx} className="relative pl-6">
                                <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                <h4 className="text-xl font-medium text-white mb-1">{job.company}</h4>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-[11px] text-blue-300">{job.role}</span>
                                    <span className="text-[10px] font-mono text-white/30">{job.duration}</span>
                                </div>
                                <ul className="space-y-2">
                                    {job.description.map((desc, i) => (
                                        <li key={i} className="text-[10px] text-gray-400 font-light leading-5">{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Map template IDs to preview components
const previewComponents: Record<string, React.FC> = {
    oslo: OsloPreview,
    nyc: NYCPreview,
    tokyo: TokyoPreview,
    milan: MilanPreview,
    bloom: BloomPreview,
    midnight: MidnightPreview,
};

export const StyleCarousel: React.FC<{ language: 'en' | 'zh' }> = ({ language }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const t = {
        en: {
            title: "Premium Resume Styles",
            subtitle: "Explore professionally designed templates that make you stand out"
        },
        zh: {
            title: "高级简历风格展示",
            subtitle: "探索专业设计的模板，让您脱颖而出"
        }
    }[language];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % templates.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + templates.length) % templates.length);
    };

    // Auto-play carousel
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const currentTemplate = templates[currentIndex];
    const PreviewComponent = previewComponents[currentTemplate.id];

    return (
        <section className="py-20 px-4 relative overflow-hidden">
            {/* Background with grid pattern */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white">
                <div
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            {/* Decorative blurs */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-display text-4xl md:text-5xl font-bold text-ink"
                    >
                        {t.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-ink-light text-lg max-w-2xl mx-auto"
                    >
                        {t.subtitle}
                    </motion.p>
                </div>

                {/* Carousel */}
                <div className="relative">
                    {/* Main Display Area */}
                    <div className="relative mb-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                                className="flex justify-center"
                            >
                                <div className="relative">
                                    {/* Template Name Badge */}
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
                                            <Sparkles size={16} />
                                            <span className="font-bold text-sm">
                                                {currentTemplate.name}
                                            </span>
                                            <span className="text-white/70 text-xs ml-2">
                                                {language === 'zh' ? currentTemplate.category : currentTemplate.categoryEn}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Template Preview - A4 ratio */}
                                    <div className="w-[340px] h-[480px] md:w-[440px] md:h-[622px] lg:w-[520px] lg:h-[735px] bg-white rounded-xl shadow-2xl overflow-hidden mt-6 border border-gray-200">
                                        {PreviewComponent && <PreviewComponent />}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl rounded-full p-3 transition-all hover:scale-110 group"
                        >
                            <ChevronLeft className="text-gray-700 group-hover:text-gray-900" size={24} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl rounded-full p-3 transition-all hover:scale-110 group"
                        >
                            <ChevronRight className="text-gray-700 group-hover:text-gray-900" size={24} />
                        </button>
                    </div>

                    {/* Simple Dot Navigation - No Thumbnails */}
                    <div className="flex justify-center items-center gap-6">
                        {templates.map((template, idx) => (
                            <button
                                key={template.id}
                                onClick={() => setCurrentIndex(idx)}
                                className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                                    idx === currentIndex ? 'scale-110' : 'opacity-50 hover:opacity-100'
                                }`}
                            >
                                <div className={`w-3 h-3 rounded-full transition-all ${
                                    idx === currentIndex
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 scale-125'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}></div>
                                <span className={`text-xs font-medium transition-all ${
                                    idx === currentIndex ? 'text-gray-900' : 'text-gray-400'
                                }`}>
                                    {template.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
