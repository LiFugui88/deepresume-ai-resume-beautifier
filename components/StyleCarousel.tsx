import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Mail, Phone, MapPin } from 'lucide-react';

// Sample resume data for preview (English only)
const SAMPLE_DATA = {
    fullName: "Alex Morgan",
    title: "Senior Product Designer",
    email: "alex@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    summary: "Creative and detail-oriented Product Designer with 5+ years of experience in building user-centric digital products. Expert in UI/UX design, prototyping, and design systems.",
    experience: [
        {
            company: "TechFlow Inc.",
            role: "Senior Designer",
            duration: "2021 - Present",
            description: [
                "Led redesign of core mobile app, increasing user engagement by 40%",
                "Managed and mentored a team of 3 junior designers",
                "Established design system used across all products"
            ]
        },
        {
            company: "StartupXYZ",
            role: "UI/UX Designer",
            duration: "2019 - 2021",
            description: [
                "Designed and shipped 5+ major product features",
                "Collaborated with engineering to improve design handoff"
            ]
        }
    ],
    education: [
        {
            institution: "Parsons School of Design",
            degree: "BFA Interaction Design",
            year: "2017 - 2019"
        }
    ],
    skills: ["Figma", "React", "UI/UX", "Prototyping", "Design Systems", "User Research", "TypeScript", "Tailwind CSS"]
};

interface StyleTemplate {
    id: string;
    name: string;
    nameEn: string;
    category: string;
    categoryEn: string;
}

const templates: StyleTemplate[] = [
    // Bento Series
    { id: 'rio', name: 'RIO', nameEn: 'RIO', category: 'Bento 风格', categoryEn: 'Bento Style' },
    { id: 'tokyo', name: 'TOKYO', nameEn: 'TOKYO', category: 'Bento 风格', categoryEn: 'Bento Style' },
    { id: 'oslo', name: 'OSLO', nameEn: 'OSLO', category: 'Bento 风格', categoryEn: 'Bento Style' },
    { id: 'milan', name: 'MILAN', nameEn: 'MILAN', category: 'Bento 风格', categoryEn: 'Bento Style' },
    { id: 'nyc', name: 'NYC', nameEn: 'NYC', category: 'Bento 风格', categoryEn: 'Bento Style' },
    // Gradient Series
    { id: 'aurora', name: 'Aurora', nameEn: 'Aurora', category: '渐变风格', categoryEn: 'Gradient Style' },
    { id: 'midnight', name: 'Midnight', nameEn: 'Midnight', category: '渐变风格', categoryEn: 'Gradient Style' },
    { id: 'sunrise', name: 'Sunrise', nameEn: 'Sunrise', category: '渐变风格', categoryEn: 'Gradient Style' },
];

// Mini template previews that match the actual templates
const RioPreview = () => (
    <div className="w-full h-full bg-white text-slate-800 p-4 font-sans text-[6px] leading-tight">
        <div className="grid grid-cols-12 gap-2 h-full content-start">
            <div className="col-span-8 bg-slate-50 rounded-lg p-3 flex flex-col justify-center">
                <h1 className="text-lg font-bold tracking-tight text-slate-900 mb-0.5">{SAMPLE_DATA.fullName}</h1>
                <p className="text-[8px] text-blue-600 font-medium">{SAMPLE_DATA.title}</p>
            </div>
            <div className="col-span-4 bg-slate-900 text-white rounded-lg p-2 flex flex-col justify-center gap-1">
                <div className="flex items-center gap-1"><Mail size={6} className="text-blue-400"/> <span className="truncate">{SAMPLE_DATA.email}</span></div>
                <div className="flex items-center gap-1"><Phone size={6} className="text-blue-400"/> <span>{SAMPLE_DATA.phone}</span></div>
                <div className="flex items-center gap-1"><MapPin size={6} className="text-blue-400"/> <span>{SAMPLE_DATA.location}</span></div>
            </div>
            <div className="col-span-12 bg-blue-50 rounded-lg p-2 border border-blue-100">
                <p className="text-slate-700 leading-relaxed line-clamp-2">{SAMPLE_DATA.summary}</p>
            </div>
            <div className="col-span-8 bg-slate-50 rounded-lg p-3 border border-slate-100">
                <h3 className="text-[8px] font-bold mb-2 flex items-center gap-1">
                    <span className="w-1 h-3 bg-blue-600 rounded-full"></span>
                    Experience
                </h3>
                {SAMPLE_DATA.experience.slice(0, 1).map((job, idx) => (
                    <div key={idx} className="mb-2">
                        <div className="flex justify-between items-baseline mb-0.5">
                            <h4 className="font-bold text-[7px] text-slate-900">{job.company}</h4>
                            <span className="text-[5px] text-slate-500">{job.duration}</span>
                        </div>
                        <p className="text-blue-600 font-medium mb-1">{job.role}</p>
                        <ul className="space-y-0.5">
                            {job.description.slice(0, 2).map((desc, i) => (
                                <li key={i} className="text-slate-600">• {desc}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="col-span-4 flex flex-col gap-2">
                <div className="bg-white border border-slate-100 rounded-lg p-2">
                    <h3 className="font-bold text-[7px] mb-1">Skills</h3>
                    <div className="flex flex-wrap gap-0.5">
                        {SAMPLE_DATA.skills.slice(0, 6).map((skill, idx) => (
                            <span key={idx} className="bg-slate-100 text-slate-700 px-1 py-0.5 rounded text-[5px] font-semibold">{skill}</span>
                        ))}
                    </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2 flex-1">
                    <h3 className="font-bold text-[7px] mb-1">Education</h3>
                    {SAMPLE_DATA.education.map((edu, idx) => (
                        <div key={idx} className="bg-white p-1.5 rounded shadow-sm border border-slate-100">
                            <p className="font-bold text-[6px] text-slate-900">{edu.institution}</p>
                            <p className="text-[5px] text-slate-600">{edu.degree}</p>
                            <p className="text-[5px] text-blue-500 font-mono">{edu.year}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const TokyoPreview = () => (
    <div className="w-full h-full bg-[#0F0F0F] text-gray-300 p-4 font-sans text-[6px]">
        <div className="grid grid-cols-3 gap-2 h-full">
            <div className="col-span-3 bg-[#1A1A1A] p-3 border-l-2 border-[#00FF94] flex justify-between items-center">
                <div>
                    <h1 className="text-lg font-bold text-white tracking-tighter mb-0.5">{SAMPLE_DATA.fullName}</h1>
                    <p className="text-[#00FF94] text-[8px] tracking-widest uppercase font-mono">{SAMPLE_DATA.title}</p>
                </div>
            </div>
            <div className="col-span-1 space-y-2">
                <div className="bg-[#1A1A1A] p-2 border border-gray-800">
                    <h3 className="text-white font-bold uppercase tracking-wider text-[5px] mb-2 border-b border-gray-800 pb-1">Contact</h3>
                    <div className="space-y-1.5">
                        <div><p className="text-[4px] text-gray-500">EMAIL</p><p className="text-white truncate">{SAMPLE_DATA.email}</p></div>
                        <div><p className="text-[4px] text-gray-500">PHONE</p><p className="text-white">{SAMPLE_DATA.phone}</p></div>
                    </div>
                </div>
                <div className="bg-[#1A1A1A] p-2 border border-gray-800 flex-1">
                    <h3 className="text-white font-bold uppercase tracking-wider text-[5px] mb-2 border-b border-gray-800 pb-1">Skills</h3>
                    <div className="flex flex-wrap gap-1">
                        {SAMPLE_DATA.skills.slice(0, 5).map((skill, idx) => (
                            <span key={idx} className="text-[5px] border border-gray-700 px-1 py-0.5 text-gray-400">{skill}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-span-2 space-y-2">
                <div className="bg-[#1A1A1A] p-2 border border-gray-800">
                    <p className="text-[7px] leading-relaxed text-gray-300 border-l border-gray-700 pl-2 italic line-clamp-2">{SAMPLE_DATA.summary}</p>
                </div>
                <div className="bg-[#1A1A1A] p-3 border border-gray-800 flex-1">
                    <h3 className="text-white font-bold uppercase tracking-wider text-[5px] mb-3 flex items-center gap-2">
                        Experience
                        <div className="h-px bg-gray-800 flex-1"></div>
                    </h3>
                    {SAMPLE_DATA.experience.slice(0, 1).map((job, idx) => (
                        <div key={idx}>
                            <div className="flex justify-between items-end mb-1 border-b border-gray-800 pb-1">
                                <h4 className="text-[8px] font-bold text-white">{job.company}</h4>
                                <span className="font-mono text-[5px] text-[#00FF94]">{job.duration}</span>
                            </div>
                            <p className="text-[6px] text-gray-400 mb-2 uppercase tracking-wide">{job.role}</p>
                            <ul className="space-y-0.5">
                                {job.description.slice(0, 2).map((desc, i) => (
                                    <li key={i} className="pl-2 relative before:content-['>'] before:absolute before:left-0 before:text-gray-600 before:text-[4px]">{desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const OsloPreview = () => (
    <div className="w-full h-full bg-white text-black p-3 font-mono text-[6px]">
        <div className="border-2 border-black h-full flex flex-col">
            <div className="grid grid-cols-12 border-b-2 border-black">
                <div className="col-span-8 p-3 flex flex-col justify-center border-r-2 border-black">
                    <h1 className="text-xl font-bold uppercase leading-[0.8] tracking-tighter mb-1">{SAMPLE_DATA.fullName}</h1>
                    <p className="text-[8px] bg-black text-white inline-block px-1 py-0.5 self-start">{SAMPLE_DATA.title}</p>
                </div>
                <div className="col-span-4 p-2 flex flex-col justify-between bg-[#f0f0f0]">
                    <div className="text-[5px] font-bold uppercase underline">Contact</div>
                    <div className="flex flex-col gap-0.5 text-[5px] font-bold">
                        <p>{SAMPLE_DATA.email}</p>
                        <p>{SAMPLE_DATA.phone}</p>
                    </div>
                </div>
            </div>
            <div className="flex-1 grid grid-cols-12">
                <div className="col-span-4 border-r-2 border-black flex flex-col">
                    <div className="p-2 border-b-2 border-black">
                        <div className="bg-black text-white px-1 py-0.5 inline-block text-[5px] font-bold mb-2 uppercase">Education</div>
                        {SAMPLE_DATA.education.map((edu, idx) => (
                            <div key={idx}>
                                <p className="font-bold leading-tight">{edu.institution}</p>
                                <p className="text-[5px]">{edu.degree}</p>
                            </div>
                        ))}
                    </div>
                    <div className="p-2 flex-1 bg-gray-50">
                        <div className="bg-black text-white px-1 py-0.5 inline-block text-[5px] font-bold mb-2 uppercase">Skills</div>
                        <div className="flex flex-col gap-1">
                            {SAMPLE_DATA.skills.slice(0, 4).map((skill, idx) => (
                                <div key={idx} className="flex items-center gap-1">
                                    <div className="w-1 h-1 bg-black"></div>
                                    <span className="text-[5px] font-bold uppercase">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-span-8 flex flex-col">
                    <div className="p-2 border-b-2 border-black bg-[#ffff00]">
                        <p className="text-[5px] font-bold leading-5 uppercase line-clamp-2">{SAMPLE_DATA.summary}</p>
                    </div>
                    <div className="p-3 flex-1">
                        <div className="mb-2 border-b border-black pb-1 flex justify-between items-end">
                            <h3 className="text-[10px] font-bold uppercase">Experience</h3>
                        </div>
                        {SAMPLE_DATA.experience.slice(0, 1).map((job, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="text-[8px] font-bold bg-black text-white px-1 py-0.5 inline-block">{job.company}</h4>
                                    <span className="text-[5px] font-bold border border-black px-1 py-0.5">{job.duration}</span>
                                </div>
                                <p className="text-[6px] font-bold uppercase mb-1 underline">{job.role}</p>
                                <ul className="space-y-0.5">
                                    {job.description.slice(0, 2).map((desc, i) => (
                                        <li key={i} className="text-[5px] font-medium pl-2 relative before:content-['■'] before:absolute before:left-0 before:text-[4px]">{desc}</li>
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

const MilanPreview = () => (
    <div className="w-full h-full bg-[#FDFBF7] text-[#2C2C2C] p-4 font-serif text-[6px]">
        <div className="grid grid-cols-2 gap-4 h-full content-start">
            <div className="col-span-2 border-b border-[#D4D4D4] pb-3">
                <h1 className="text-xl font-normal italic mb-1">{SAMPLE_DATA.fullName}</h1>
                <div className="flex justify-between items-end">
                    <p className="text-[6px] uppercase tracking-widest font-sans text-[#666]">{SAMPLE_DATA.title}</p>
                    <div className="flex gap-3 text-[5px] font-sans text-[#666]">
                        <span>{SAMPLE_DATA.email}</span>
                        <span>{SAMPLE_DATA.location}</span>
                    </div>
                </div>
            </div>
            <div className="col-span-2 bg-white p-3 shadow-sm">
                <p className="text-[7px] leading-5 font-light text-[#444] line-clamp-2">{SAMPLE_DATA.summary}</p>
            </div>
            <div className="col-span-1 space-y-3">
                <h3 className="text-[5px] font-sans font-bold uppercase tracking-[0.2em] text-[#999] mb-2">Experience</h3>
                {SAMPLE_DATA.experience.slice(0, 1).map((job, idx) => (
                    <div key={idx}>
                        <h4 className="text-[8px] font-medium mb-0.5">{job.company}</h4>
                        <div className="flex justify-between text-[5px] font-sans text-[#666] mb-1 border-b border-dotted border-[#ccc] pb-1">
                            <span>{job.role}</span>
                            <span>{job.duration}</span>
                        </div>
                        <ul className="space-y-0.5">
                            {job.description.slice(0, 2).map((desc, i) => (
                                <li key={i} className="text-[5px] leading-4 text-[#444] list-none">– {desc}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="col-span-1 space-y-3 border-l border-[#E5E5E5] pl-4">
                <div>
                    <h3 className="text-[5px] font-sans font-bold uppercase tracking-[0.2em] text-[#999] mb-2">Education</h3>
                    {SAMPLE_DATA.education.map((edu, idx) => (
                        <div key={idx}>
                            <p className="font-medium text-[7px]">{edu.institution}</p>
                            <p className="text-[5px] font-sans text-[#666] uppercase">{edu.degree}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <h3 className="text-[5px] font-sans font-bold uppercase tracking-[0.2em] text-[#999] mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-1">
                        {SAMPLE_DATA.skills.slice(0, 5).map((skill, idx) => (
                            <span key={idx} className="text-[5px] italic text-[#444] border-b border-[#E5E5E5]">{skill}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const NYCPreview = () => (
    <div className="w-full h-full bg-white text-black p-3 font-sans overflow-hidden text-[6px]">
        <div className="grid grid-cols-12 grid-rows-[auto_auto_1fr] gap-2 h-full">
            <div className="col-span-8 bg-black text-white p-3 flex flex-col justify-between">
                <p className="text-[4px] font-mono tracking-widest opacity-50">PORTFOLIO // 2024</p>
                <h1 className="text-xl font-black tracking-tighter uppercase leading-[0.9]">{SAMPLE_DATA.fullName}</h1>
            </div>
            <div className="col-span-4 bg-[#FF3B30] p-3 flex flex-col justify-center items-center text-center">
                <p className="text-[9px] font-bold text-white leading-tight uppercase">{SAMPLE_DATA.title}</p>
            </div>
            <div className="col-span-12 bg-gray-100 p-2 flex justify-between items-center font-mono text-[5px] border-y border-black">
                <div className="flex gap-3">
                    <span>{SAMPLE_DATA.email}</span>
                    <span>{SAMPLE_DATA.phone}</span>
                </div>
                <span>{SAMPLE_DATA.location}</span>
            </div>
            <div className="col-span-12 grid grid-cols-12 gap-2 h-full">
                <div className="col-span-8 flex flex-col gap-2">
                    <div className="bg-white border border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <p className="font-bold text-[6px] leading-snug line-clamp-2">{SAMPLE_DATA.summary}</p>
                    </div>
                    <div className="bg-white border border-black p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-1">
                        <h3 className="text-[10px] font-black uppercase mb-3 decoration-2 underline decoration-[#FF3B30]">Experience</h3>
                        {SAMPLE_DATA.experience.slice(0, 1).map((job, idx) => (
                            <div key={idx}>
                                <div className="flex items-center gap-1 mb-0.5">
                                    <h4 className="text-[8px] font-black">{job.company}</h4>
                                    <span className="bg-black text-white text-[4px] px-1 py-0.5 font-mono">{job.duration}</span>
                                </div>
                                <p className="text-[5px] font-bold text-[#FF3B30] mb-1 uppercase">{job.role}</p>
                                <ul className="space-y-0.5">
                                    {job.description.slice(0, 2).map((desc, i) => (
                                        <li key={i} className="text-[5px] font-medium">• {desc}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-4 flex flex-col gap-2">
                    <div className="bg-black text-white p-2 shadow-[2px_2px_0px_0px_rgba(200,200,200,1)]">
                        <h3 className="font-mono text-[4px] text-[#FF3B30] mb-1 uppercase">Skills</h3>
                        <div className="flex flex-wrap gap-x-1 gap-y-0.5">
                            {SAMPLE_DATA.skills.slice(0, 5).map((skill, idx) => (
                                <span key={idx} className="text-[5px] font-bold">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-100 border border-black p-2 flex-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <h3 className="font-black text-[7px] mb-2 uppercase">Education</h3>
                        {SAMPLE_DATA.education.map((edu, idx) => (
                            <div key={idx}>
                                <p className="font-bold text-[5px]">{edu.institution}</p>
                                <p className="text-[4px]">{edu.degree}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const AuroraPreview = () => (
    <div className="w-full h-full bg-slate-50 relative overflow-hidden p-3 font-sans text-[6px]">
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>
        <div className="absolute -bottom-10 left-5 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>

        <div className="relative z-10 h-full grid grid-cols-12 gap-2">
            <div className="col-span-12 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl p-3 shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-lg font-bold text-slate-800 mb-0.5">{SAMPLE_DATA.fullName}</h1>
                    <p className="text-[7px] font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{SAMPLE_DATA.title}</p>
                </div>
                <div className="text-right text-[5px] text-slate-600 font-medium space-y-0.5">
                    <p>{SAMPLE_DATA.email}</p>
                    <p>{SAMPLE_DATA.phone}</p>
                </div>
            </div>

            <div className="col-span-8 space-y-2">
                <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl p-2 shadow-sm">
                    <p className="text-slate-700 leading-relaxed line-clamp-2">{SAMPLE_DATA.summary}</p>
                </div>
                <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl p-3 shadow-sm">
                    <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[5px] mb-2">Experience</h3>
                    {SAMPLE_DATA.experience.slice(0, 1).map((job, idx) => (
                        <div key={idx} className="pl-2 border-l border-purple-200">
                            <h4 className="text-[7px] font-bold text-slate-800">{job.company}</h4>
                            <div className="flex gap-1 text-[5px] mb-1">
                                <span className="font-bold text-purple-600">{job.role}</span>
                                <span className="text-slate-400">•</span>
                                <span className="text-slate-500">{job.duration}</span>
                            </div>
                            <ul className="space-y-0.5">
                                {job.description.slice(0, 2).map((desc, i) => (
                                    <li key={i} className="text-[5px] text-slate-600 leading-relaxed">{desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="col-span-4 flex flex-col gap-2">
                <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl p-2 shadow-sm">
                    <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[5px] mb-1">Skills</h3>
                    <div className="flex flex-wrap gap-1">
                        {SAMPLE_DATA.skills.slice(0, 5).map((skill, idx) => (
                            <span key={idx} className="bg-white/80 text-purple-900 px-1 py-0.5 rounded text-[4px] font-semibold shadow-sm border border-purple-50">{skill}</span>
                        ))}
                    </div>
                </div>
                <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl p-2 shadow-sm flex-1">
                    <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[5px] mb-1">Education</h3>
                    {SAMPLE_DATA.education.map((edu, idx) => (
                        <div key={idx}>
                            <p className="font-bold text-[5px] text-slate-800">{edu.institution}</p>
                            <p className="text-[4px] text-purple-600 font-medium">{edu.degree}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const MidnightPreview = () => (
    <div className="w-full h-full bg-[#050511] text-white relative overflow-hidden p-3 font-sans text-[6px]">
        <div className="absolute top-[-20%] left-[-10%] w-40 h-40 bg-blue-900/40 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-40 h-40 bg-indigo-900/30 rounded-full filter blur-3xl"></div>

        <div className="relative z-10">
            <div className="text-center mb-4">
                <div className="inline-block mb-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <span className="text-[4px] font-medium tracking-[0.2em] text-blue-200 uppercase">{SAMPLE_DATA.title}</span>
                </div>
                <h1 className="text-lg font-light tracking-tight mb-1">{SAMPLE_DATA.fullName}</h1>
                <div className="flex justify-center gap-3 text-[4px] text-blue-300/60 font-mono">
                    <span>{SAMPLE_DATA.email}</span>
                    <span>{SAMPLE_DATA.phone}</span>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-4 space-y-2">
                    <div className="bg-white/5 border border-white/5 rounded-lg p-2 backdrop-blur-sm">
                        <h3 className="text-[4px] font-bold text-blue-400 mb-1 uppercase tracking-widest">Skills</h3>
                        <div className="flex flex-wrap gap-1">
                            {SAMPLE_DATA.skills.slice(0, 4).map((skill, idx) => (
                                <span key={idx} className="text-[4px] text-gray-300 border border-white/10 px-1 py-0.5 rounded bg-black/20">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-lg p-2 backdrop-blur-sm">
                        <h3 className="text-[4px] font-bold text-blue-400 mb-1 uppercase tracking-widest">Education</h3>
                        {SAMPLE_DATA.education.map((edu, idx) => (
                            <div key={idx}>
                                <p className="font-bold text-[5px]">{edu.institution}</p>
                                <p className="text-[4px] text-gray-400">{edu.degree}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-8 space-y-2">
                    <p className="text-[6px] font-light leading-relaxed text-gray-300 border-l border-blue-500/50 pl-2 line-clamp-2">{SAMPLE_DATA.summary}</p>

                    <div>
                        <h3 className="text-[7px] font-light mb-2 flex items-center gap-2 text-blue-100">
                            <span className="w-3 h-[1px] bg-blue-500"></span>
                            Experience
                        </h3>
                        {SAMPLE_DATA.experience.slice(0, 1).map((job, idx) => (
                            <div key={idx} className="pl-3">
                                <div className="absolute left-0 top-1 w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]"></div>
                                <h4 className="text-[7px] font-medium text-white mb-0.5">{job.company}</h4>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[5px] text-blue-300">{job.role}</span>
                                    <span className="text-[4px] font-mono text-white/30">{job.duration}</span>
                                </div>
                                <ul className="space-y-0.5">
                                    {job.description.slice(0, 2).map((desc, i) => (
                                        <li key={i} className="text-[5px] text-gray-400 font-light leading-relaxed">{desc}</li>
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

const SunrisePreview = () => (
    <div className="w-full h-full bg-white flex font-sans text-[6px]">
        <div className="w-[35%] bg-gradient-to-b from-[#FF9A9E] via-[#FECFEF] to-[#F6F9FC] p-3 relative">
            <div className="relative z-10">
                <h1 className="text-lg font-bold text-slate-900 leading-tight mb-0.5 font-serif">{SAMPLE_DATA.fullName}</h1>
                <p className="text-slate-800 font-medium mb-3 opacity-70 text-[6px]">{SAMPLE_DATA.title}</p>

                <div className="space-y-1 mb-4">
                    <p className="text-[5px] text-slate-700 font-medium flex items-center gap-1"><Mail size={6} /> {SAMPLE_DATA.email}</p>
                    <p className="text-[5px] text-slate-700 font-medium flex items-center gap-1"><Phone size={6} /> {SAMPLE_DATA.phone}</p>
                </div>

                <div className="space-y-3">
                    <div>
                        <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[4px] mb-1 opacity-50">Skills</h3>
                        <div className="flex flex-wrap gap-1">
                            {SAMPLE_DATA.skills.slice(0, 4).map((skill, idx) => (
                                <span key={idx} className="bg-white/40 px-1 py-0.5 rounded text-[4px] font-bold text-slate-800">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[4px] mb-1 opacity-50">Education</h3>
                        {SAMPLE_DATA.education.map((edu, idx) => (
                            <div key={idx}>
                                <p className="font-bold text-[5px] text-slate-900">{edu.institution}</p>
                                <p className="text-[4px] text-slate-700">{edu.degree}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="flex-1 p-4 bg-white">
            <div className="mb-3">
                <h3 className="text-[8px] font-serif font-bold text-slate-900 mb-1">Summary</h3>
                <p className="text-slate-600 leading-4 line-clamp-2">{SAMPLE_DATA.summary}</p>
            </div>

            <div>
                <h3 className="text-[8px] font-serif font-bold text-slate-900 mb-2">Experience</h3>
                {SAMPLE_DATA.experience.slice(0, 1).map((job, idx) => (
                    <div key={idx}>
                        <div className="flex justify-between items-baseline mb-0.5">
                            <h4 className="text-[7px] font-bold text-slate-800">{job.company}</h4>
                            <span className="text-[4px] font-bold text-slate-400 uppercase tracking-wider">{job.duration}</span>
                        </div>
                        <p className="text-[5px] font-medium text-[#FF9A9E] mb-1 uppercase tracking-wide">{job.role}</p>
                        <ul className="space-y-0.5">
                            {job.description.slice(0, 2).map((desc, i) => (
                                <li key={i} className="text-[5px] text-slate-600 pl-2 border-l border-orange-100">{desc}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// Map template IDs to preview components
const previewComponents: Record<string, React.FC> = {
    rio: RioPreview,
    tokyo: TokyoPreview,
    oslo: OsloPreview,
    milan: MilanPreview,
    nyc: NYCPreview,
    aurora: AuroraPreview,
    midnight: MidnightPreview,
    sunrise: SunrisePreview,
};

export const StyleCarousel: React.FC<{ language: 'en' | 'zh' }> = ({ language }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const t = {
        en: {
            title: "Premium Resume Styles",
            subtitle: "Swipe to explore professionally designed templates that make you stand out"
        },
        zh: {
            title: "高级简历风格展示",
            subtitle: "滑动查看专业设计的模板，让您脱颖而出"
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
        <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl"></div>
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
                    <div className="relative mb-8">
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
                                    <div className="w-[320px] h-[452px] md:w-[400px] md:h-[566px] lg:w-[480px] lg:h-[679px] bg-white rounded-xl shadow-2xl overflow-hidden mt-6 border border-gray-100">
                                        {PreviewComponent && <PreviewComponent />}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl rounded-full p-3 transition-all hover:scale-110 group"
                        >
                            <ChevronLeft className="text-gray-700 group-hover:text-gray-900" size={24} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl rounded-full p-3 transition-all hover:scale-110 group"
                        >
                            <ChevronRight className="text-gray-700 group-hover:text-gray-900" size={24} />
                        </button>
                    </div>

                    {/* Thumbnail Navigation */}
                    <div className="flex justify-center gap-2 md:gap-3 px-4 overflow-x-auto pb-4">
                        {templates.map((template, idx) => {
                            const ThumbPreview = previewComponents[template.id];
                            return (
                                <button
                                    key={template.id}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`relative flex-shrink-0 transition-all duration-300 ${
                                        idx === currentIndex
                                            ? 'scale-105'
                                            : 'scale-100 hover:scale-105 opacity-70 hover:opacity-100'
                                    }`}
                                >
                                    <div className={`w-16 h-[90px] md:w-20 md:h-[113px] rounded-lg overflow-hidden border-2 transition-all ${
                                        idx === currentIndex
                                            ? 'border-blue-500 shadow-lg shadow-blue-500/30'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}>
                                        <div className="w-full h-full overflow-hidden">
                                            {ThumbPreview && <ThumbPreview />}
                                        </div>
                                    </div>
                                    <div className={`absolute -bottom-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap transition-all ${
                                        idx === currentIndex ? 'opacity-100' : 'opacity-0'
                                    }`}>
                                        <span className="text-xs font-bold text-gray-700">
                                            {template.name}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Progress Indicators */}
                    <div className="flex justify-center gap-2 mt-8">
                        {templates.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className="relative"
                            >
                                <div className={`h-1.5 rounded-full transition-all duration-300 ${
                                    idx === currentIndex
                                        ? 'w-10 bg-gradient-to-r from-blue-500 to-purple-600'
                                        : 'w-4 bg-gray-300 hover:bg-gray-400'
                                }`}></div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
