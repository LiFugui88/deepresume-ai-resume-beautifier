import React from 'react';
import { ResumeData, Project } from '../types';
import { MapPin, Mail, Phone, Globe, Linkedin, ExternalLink, FolderGit2 } from 'lucide-react';

export type TemplateId = 
    // Classic Series
    | 'standard' | 'minimal' | 'modern' | 'executive' | 'bold'
    // Bento Series
    | 'rio' | 'tokyo' | 'oslo' | 'milan' | 'nyc'
    // Gradient Series
    | 'aurora' | 'midnight' | 'sunrise' | 'azure' | 'bloom';

export type Language = 'en' | 'zh';

interface ResumeDesignProps {
    data: ResumeData;
    template: TemplateId;
    language: Language;
    ref?: React.Ref<HTMLDivElement>;
}

const LABELS = {
    en: {
        contact: "Contact",
        education: "Education",
        skills: "Skills",
        experience: "Experience",
        projects: "Project Experience",
        summary: "Professional Summary"
    },
    zh: {
        contact: "联系方式",
        education: "教育背景",
        skills: "技能专长",
        experience: "工作经历",
        projects: "项目经验",
        summary: "个人简介"
    }
};

// Helper: Project Block Renderer
const ProjectBlock: React.FC<{ project: Project, classic?: boolean, darkMode?: boolean }> = ({ project, classic = true, darkMode = false }) => (
    <div className="mb-4 break-inside-avoid">
        <div className="flex justify-between items-baseline mb-1">
            <h4 className={`${classic ? 'font-bold text-md' : 'font-bold text-md'} ${darkMode ? 'text-white' : ''}`}>{project.name}</h4>
            <span className={`text-xs ${darkMode ? 'text-white/60' : 'opacity-60'}`}>{project.duration}</span>
        </div>
        <div className="flex justify-between items-center mb-1">
            <p className={`text-sm ${classic ? 'italic' : 'font-medium opacity-80'} ${darkMode ? 'text-white/80' : ''}`}>{project.role}</p>
            {project.link && <span className="text-[10px] opacity-50 flex items-center gap-1"><ExternalLink size={8}/> Link</span>}
        </div>
        <ul className={`list-disc space-y-1 opacity-80 ${classic ? 'pl-5' : 'pl-4'} ${darkMode ? 'text-white/70' : ''}`}>
            {project.description.map((desc, i) => (
                <li key={i} className="text-sm">{desc}</li>
            ))}
        </ul>
    </div>
);

// ==========================================
// GROUP 1: CLASSIC SERIES (Clean, Traditional)
// ==========================================

// 1. STANDARD: Traditional, Serif, Time-tested
const StandardTemplate: React.FC<{ data: ResumeData; labels: any }> = ({ data, labels }) => (
    <div className="w-full h-full bg-white text-slate-900 p-[15mm] font-serif leading-relaxed">
        <div className="border-b-2 border-slate-900 pb-6 mb-8">
            <h1 className="text-4xl font-bold uppercase tracking-wide mb-2">{data.fullName}</h1>
            <p className="text-lg text-slate-600 italic mb-4">{data.title}</p>
            <div className="flex flex-wrap gap-4 text-sm font-sans text-slate-600">
                {data.email && <span className="flex items-center gap-1"><Mail size={12}/> {data.email}</span>}
                {data.phone && <span className="flex items-center gap-1"><Phone size={12}/> {data.phone}</span>}
                {data.location && <span className="flex items-center gap-1"><MapPin size={12}/> {data.location}</span>}
                {data.linkedin && <span className="flex items-center gap-1"><Linkedin size={12}/> LinkedIn</span>}
            </div>
        </div>

        {data.summary && (
            <div className="mb-8">
                <h3 className="font-sans font-bold text-sm uppercase tracking-widest mb-3 text-slate-500">{labels.summary}</h3>
                <p className="text-slate-800 leading-7">{data.summary}</p>
            </div>
        )}

        <div className="mb-8">
            <h3 className="font-sans font-bold text-sm uppercase tracking-widest mb-6 text-slate-500 border-b border-slate-200 pb-2">{labels.experience}</h3>
            <div className="space-y-8">
                {data.experience.map((job, idx) => (
                    <div key={idx} className="break-inside-avoid">
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-lg">{job.company}</h4>
                            <span className="font-sans text-sm text-slate-500">{job.duration}</span>
                        </div>
                        <p className="font-semibold italic text-slate-700 mb-2">{job.role}</p>
                        <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                            {job.description.map((desc, i) => (
                                <li key={i} className="pl-1">{desc}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

        {data.projects && data.projects.length > 0 && (
            <div className="mb-8">
                <h3 className="font-sans font-bold text-sm uppercase tracking-widest mb-6 text-slate-500 border-b border-slate-200 pb-2">{labels.projects}</h3>
                <div className="space-y-6">
                    {data.projects.map((proj, idx) => (
                        <ProjectBlock key={idx} project={proj} classic={true} />
                    ))}
                </div>
            </div>
        )}

        <div className="grid grid-cols-2 gap-8">
            {data.education && (
                <div>
                    <h3 className="font-sans font-bold text-sm uppercase tracking-widest mb-4 text-slate-500 border-b border-slate-200 pb-2">{labels.education}</h3>
                    <div className="space-y-4">
                        {data.education.map((edu, idx) => (
                            <div key={idx} className="break-inside-avoid">
                                <p className="font-bold">{edu.institution}</p>
                                <p className="italic text-slate-600">{edu.degree}</p>
                                <p className="text-sm text-slate-500">{edu.year}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {data.skills && (
                <div>
                    <h3 className="font-sans font-bold text-sm uppercase tracking-widest mb-4 text-slate-500 border-b border-slate-200 pb-2">{labels.skills}</h3>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, idx) => (
                            <span key={idx} className="bg-slate-100 px-2 py-1 text-sm text-slate-700 rounded">{skill}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
);

// 2. MINIMAL: Clean, Center aligned header, Sans-serif
const MinimalTemplate: React.FC<{ data: ResumeData; labels: any }> = ({ data, labels }) => (
    <div className="w-full h-full bg-white text-[#333] p-[15mm] font-sans">
        <div className="text-center mb-12">
            <h1 className="text-3xl font-light tracking-[0.2em] uppercase mb-3">{data.fullName}</h1>
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">{data.title}</p>
            <div className="flex justify-center gap-6 text-xs text-gray-500">
                {data.email && <span>{data.email}</span>}
                {data.phone && <span>{data.phone}</span>}
                {data.location && <span>{data.location}</span>}
            </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3 space-y-8 text-right">
                {data.education && (
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-black">{labels.education}</h3>
                        {data.education.map((edu, idx) => (
                            <div key={idx} className="mb-4 break-inside-avoid">
                                <p className="font-bold text-sm">{edu.institution}</p>
                                <p className="text-xs text-gray-600 mb-1">{edu.degree}</p>
                                <p className="text-[10px] text-gray-400">{edu.year}</p>
                            </div>
                        ))}
                    </div>
                )}
                {data.skills && (
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-black">{labels.skills}</h3>
                        <div className="flex flex-wrap justify-end gap-2">
                            {data.skills.map((skill, idx) => (
                                <span key={idx} className="text-xs text-gray-600">{skill}</span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="col-span-9 border-l border-gray-100 pl-8 space-y-8">
                {data.summary && (
                    <p className="text-sm leading-6 text-gray-600 italic">{data.summary}</p>
                )}
                
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-black">{labels.experience}</h3>
                    <div className="space-y-8">
                        {data.experience.map((job, idx) => (
                            <div key={idx} className="break-inside-avoid">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-medium text-lg">{job.company}</h4>
                                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">{job.duration}</span>
                                </div>
                                <p className="text-sm font-medium text-gray-800 mb-3">{job.role}</p>
                                <ul className="space-y-2">
                                    {job.description.map((desc, i) => (
                                        <li key={i} className="text-sm text-gray-600 leading-relaxed pl-3 border-l-2 border-gray-100">{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {data.projects && data.projects.length > 0 && (
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-black">{labels.projects}</h3>
                        <div className="space-y-6">
                            {data.projects.map((proj, idx) => (
                                <div key={idx} className="break-inside-avoid">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-medium text-md">{proj.name}</h4>
                                        <span className="text-xs text-gray-400">{proj.duration}</span>
                                    </div>
                                    <p className="text-sm text-gray-800 mb-2 italic">{proj.role}</p>
                                    <ul className="space-y-1">
                                        {proj.description.map((desc, i) => (
                                            <li key={i} className="text-sm text-gray-600 pl-3 border-l-2 border-gray-100">{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
);

// 3. MODERN: Sidebar, Blue Accents, Clean
const ModernTemplate: React.FC<{ data: ResumeData; labels: any }> = ({ data, labels }) => (
    <div className="w-full h-full bg-white flex font-sans">
        {/* Sidebar */}
        <div className="w-[32%] bg-[#F0F4F8] p-8 flex flex-col gap-8 pt-12 h-full">
            <div>
                <div className="w-12 h-1 bg-[#2563EB] mb-6"></div>
                <h1 className="text-3xl font-bold text-[#1E293B] leading-tight mb-2">{data.fullName}</h1>
                <p className="text-[#3B82F6] font-medium">{data.title}</p>
            </div>

            <div className="space-y-3 text-sm text-[#475569]">
                {data.email && <div className="flex items-center gap-3 break-all"><Mail size={14} className="shrink-0"/> {data.email}</div>}
                {data.phone && <div className="flex items-center gap-3"><Phone size={14} className="shrink-0"/> {data.phone}</div>}
                {data.location && <div className="flex items-center gap-3"><MapPin size={14} className="shrink-0"/> {data.location}</div>}
            </div>

            {data.skills && (
                <div>
                    <h3 className="font-bold text-[#1E293B] uppercase tracking-wider text-xs mb-4">{labels.skills}</h3>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, idx) => (
                            <span key={idx} className="bg-white px-3 py-1 rounded text-xs font-medium text-[#475569] shadow-sm">{skill}</span>
                        ))}
                    </div>
                </div>
            )}

            {data.education && (
                <div>
                    <h3 className="font-bold text-[#1E293B] uppercase tracking-wider text-xs mb-4">{labels.education}</h3>
                    <div className="space-y-4">
                        {data.education.map((edu, idx) => (
                            <div key={idx} className="break-inside-avoid">
                                <p className="font-bold text-sm text-[#1E293B]">{edu.institution}</p>
                                <p className="text-xs text-[#64748B]">{edu.degree}</p>
                                <p className="text-[10px] text-[#94A3B8] mt-0.5">{edu.year}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10 pt-12 space-y-10">
            {data.summary && (
                <div>
                    <h3 className="font-bold text-[#1E293B] uppercase tracking-wider text-xs mb-4 flex items-center gap-3">
                        {labels.summary}
                        <div className="h-px bg-gray-200 flex-1"></div>
                    </h3>
                    <p className="text-[#475569] leading-7">{data.summary}</p>
                </div>
            )}

            <div>
                 <h3 className="font-bold text-[#1E293B] uppercase tracking-wider text-xs mb-6 flex items-center gap-3">
                    {labels.experience}
                    <div className="h-px bg-gray-200 flex-1"></div>
                </h3>
                <div className="space-y-8">
                    {data.experience.map((job, idx) => (
                        <div key={idx} className="break-inside-avoid">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-lg font-bold text-[#1E293B]">{job.company}</h4>
                                <span className="text-xs font-mono text-[#64748B] bg-[#F1F5F9] px-2 py-1 rounded">{job.duration}</span>
                            </div>
                            <p className="text-sm font-semibold text-[#3B82F6] mb-3">{job.role}</p>
                            <ul className="space-y-2">
                                {job.description.map((desc, i) => (
                                    <li key={i} className="text-sm text-[#475569] pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#94A3B8]">{desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {data.projects && data.projects.length > 0 && (
                <div>
                     <h3 className="font-bold text-[#1E293B] uppercase tracking-wider text-xs mb-6 flex items-center gap-3">
                        {labels.projects}
                        <div className="h-px bg-gray-200 flex-1"></div>
                    </h3>
                    <div className="space-y-6">
                        {data.projects.map((proj, idx) => (
                             <div key={idx} className="break-inside-avoid">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="text-md font-bold text-[#1E293B]">{proj.name}</h4>
                                    <span className="text-xs text-[#64748B]">{proj.duration}</span>
                                </div>
                                <p className="text-sm font-medium text-[#475569] mb-2">{proj.role}</p>
                                <ul className="space-y-1">
                                    {proj.description.map((desc, i) => (
                                        <li key={i} className="text-sm text-[#475569] pl-4 relative before:content-['>'] before:absolute before:left-0 before:text-[#94A3B8] before:text-[10px] before:top-[4px]">{desc}</li>
                                    ))}
                                </ul>
                             </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
);

// 4. EXECUTIVE: Elegant, Header Bar, Formal
const ExecutiveTemplate: React.FC<{ data: ResumeData; labels: any }> = ({ data, labels }) => (
    <div className="w-full h-full bg-white font-serif">
        <div className="bg-[#1a1a1a] text-[#d4af37] p-10 text-center">
            <h1 className="text-3xl tracking-[0.1em] uppercase font-normal mb-2">{data.fullName}</h1>
            <p className="text-white text-sm tracking-widest font-sans uppercase">{data.title}</p>
        </div>

        <div className="p-12 max-w-3xl mx-auto">
            <div className="flex justify-center gap-6 text-xs font-sans text-gray-500 mb-12 border-b border-gray-100 pb-8">
                {data.email && <span>{data.email}</span>}
                {data.phone && <span>{data.phone}</span>}
                {data.location && <span>{data.location}</span>}
            </div>

            {data.summary && (
                <div className="mb-10 text-center">
                    <p className="text-gray-700 leading-8 italic">{data.summary}</p>
                </div>
            )}

            <div className="mb-12">
                <h3 className="text-center text-xs font-sans font-bold uppercase tracking-[0.2em] mb-8 text-[#1a1a1a]">{labels.experience}</h3>
                <div className="space-y-10">
                    {data.experience.map((job, idx) => (
                        <div key={idx} className="relative pl-8 border-l border-gray-200 break-inside-avoid">
                            <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-[#d4af37]"></div>
                            <h4 className="text-lg font-bold text-[#1a1a1a]">{job.company}</h4>
                            <div className="flex justify-between text-sm mb-3 mt-1">
                                <span className="italic text-gray-600">{job.role}</span>
                                <span className="font-sans text-gray-400 text-xs">{job.duration}</span>
                            </div>
                            <div className="text-sm text-gray-700 space-y-2 leading-relaxed font-sans">
                                {job.description.map((desc, i) => (
                                    <p key={i}>{desc}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {data.projects && data.projects.length > 0 && (
                <div className="mb-12">
                    <h3 className="text-center text-xs font-sans font-bold uppercase tracking-[0.2em] mb-8 text-[#1a1a1a]">{labels.projects}</h3>
                    <div className="space-y-8">
                        {data.projects.map((proj, idx) => (
                            <div key={idx} className="break-inside-avoid">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="text-md font-bold text-[#1a1a1a]">{proj.name}</h4>
                                    <span className="font-sans text-xs text-gray-400">{proj.duration}</span>
                                </div>
                                <p className="text-sm italic text-gray-600 mb-2">{proj.role}</p>
                                <ul className="list-none space-y-1 font-sans">
                                    {proj.description.map((desc, i) => (
                                        <li key={i} className="text-sm text-gray-700">- {desc}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-12">
                {data.education && (
                    <div>
                        <h3 className="text-center text-xs font-sans font-bold uppercase tracking-[0.2em] mb-6 text-[#1a1a1a]">{labels.education}</h3>
                        <div className="text-center space-y-4">
                            {data.education.map((edu, idx) => (
                                <div key={idx} className="break-inside-avoid">
                                    <p className="font-bold text-sm">{edu.institution}</p>
                                    <p className="text-xs text-gray-500">{edu.degree}</p>
                                    <p className="text-[10px] text-gray-400 mt-1">{edu.year}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {data.skills && (
                    <div>
                        <h3 className="text-center text-xs font-sans font-bold uppercase tracking-[0.2em] mb-6 text-[#1a1a1a]">{labels.skills}</h3>
                        <div className="flex flex-wrap justify-center gap-2">
                            {data.skills.map((skill, idx) => (
                                <span key={idx} className="text-xs font-sans border border-gray-200 px-2 py-1 text-gray-600">{skill}</span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
);

// 5. BOLD: Big Typography, Strong Contrast
const BoldTemplate: React.FC<{ data: ResumeData; labels: any }> = ({ data, labels }) => (
    <div className="w-full h-full bg-white p-[12mm] font-sans">
        <div className="border-b-4 border-black pb-6 mb-8">
            <h1 className="text-6xl font-black tracking-tighter uppercase mb-2">{data.fullName}</h1>
            <div className="flex justify-between items-end">
                <p className="text-xl font-bold bg-black text-white px-3 py-1 inline-block">{data.title}</p>
                <div className="text-right text-xs font-bold space-y-1">
                    {data.email && <p>{data.email}</p>}
                    {data.phone && <p>{data.phone}</p>}
                </div>
            </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-8">
                {data.summary && (
                    <div className="mb-8 bg-gray-100 p-4 border-l-4 border-black">
                        <p className="font-medium text-sm leading-6">{data.summary}</p>
                    </div>
                )}

                <div>
                    <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
                        <span className="w-4 h-4 bg-black"></span>
                        {labels.experience}
                    </h3>
                    <div className="space-y-8">
                        {data.experience.map((job, idx) => (
                            <div key={idx} className="break-inside-avoid">
                                <div className="mb-2">
                                    <h4 className="text-xl font-bold inline-block border-b-2 border-black">{job.company}</h4>
                                </div>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-bold text-sm text-gray-600 uppercase">{job.role}</span>
                                    <span className="font-mono text-xs font-bold">{job.duration}</span>
                                </div>
                                <ul className="space-y-1">
                                    {job.description.map((desc, i) => (
                                        <li key={i} className="text-sm font-medium pl-4 relative before:content-['>'] before:absolute before:left-0 before:font-bold">{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {data.projects && data.projects.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
                            <span className="w-4 h-4 bg-black"></span>
                            {labels.projects}
                        </h3>
                        <div className="space-y-6">
                            {data.projects.map((proj, idx) => (
                                <div key={idx} className="break-inside-avoid">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="text-lg font-bold">{proj.name}</h4>
                                        <span className="font-mono text-xs font-bold">{proj.duration}</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-600 mb-2">{proj.role}</p>
                                    <ul className="space-y-1">
                                        {proj.description.map((desc, i) => (
                                            <li key={i} className="text-sm font-medium pl-4 relative before:content-['+'] before:absolute before:left-0 before:font-bold">{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="col-span-4 space-y-8">
                {data.skills && (
                    <div>
                        <h3 className="text-lg font-black uppercase mb-4 border-b-2 border-black">{labels.skills}</h3>
                        <div className="flex flex-col gap-2">
                            {data.skills.map((skill, idx) => (
                                <span key={idx} className="font-bold text-sm bg-black text-white px-2 py-1 self-start">{skill}</span>
                            ))}
                        </div>
                    </div>
                )}

                {data.education && (
                    <div>
                        <h3 className="text-lg font-black uppercase mb-4 border-b-2 border-black">{labels.education}</h3>
                        <div className="space-y-4">
                            {data.education.map((edu, idx) => (
                                <div key={idx} className="bg-gray-100 p-3 break-inside-avoid">
                                    <p className="font-bold text-sm leading-tight">{edu.institution}</p>
                                    <p className="text-xs font-medium mt-1">{edu.degree}</p>
                                    <p className="text-[10px] font-mono mt-1 text-gray-500">{edu.year}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {data.location && (
                    <div className="bg-black text-white p-4 text-center">
                        <MapPin size={24} className="mx-auto mb-2" />
                        <p className="font-bold text-sm">{data.location}</p>
                    </div>
                )}
            </div>
        </div>
    </div>
);


// ==========================================
// GROUP 2: BENTO SERIES (High Design)
// ==========================================

// 6. RIO (Classic Bento)
const RioTemplate: React.FC<{ data: ResumeData; labels: any }> = ({ data, labels }) => (
    <div className="w-full h-full bg-white text-slate-800 p-[10mm] font-body text-sm leading-relaxed">
        <div className="grid grid-cols-12 gap-4 h-full content-start">
            <div className="col-span-8 bg-slate-50 rounded-2xl p-8 flex flex-col justify-center">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">{data.fullName}</h1>
                <p className="text-lg text-blue-600 font-medium">{data.title}</p>
            </div>
            <div className="col-span-4 bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-center gap-3">
                {data.email && <div className="flex items-center gap-3"><Mail size={14} className="text-blue-400"/> <span className="text-xs truncate">{data.email}</span></div>}
                {data.phone && <div className="flex items-center gap-3"><Phone size={14} className="text-blue-400"/> <span className="text-xs truncate">{data.phone}</span></div>}
                {data.location && <div className="flex items-center gap-3"><MapPin size={14} className="text-blue-400"/> <span className="text-xs truncate">{data.location}</span></div>}
            </div>
            {data.summary && (
                <div className="col-span-12 bg-blue-50 rounded-2xl p-6 border border-blue-100">
                    <p className="text-slate-700 leading-relaxed font-medium">{data.summary}</p>
                </div>
            )}
            <div className="col-span-8 flex flex-col gap-4">
                <div className="bg-slate-50 rounded-2xl p-8 h-full border border-slate-100">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                        {labels.experience}
                    </h3>
                    <div className="space-y-8">
                        {data.experience.map((job, idx) => (
                            <div key={idx} className="relative pl-6 border-l-2 border-slate-200 last:border-0 break-inside-avoid">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-blue-200"></div>
                                <div className="flex justify-between items-baseline mb-2">
                                    <h4 className="font-bold text-lg text-slate-900">{job.company}</h4>
                                    <span className="text-xs font-mono text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-100">{job.duration}</span>
                                </div>
                                <p className="text-blue-600 font-medium mb-2 text-sm">{job.role}</p>
                                <ul className="space-y-2">
                                    {job.description.map((desc, i) => (
                                        <li key={i} className="text-slate-600 text-sm">• {desc}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {data.projects && data.projects.length > 0 && (
                         <div className="mt-10 pt-6 border-t border-slate-200">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-2 h-8 bg-slate-600 rounded-full"></span>
                                {labels.projects}
                            </h3>
                            <div className="space-y-6">
                                {data.projects.map((proj, idx) => (
                                    <ProjectBlock key={idx} project={proj} classic={true} />
                                ))}
                            </div>
                         </div>
                    )}
                </div>
            </div>
            <div className="col-span-4 flex flex-col gap-4">
                {data.skills && (
                    <div className="bg-white border-2 border-slate-100 rounded-2xl p-6">
                        <h3 className="font-bold text-lg mb-4">{labels.skills}</h3>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, idx) => (
                                <span key={idx} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-xs font-semibold">{skill}</span>
                            ))}
                        </div>
                    </div>
                )}
                {data.education && (
                    <div className="bg-slate-50 rounded-2xl p-6 flex-1">
                        <h3 className="font-bold text-lg mb-4">{labels.education}</h3>
                        <div className="space-y-4">
                            {data.education.map((edu, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 break-inside-avoid">
                                    <p className="font-bold text-sm text-slate-900">{edu.institution}</p>
                                    <p className="text-xs text-slate-600 mt-1">{edu.degree}</p>
                                    <p className="text-xs text-blue-500 mt-2 font-mono">{edu.year}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
);

// 7. TOKYO (Dark Bento)
const TokyoTemplate: React.FC<{ data: ResumeData; labels: any }> = ({ data, labels }) => (
    <div className="w-full h-full bg-[#0F0F0F] text-gray-300 p-[10mm] font-sans">
        <div className="grid grid-cols-3 gap-4 h-full">
            <div className="col-span-3 bg-[#1A1A1A] p-8 rounded-none border-l-4 border-[#00FF94] flex justify-between items-center">
                <div>
                    <h1 className="text-5xl font-bold text-white tracking-tighter mb-2">{data.fullName}</h1>
                    <p className="text-[#00FF94] text-xl tracking-widest uppercase font-mono">{data.title}</p>
                </div>
                <div className="text-right space-y-1 text-sm font-mono text-gray-500 hidden sm:block">
                    <p>REV. {new Date().getFullYear()}</p>
                    <p>CONFIDENTIAL</p>
                </div>
            </div>
            <div className="col-span-1 space-y-4">
                <div className="bg-[#1A1A1A] p-6 border border-gray-800">
                    <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-6 border-b border-gray-800 pb-2">{labels.contact}</h3>
                    <div className="space-y-4 text-sm">
                        {data.email && <div className="group"><p className="text-[10px] text-gray-500">EMAIL</p><p className="text-white truncate">{data.email}</p></div>}
                        {data.phone && <div className="group"><p className="text-[10px] text-gray-500">PHONE</p><p className="text-white">{data.phone}</p></div>}
                        {data.location && <div className="group"><p className="text-[10px] text-gray-500">LOCATION</p><p className="text-white">{data.location}</p></div>}
                    </div>
                </div>
                {data.skills && (
                    <div className="bg-[#1A1A1A] p-6 border border-gray-800 flex-1">
                         <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-6 border-b border-gray-800 pb-2">{labels.skills}</h3>
                         <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, idx) => (
                                <span key={idx} className="text-xs border border-gray-700 px-2 py-1 text-gray-400 hover:border-[#00FF94] hover:text-[#00FF94] transition-colors">{skill}</span>
                            ))}
                         </div>
                    </div>
                )}
                {data.education && (
                    <div className="bg-[#1A1A1A] p-6 border border-gray-800">
                        <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-6 border-b border-gray-800 pb-2">{labels.education}</h3>
                        <div className="space-y-4">
                            {data.education.map((edu, idx) => (
                                <div key={idx} className="break-inside-avoid">
                                    <p className="text-white font-bold text-sm">{edu.institution}</p>
                                    <p className="text-xs text-gray-500">{edu.degree}</p>
                                    <p className="text-[10px] text-[#00FF94] font-mono mt-1">{edu.year}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="col-span-2 space-y-4">
                {data.summary && (
                    <div className="bg-[#1A1A1A] p-8 border border-gray-800">
                        <p className="text-lg leading-relaxed text-gray-300 border-l-2 border-gray-700 pl-4 italic">{data.summary}</p>
                    </div>
                )}
                <div className="bg-[#1A1A1A] p-8 border border-gray-800 h-full">
                    <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-8 flex items-center gap-4">
                        {labels.experience}
                        <div className="h-px bg-gray-800 flex-1"></div>
                    </h3>
                    <div className="space-y-10">
                        {data.experience.map((job, idx) => (
                            <div key={idx} className="relative break-inside-avoid">
                                <div className="flex justify-between items-end mb-2 border-b border-gray-800 pb-2">
                                    <h4 className="text-xl font-bold text-white">{job.company}</h4>
                                    <span className="font-mono text-xs text-[#00FF94]">{job.duration}</span>
                                </div>
                                <p className="text-sm text-gray-400 mb-4 uppercase tracking-wide">{job.role}</p>
                                <ul className="space-y-2">
                                    {job.description.map((desc, i) => (
                                        <li key={i} className="text-sm pl-4 relative before:content-['>'] before:absolute before:left-0 before:text-gray-600 before:text-xs">{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {data.projects && data.projects.length > 0 && (
                        <div className="mt-10 pt-8 border-t border-gray-800">
                            <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-8 flex items-center gap-4">
                                {labels.projects}
                                <div className="h-px bg-gray-800 flex-1"></div>
                            </h3>
                            <div className="space-y-8">
                                {data.projects.map((proj, idx) => (
                                    <ProjectBlock key={idx} project={proj} classic={false} darkMode={true} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);

// 8. OSLO (Brutalist Bento)
const OsloTemplate: React.FC<{ data: ResumeData; labels: any }> = ({ data, labels }) => (
    <div className="w-full h-full bg-white text-black p-[10mm] font-mono">
        <div className="border-4 border-black h-full flex flex-col">
            <div className="grid grid-cols-12 border-b-4 border-black min-h-[150px]">
                <div className="col-span-8 p-8 flex flex-col justify-center border-r-4 border-black">
                    <h1 className="text-6xl font-bold uppercase leading-[0.8] tracking-tighter mb-4">{data.fullName}</h1>
                    <p className="text-xl bg-black text-white inline-block px-2 py-1 self-start">{data.title}</p>
                </div>
                <div className="col-span-4 p-6 flex flex-col justify-between bg-[#f0f0f0]">
                   <div className="text-xs font-bold uppercase underline decoration-2">{labels.contact}</div>
                   <div className="flex flex-col gap-1 text-xs font-bold">
                        <p>{data.email}</p>
                        <p>{data.phone}</p>
                        <p>{data.location}</p>
                   </div>
                </div>
            </div>
            <div className="flex-1 grid grid-cols-12">
                <div className="col-span-4 border-r-4 border-black flex flex-col">
                     {data.education && (
                        <div className="p-6 border-b-4 border-black">
                            <div className="bg-black text-white px-2 py-1 inline-block text-xs font-bold mb-4 uppercase">{labels.education}</div>
                            <div className="space-y-4">
                                {data.education.map((edu, idx) => (
                                    <div key={idx} className="break-inside-avoid">
                                        <p className="font-bold leading-tight">{edu.institution}</p>
                                        <p className="text-xs mt-1">{edu.degree}</p>
                                        <p className="text-xs mt-1 text-gray-500">{edu.year}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                     )}
                     {data.skills && (
                        <div className="p-6 flex-1 bg-gray-50">
                             <div className="bg-black text-white px-2 py-1 inline-block text-xs font-bold mb-4 uppercase">{labels.skills}</div>
                             <div className="flex flex-col gap-2">
                                {data.skills.map((skill, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-black"></div>
                                        <span className="text-xs font-bold uppercase">{skill}</span>
                                    </div>
                                ))}
                             </div>
                        </div>
                     )}
                </div>
                <div className="col-span-8 flex flex-col">
                     {data.summary && (
                        <div className="p-8 border-b-4 border-black bg-[#ffff00]">
                             <p className="text-sm font-bold leading-6 uppercase">{data.summary}</p>
                        </div>
                     )}
                     <div className="p-8 flex-1">
                         <div className="mb-8 border-b-2 border-black pb-2 flex justify-between items-end">
                            <h3 className="text-3xl font-bold uppercase">{labels.experience}</h3>
                            <div className="text-[10px]">01 // WORK</div>
                         </div>
                         <div className="space-y-10">
                            {data.experience.map((job, idx) => (
                                <div key={idx} className="break-inside-avoid">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-xl font-bold bg-black text-white px-2 py-1 inline-block">{job.company}</h4>
                                        <span className="text-xs font-bold border border-black px-2 py-1">{job.duration}</span>
                                    </div>
                                    <p className="text-sm font-bold uppercase mb-3 underline decoration-2">{job.role}</p>
                                    <ul className="list-none space-y-2">
                                        {job.description.map((desc, i) => (
                                            <li key={i} className="text-sm font-medium pl-4 relative before:content-['■'] before:absolute before:left-0 before:text-[8px] before:top-[5px]">{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                         </div>

                         {data.projects && data.projects.length > 0 && (
                            <div className="mt-10">
                                <div className="mb-8 border-b-2 border-black pb-2 flex justify-between items-end">
                                    <h3 className="text-3xl font-bold uppercase">{labels.projects}</h3>
                                    <div className="text-[10px]">02 // PROJECTS</div>
                                </div>
                                <div className="space-y-8">
                                    {data.projects.map((proj, idx) => (
                                        <ProjectBlock key={idx} project={proj} classic={false} />
                                    ))}
                                </div>
                            </div>
                         )}
                     </div>
                </div>
            </div>
        </div>
    </div>
);

// 9. MILAN (Elegant Bento)
const MilanTemplate: React.FC<{ data: ResumeData; labels: any }> = ({ data, labels }) => (
    <div className="w-full h-full bg-[#FDFBF7] text-[#2C2C2C] p-[12mm] font-serif">
        <div className="grid grid-cols-2 gap-x-12 gap-y-8 h-full content-start">
            <div className="col-span-2 border-b border-[#D4D4D4] pb-8">
                <h1 className="text-5xl font-normal italic mb-2 font-serif">{data.fullName}</h1>
                <div className="flex justify-between items-end">
                    <p className="text-sm uppercase tracking-widest font-sans text-[#666]">{data.title}</p>
                    <div className="flex gap-6 text-xs font-sans text-[#666]">
                        {data.email && <span>{data.email}</span>}
                        {data.location && <span>{data.location}</span>}
                    </div>
                </div>
            </div>
            {data.summary && (
                <div className="col-span-2 bg-white p-8 shadow-sm">
                    <p className="text-lg leading-8 font-light text-[#444]">{data.summary}</p>
                </div>
            )}
            <div className="col-span-1 space-y-10">
                <h3 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#999] mb-6">{labels.experience}</h3>
                {data.experience.map((job, idx) => (
                    <div key={idx} className="break-inside-avoid">
                        <h4 className="text-xl font-medium mb-1">{job.company}</h4>
                        <div className="flex justify-between text-xs font-sans text-[#666] mb-4 border-b border-dotted border-[#ccc] pb-2">
                            <span>{job.role}</span>
                            <span>{job.duration}</span>
                        </div>
                        <ul className="space-y-2">
                            {job.description.map((desc, i) => (
                                <li key={i} className="text-sm leading-6 text-[#444] list-none">– {desc}</li>
                            ))}
                        </ul>
                    </div>
                ))}

                {data.projects && data.projects.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-[#E5E5E5]">
                        <h3 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#999] mb-6">{labels.projects}</h3>
                        {data.projects.map((proj, idx) => (
                            <ProjectBlock key={idx} project={proj} classic={true} />
                        ))}
                    </div>
                )}
            </div>
            <div className="col-span-1 space-y-12 border-l border-[#E5E5E5] pl-12">
                 {data.education && (
                    <div>
                        <h3 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#999] mb-6">{labels.education}</h3>
                        <div className="space-y-6">
                            {data.education.map((edu, idx) => (
                                <div key={idx} className="break-inside-avoid">
                                    <p className="font-medium text-lg">{edu.institution}</p>
                                    <p className="text-xs font-sans text-[#666] uppercase mt-1">{edu.degree}</p>
                                    <p className="text-xs font-sans text-[#999] mt-1">{edu.year}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {data.skills && (
                    <div>
                        <h3 className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#999] mb-6">{labels.skills}</h3>
                        <div className="flex flex-wrap gap-3">
                            {data.skills.map((skill, idx) => (
                                <span key={idx} className="text-sm italic text-[#444] border-b border-[#E5E5E5]">{skill}</span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
);

// 10. NYC (Bold Bento)
const NYCTemplate: React.FC<{ data: ResumeData; labels: any }> = ({ data, labels }) => (
    <div className="w-full h-full bg-white text-black p-[10mm] font-sans overflow-hidden">
        <div className="grid grid-cols-12 grid-rows-[auto_auto_1fr] gap-4 h-full">
            <div className="col-span-8 bg-black text-white p-8 flex flex-col justify-between min-h-[180px]">
                <p className="text-sm font-mono tracking-widest opacity-50">PORTFOLIO // {new Date().getFullYear()}</p>
                <h1 className="text-6xl font-black tracking-tighter uppercase leading-[0.9]">{data.fullName}</h1>
            </div>
            <div className="col-span-4 bg-[#FF3B30] p-8 flex flex-col justify-center items-center text-center">
                <p className="text-2xl font-bold text-white leading-tight uppercase">{data.title}</p>
            </div>
            <div className="col-span-12 bg-gray-100 p-4 flex justify-between items-center font-mono text-xs border-y-2 border-black">
                <div className="flex gap-6">
                     {data.email && <span>{data.email}</span>}
                     {data.phone && <span>{data.phone}</span>}
                </div>
                {data.location && <span>{data.location}</span>}
            </div>
            <div className="col-span-12 grid grid-cols-12 gap-4 h-full">
                <div className="col-span-8 flex flex-col gap-4">
                     {data.summary && (
                        <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <p className="font-bold text-lg leading-snug">{data.summary}</p>
                        </div>
                     )}
                     <div className="bg-white border-2 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex-1">
                        <h3 className="text-3xl font-black uppercase mb-8 decoration-4 underline decoration-[#FF3B30]">{labels.experience}</h3>
                        <div className="space-y-8">
                             {data.experience.map((job, idx) => (
                                <div key={idx} className="break-inside-avoid">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h4 className="text-xl font-black">{job.company}</h4>
                                        <span className="bg-black text-white text-[10px] px-2 py-0.5 font-mono">{job.duration}</span>
                                    </div>
                                    <p className="text-sm font-bold text-[#FF3B30] mb-2 uppercase">{job.role}</p>
                                    <ul className="space-y-1">
                                        {job.description.map((desc, i) => (
                                            <li key={i} className="text-sm font-medium">• {desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {data.projects && data.projects.length > 0 && (
                            <div className="mt-10 pt-6 border-t-2 border-black">
                                <h3 className="text-2xl font-black uppercase mb-6">{labels.projects}</h3>
                                <div className="space-y-6">
                                    {data.projects.map((proj, idx) => (
                                        <ProjectBlock key={idx} project={proj} classic={false} />
                                    ))}
                                </div>
                            </div>
                        )}
                     </div>
                </div>
                <div className="col-span-4 flex flex-col gap-4">
                    {data.skills && (
                        <div className="bg-black text-white p-6 shadow-[4px_4px_0px_0px_rgba(200,200,200,1)]">
                            <h3 className="font-mono text-xs text-[#FF3B30] mb-4 uppercase">{labels.skills}</h3>
                            <div className="flex flex-wrap gap-x-2 gap-y-1">
                                {data.skills.map((skill, idx) => (
                                    <span key={idx} className="text-sm font-bold hover:text-[#FF3B30] cursor-default transition-colors">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    {data.education && (
                        <div className="bg-gray-100 border-2 border-black p-6 flex-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                             <h3 className="font-black text-lg mb-4 uppercase">{labels.education}</h3>
                             <div className="space-y-4 divide-y divide-gray-300">
                                {data.education.map((edu, idx) => (
                                    <div key={idx} className="pt-2 first:pt-0 break-inside-avoid">
                                        <p className="font-bold text-sm">{edu.institution}</p>
                                        <p className="text-xs">{edu.degree}</p>
                                        <p className="text-xs font-mono text-gray-500">{edu.year}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);


// ==========================================
// GROUP 3: GRADIENT SERIES (Diffuse & Blur)
// ==========================================

// 11. AURORA (Ethereal Green/Purple)
const AuroraTemplate: React.FC<{ data: ResumeData; labels: any }> = ({ data, labels }) => (
    <div className="w-full h-full bg-slate-50 relative overflow-hidden p-[10mm] font-sans">
        {/* Background Blobs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-[600px] h-[600px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 h-full grid grid-cols-12 gap-6">
            <div className="col-span-12 bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">{data.fullName}</h1>
                    <p className="text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{data.title}</p>
                </div>
                <div className="text-right text-sm text-slate-600 font-medium space-y-1">
                    {data.email && <p>{data.email}</p>}
                    {data.phone && <p>{data.phone}</p>}
                    {data.location && <p>{data.location}</p>}
                </div>
            </div>

            <div className="col-span-8 space-y-6">
                {data.summary && (
                    <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-sm">
                        <p className="text-slate-700 leading-relaxed">{data.summary}</p>
                    </div>
                )}
                <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-sm h-full">
                    <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm mb-6">{labels.experience}</h3>
                    <div className="space-y-8">
                        {data.experience.map((job, idx) => (
                            <div key={idx} className="relative pl-6 border-l-2 border-purple-200 break-inside-avoid">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-100 border-4 border-white shadow-sm"></div>
                                <h4 className="text-lg font-bold text-slate-800">{job.company}</h4>
                                <div className="flex gap-3 text-xs mb-2 mt-1">
                                    <span className="font-bold text-purple-600">{job.role}</span>
                                    <span className="text-slate-400">•</span>
                                    <span className="text-slate-500">{job.duration}</span>
                                </div>
                                <ul className="space-y-2">
                                    {job.description.map((desc, i) => (
                                        <li key={i} className="text-sm text-slate-600 leading-relaxed">{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    {data.projects && data.projects.length > 0 && (
                        <div className="mt-10 pt-8 border-t border-purple-100">
                            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm mb-6">{labels.projects}</h3>
                            <div className="space-y-6">
                                {data.projects.map((proj, idx) => (
                                    <ProjectBlock key={idx} project={proj} classic={false} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="col-span-4 flex flex-col gap-6">
                {data.skills && (
                    <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-sm">
                        <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm mb-4">{labels.skills}</h3>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, idx) => (
                                <span key={idx} className="bg-white/80 text-purple-900 px-3 py-1 rounded-xl text-xs font-semibold shadow-sm border border-purple-50">{skill}</span>
                            ))}
                        </div>
                    </div>
                )}
                {data.education && (
                    <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-sm flex-1">
                        <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm mb-4">{labels.education}</h3>
                        <div className="space-y-4">
                            {data.education.map((edu, idx) => (
                                <div key={idx} className="break-inside-avoid">
                                    <p className="font-bold text-sm text-slate-800">{edu.institution}</p>
                                    <p className="text-xs text-purple-600 mt-0.5 font-medium">{edu.degree}</p>
                                    <p className="text-[10px] text-slate-400 mt-1">{edu.year}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
);

// 12. MIDNIGHT (Dark Space Gradient)
const MidnightTemplate: React.FC<{ data: ResumeData; labels: any }> = ({ data, labels }) => (
    <div className="w-full h-full bg-[#050511] text-white relative overflow-hidden p-[10mm] font-sans">
         {/* Space Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-900/40 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/30 rounded-full filter blur-[100px]"></div>
        
        <div className="relative z-10">
            <div className="text-center mb-16">
                <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                     <span className="text-xs font-medium tracking-[0.3em] text-blue-200 uppercase">{data.title}</span>
                </div>
                <h1 className="text-5xl font-light tracking-tight mb-4 font-display">{data.fullName}</h1>
                <div className="flex justify-center gap-6 text-xs text-blue-300/60 font-mono">
                     {data.email && <span>{data.email}</span>}
                     {data.phone && <span>{data.phone}</span>}
                     {data.location && <span>{data.location}</span>}
                </div>
            </div>

            <div className="grid grid-cols-12 gap-12">
                <div className="col-span-4 space-y-8">
                    {data.skills && (
                        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
                            <h3 className="text-xs font-bold text-blue-400 mb-4 uppercase tracking-widest">{labels.skills}</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, idx) => (
                                    <span key={idx} className="text-xs text-gray-300 border border-white/10 px-2 py-1 rounded-lg bg-black/20">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    {data.education && (
                        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
                            <h3 className="text-xs font-bold text-blue-400 mb-4 uppercase tracking-widest">{labels.education}</h3>
                            <div className="space-y-6">
                                {data.education.map((edu, idx) => (
                                    <div key={idx} className="break-inside-avoid">
                                        <p className="font-bold text-sm">{edu.institution}</p>
                                        <p className="text-xs text-gray-400 mt-1">{edu.degree}</p>
                                        <p className="text-[10px] text-blue-500 font-mono mt-1">{edu.year}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="col-span-8 space-y-10">
                    {data.summary && (
                        <p className="text-lg font-light leading-relaxed text-gray-300 border-l-2 border-blue-500/50 pl-6">{data.summary}</p>
                    )}

                    <div>
                        <h3 className="text-2xl font-light mb-8 flex items-center gap-4 text-blue-100">
                            <span className="w-8 h-[1px] bg-blue-500"></span>
                            {labels.experience}
                        </h3>
                        <div className="space-y-10">
                            {data.experience.map((job, idx) => (
                                <div key={idx} className="relative pl-8 break-inside-avoid">
                                    <div className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                                    <h4 className="text-xl font-medium text-white mb-1">{job.company}</h4>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm text-blue-300">{job.role}</span>
                                        <span className="text-xs font-mono text-white/30">{job.duration}</span>
                                    </div>
                                    <ul className="space-y-2">
                                        {job.description.map((desc, i) => (
                                            <li key={i} className="text-sm text-gray-400 font-light leading-relaxed">{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {data.projects && data.projects.length > 0 && (
                        <div className="pt-8 border-t border-white/5">
                            <h3 className="text-2xl font-light mb-8 flex items-center gap-4 text-blue-100">
                                <span className="w-8 h-[1px] bg-indigo-500"></span>
                                {labels.projects}
                            </h3>
                            <div className="space-y-8">
                                {data.projects.map((proj, idx) => (
                                    <ProjectBlock key={idx} project={proj} classic={false} darkMode={true} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);

// 13. SUNRISE (Warm Gradient Sidebar)
const SunriseTemplate: React.FC<{ data: ResumeData; labels: any }> = ({ data, labels }) => (
    <div className="w-full h-full bg-white flex font-sans">
        <div className="w-[35%] bg-gradient-to-b from-[#FF9A9E] via-[#FECFEF] to-[#F6F9FC] p-8 pt-12 relative">
             <div className="relative z-10">
                <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-2 font-serif">{data.fullName}</h1>
                <p className="text-slate-800 font-medium mb-8 opacity-70">{data.title}</p>

                <div className="space-y-4 mb-12">
                    {data.email && <p className="text-sm text-slate-700 font-medium flex items-center gap-2"><Mail size={12} /> {data.email}</p>}
                    {data.phone && <p className="text-sm text-slate-700 font-medium flex items-center gap-2"><Phone size={12} /> {data.phone}</p>}
                    {data.location && <p className="text-sm text-slate-700 font-medium flex items-center gap-2"><MapPin size={12} /> {data.location}</p>}
                </div>

                <div className="space-y-8">
                    {data.skills && (
                        <div>
                            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-3 opacity-50">{labels.skills}</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, idx) => (
                                    <span key={idx} className="bg-white/40 px-2 py-1 rounded-md text-xs font-bold text-slate-800">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    {data.education && (
                        <div>
                            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-3 opacity-50">{labels.education}</h3>
                            <div className="space-y-4">
                                {data.education.map((edu, idx) => (
                                    <div key={idx} className="break-inside-avoid">
                                        <p className="font-bold text-sm text-slate-900">{edu.institution}</p>
                                        <p className="text-xs text-slate-700">{edu.degree}</p>
                                        <p className="text-[10px] text-slate-500 mt-1">{edu.year}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
             </div>
        </div>
        
        <div className="flex-1 p-12 bg-white">
            {data.summary && (
                <div className="mb-12">
                     <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">{labels.summary}</h3>
                     <p className="text-slate-600 leading-7">{data.summary}</p>
                </div>
            )}

            <div className="mb-12">
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-8">{labels.experience}</h3>
                <div className="space-y-10">
                    {data.experience.map((job, idx) => (
                        <div key={idx} className="break-inside-avoid">
                            <div className="flex justify-between items-baseline mb-2">
                                <h4 className="text-lg font-bold text-slate-800">{job.company}</h4>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{job.duration}</span>
                            </div>
                            <p className="text-sm font-medium text-[#FF9A9E] mb-3 uppercase tracking-wide">{job.role}</p>
                            <ul className="space-y-2">
                                {job.description.map((desc, i) => (
                                    <li key={i} className="text-sm text-slate-600 pl-4 border-l-2 border-orange-100">{desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {data.projects && data.projects.length > 0 && (
                <div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900 mb-8">{labels.projects}</h3>
                    <div className="space-y-8">
                        {data.projects.map((proj, idx) => (
                            <div key={idx} className="break-inside-avoid">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="text-md font-bold text-slate-800">{proj.name}</h4>
                                    <span className="text-xs text-slate-400">{proj.duration}</span>
                                </div>
                                <p className="text-sm italic text-slate-500 mb-2">{proj.role}</p>
                                <ul className="space-y-1">
                                    {proj.description.map((desc, i) => (
                                        <li key={i} className="text-sm text-slate-600">- {desc}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
);

// 14. AZURE (Liquid Blue Shapes)
const AzureTemplate: React.FC<{ data: ResumeData; labels: any }> = ({ data, labels }) => (
    <div className="w-full h-full bg-slate-50 relative overflow-hidden p-[10mm] font-sans">
        {/* Organic Shapes */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-400/20 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] filter blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] filter blur-3xl"></div>

        <div className="relative z-10 h-full flex flex-col">
            <div className="flex justify-between items-end border-b-2 border-cyan-500/20 pb-8 mb-10">
                <div>
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">{data.fullName}</h1>
                    <p className="text-cyan-600 font-medium text-lg">{data.title}</p>
                </div>
                <div className="text-right text-sm text-slate-500 font-medium space-y-1">
                     {data.email && <p>{data.email}</p>}
                     {data.location && <p>{data.location}</p>}
                     {data.phone && <p>{data.phone}</p>}
                </div>
            </div>

            <div className="grid grid-cols-12 gap-10 flex-1">
                <div className="col-span-8 pr-6">
                    {data.summary && (
                        <div className="mb-10">
                            <h3 className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-4">{labels.summary}</h3>
                            <p className="text-slate-700 leading-7">{data.summary}</p>
                        </div>
                    )}
                    
                    <div className="mb-10">
                        <h3 className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-6">{labels.experience}</h3>
                        <div className="space-y-10">
                            {data.experience.map((job, idx) => (
                                <div key={idx} className="break-inside-avoid">
                                    <h4 className="text-xl font-bold text-slate-800">{job.company}</h4>
                                    <div className="flex items-center gap-2 mb-3 mt-1">
                                        <span className="text-sm font-medium text-slate-500">{job.role}</span>
                                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                        <span className="text-xs font-mono text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded">{job.duration}</span>
                                    </div>
                                    <ul className="space-y-2">
                                        {job.description.map((desc, i) => (
                                            <li key={i} className="text-sm text-slate-600 leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-cyan-300">{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {data.projects && data.projects.length > 0 && (
                        <div>
                            <h3 className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-6">{labels.projects}</h3>
                            <div className="space-y-8">
                                {data.projects.map((proj, idx) => (
                                    <div key={idx} className="break-inside-avoid">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="text-lg font-bold text-slate-800">{proj.name}</h4>
                                            <span className="text-xs text-slate-400">{proj.duration}</span>
                                        </div>
                                        <p className="text-sm text-slate-500 mb-2">{proj.role}</p>
                                        <ul className="space-y-1">
                                            {proj.description.map((desc, i) => (
                                                <li key={i} className="text-sm text-slate-600 pl-3 border-l border-cyan-100">{desc}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="col-span-4 border-l border-slate-200 pl-8 space-y-10">
                    {data.skills && (
                        <div>
                            <h3 className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-4">{labels.skills}</h3>
                            <div className="flex flex-col gap-2">
                                {data.skills.map((skill, idx) => (
                                    <span key={idx} className="text-sm font-medium text-slate-600 bg-white px-3 py-2 rounded shadow-sm border border-slate-100">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    {data.education && (
                        <div>
                            <h3 className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-4">{labels.education}</h3>
                            <div className="space-y-6">
                                {data.education.map((edu, idx) => (
                                    <div key={idx} className="break-inside-avoid">
                                        <p className="font-bold text-sm text-slate-800">{edu.institution}</p>
                                        <p className="text-xs text-slate-500">{edu.degree}</p>
                                        <p className="text-[10px] text-slate-400 mt-1">{edu.year}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);

// 15. BLOOM (Soft Radial Glow)
const BloomTemplate: React.FC<{ data: ResumeData; labels: any }> = ({ data, labels }) => (
    <div className="w-full h-full bg-[#FFFCF9] relative overflow-hidden p-[12mm] font-sans">
        {/* Central Glow */}
        <div className="absolute top-[30%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FFD1C1] rounded-full filter blur-[120px] opacity-40"></div>
        
        <div className="relative z-10 text-center mb-16">
            <h1 className="text-5xl font-normal font-display text-[#4A4A4A] mb-3">{data.fullName}</h1>
            <p className="text-sm font-bold tracking-[0.3em] uppercase text-[#9C6666] mb-6">{data.title}</p>
            <div className="flex justify-center gap-8 text-xs font-medium text-[#7A7A7A]">
                {data.email && <span>{data.email}</span>}
                {data.phone && <span>{data.phone}</span>}
                {data.location && <span>{data.location}</span>}
            </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-16">
            <div className="col-span-2 max-w-2xl mx-auto text-center mb-8">
                {data.summary && (
                    <p className="text-[#5C5C5C] leading-8 italic font-serif text-lg">{data.summary}</p>
                )}
            </div>

            <div className="col-span-1 space-y-12 text-right border-r border-[#E6D5D5] pr-12">
                <div>
                    <h3 className="font-display text-2xl text-[#4A4A4A] mb-6">{labels.experience}</h3>
                    <div className="space-y-10">
                        {data.experience.map((job, idx) => (
                            <div key={idx} className="break-inside-avoid">
                                <h4 className="font-bold text-[#4A4A4A] text-lg">{job.company}</h4>
                                <p className="text-xs text-[#9C6666] font-bold uppercase mb-2 mt-1">{job.role}</p>
                                <p className="text-[10px] text-[#888] font-mono mb-3">{job.duration}</p>
                                <ul className="space-y-1">
                                    {job.description.map((desc, i) => (
                                        <li key={i} className="text-sm text-[#5C5C5C] leading-relaxed">{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {data.projects && data.projects.length > 0 && (
                     <div>
                        <h3 className="font-display text-2xl text-[#4A4A4A] mb-6">{labels.projects}</h3>
                        <div className="space-y-8">
                            {data.projects.map((proj, idx) => (
                                <div key={idx} className="break-inside-avoid">
                                    <h4 className="font-bold text-[#4A4A4A]">{proj.name}</h4>
                                    <p className="text-[10px] text-[#9C6666] font-mono mb-2">{proj.duration}</p>
                                    <p className="text-sm text-[#5C5C5C] italic mb-1">{proj.role}</p>
                                    <ul className="space-y-1">
                                        {proj.description.map((desc, i) => (
                                            <li key={i} className="text-sm text-[#5C5C5C]">{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="col-span-1 space-y-12 pl-4">
                {data.skills && (
                    <div>
                        <h3 className="font-display text-2xl text-[#4A4A4A] mb-6">{labels.skills}</h3>
                        <div className="flex flex-wrap gap-3">
                            {data.skills.map((skill, idx) => (
                                <span key={idx} className="text-sm text-[#5C5C5C] border-b border-[#E6D5D5] pb-1">{skill}</span>
                            ))}
                        </div>
                    </div>
                )}
                {data.education && (
                    <div>
                        <h3 className="font-display text-2xl text-[#4A4A4A] mb-6">{labels.education}</h3>
                        <div className="space-y-6">
                            {data.education.map((edu, idx) => (
                                <div key={idx} className="break-inside-avoid">
                                    <p className="font-bold text-[#4A4A4A]">{edu.institution}</p>
                                    <p className="text-sm text-[#7A7A7A] italic">{edu.degree}</p>
                                    <p className="text-xs text-[#9C6666] mt-1">{edu.year}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
);

// --- MAIN COMPONENT ---
export const ResumeDesign = React.forwardRef<HTMLDivElement, ResumeDesignProps>(({ data, template, language }, ref) => {
    const currentLabels = LABELS[language];

    const renderTemplate = () => {
        switch (template) {
            // Classic
            case 'standard': return <StandardTemplate data={data} labels={currentLabels} />;
            case 'minimal': return <MinimalTemplate data={data} labels={currentLabels} />;
            case 'modern': return <ModernTemplate data={data} labels={currentLabels} />;
            case 'executive': return <ExecutiveTemplate data={data} labels={currentLabels} />;
            case 'bold': return <BoldTemplate data={data} labels={currentLabels} />;
            // Bento
            case 'rio': return <RioTemplate data={data} labels={currentLabels} />;
            case 'tokyo': return <TokyoTemplate data={data} labels={currentLabels} />;
            case 'oslo': return <OsloTemplate data={data} labels={currentLabels} />;
            case 'milan': return <MilanTemplate data={data} labels={currentLabels} />;
            case 'nyc': return <NYCTemplate data={data} labels={currentLabels} />;
            // Gradient
            case 'aurora': return <AuroraTemplate data={data} labels={currentLabels} />;
            case 'midnight': return <MidnightTemplate data={data} labels={currentLabels} />;
            case 'sunrise': return <SunriseTemplate data={data} labels={currentLabels} />;
            case 'azure': return <AzureTemplate data={data} labels={currentLabels} />;
            case 'bloom': return <BloomTemplate data={data} labels={currentLabels} />;
            default: return <RioTemplate data={data} labels={currentLabels} />;
        }
    };

    return (
        <div 
            ref={ref}
            className="w-[210mm] min-h-[297mm] bg-white shadow-2xl mx-auto print:shadow-none print:mx-0 print:w-full overflow-hidden print:overflow-visible transition-all duration-500"
            style={{ pageBreakAfter: 'always' }}
        >
            {renderTemplate()}
        </div>
    );
});

ResumeDesign.displayName = 'ResumeDesign';