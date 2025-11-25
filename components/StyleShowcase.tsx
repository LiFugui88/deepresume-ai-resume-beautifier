import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const StyleShowcase: React.FC<{ language: 'en' | 'zh' }> = ({ language }) => {
    const t = {
        en: {
            title: "Transform Your Resume into a Masterpiece",
            subtitle: "See the difference DeepResume makes. From cluttered to clear, from basic to beautiful.",
            before: "Traditional Resume",
            after: "DeepResume Bento Style",
            features: [
                "Professional Typography",
                "Grid-based Layouts",
                "ATS Friendly Structure",
                "Modern Color Palettes"
            ]
        },
        zh: {
            title: "将简历转化为艺术品",
            subtitle: "体验 DeepResume 的蜕变之力。从杂乱到清晰，从平庸到惊艳。",
            before: "传统简历",
            after: "DeepResume Bento 风格",
            features: [
                "专业排版设计",
                "网格化布局系统",
                "ATS 友好结构",
                "现代配色方案"
            ]
        }
    }[language];

    return (
        <section className="py-24 px-4 bg-white relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-ink">
                        {t.title}
                    </h2>
                    <p className="text-ink-light text-lg max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Before State - Traditional Resume */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gray-100 rounded-3xl transform -rotate-2 opacity-50 group-hover:rotate-0 transition-transform duration-500" />
                        <div className="relative bg-white border border-gray-200 shadow-sm rounded-xl p-8 h-[550px] flex flex-col gap-6 opacity-80 grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden text-xs font-serif leading-relaxed">
                            <div className="absolute top-4 right-4 bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-sans">
                                {t.before}
                            </div>

                            {/* Header */}
                            <div className="border-b border-gray-300 pb-4 text-center">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Alex Morgan</h3>
                                <p className="text-gray-600">Product Designer</p>
                                <p className="text-gray-500 mt-1 scale-90">alex@example.com • (555) 123-4567 • New York, NY</p>
                            </div>

                            {/* Content */}
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold text-gray-800 border-b border-gray-200 mb-2 uppercase tracking-wide text-[10px]">Professional Summary</h4>
                                    <p className="text-gray-600 text-[10px]">Creative and detail-oriented Product Designer with 5+ years of experience in building user-centric digital products. Proficient in UI/UX design, prototyping, and design systems.</p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-800 border-b border-gray-200 mb-2 uppercase tracking-wide text-[10px]">Experience</h4>
                                    <div className="mb-2">
                                        <div className="flex justify-between font-bold text-gray-700 text-[10px]">
                                            <span>Senior Designer</span>
                                            <span>2021 - Present</span>
                                        </div>
                                        <p className="italic text-gray-500 text-[10px]">TechFlow Inc.</p>
                                        <ul className="list-disc list-inside text-gray-600 mt-1 pl-1 space-y-0.5 text-[9px]">
                                            <li>Led redesign of core mobile app increasing engagement by 40%.</li>
                                            <li>Managed a team of 3 junior designers.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-800 border-b border-gray-200 mb-2 uppercase tracking-wide text-[10px]">Education</h4>
                                    <div className="flex justify-between text-[10px]">
                                        <span className="font-bold text-gray-700">BFA Interaction Design</span>
                                        <span className="text-gray-500">2017 - 2021</span>
                                    </div>
                                    <p className="text-gray-600 text-[10px]">Parsons School of Design</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* After State - Bento Representation */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl transform rotate-2 opacity-50 group-hover:rotate-0 transition-transform duration-500" />
                        <div className="relative bg-white border border-blue-100 shadow-xl shadow-blue-900/5 rounded-2xl p-6 h-[550px] flex flex-col gap-4 transform scale-105 z-10 overflow-hidden font-sans">
                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider z-20 border border-white/10 shadow-sm">
                                {t.after}
                            </div>

                            {/* Header Block */}
                            <div className="bg-slate-900 rounded-xl p-6 text-white mb-2 shrink-0 flex flex-col justify-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
                                <h3 className="font-display text-2xl font-bold mb-1 relative z-10">Alex Morgan</h3>
                                <p className="text-blue-200 text-xs font-medium tracking-wide uppercase relative z-10">Product Designer</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
                                {/* Left Col */}
                                <div className="flex flex-col gap-4 h-full">
                                    {/* Summary */}
                                    <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 shrink-0 flex flex-col justify-center">
                                        <h4 className="text-blue-900 font-bold text-xs mb-2 uppercase tracking-wider">About</h4>
                                        <p className="text-blue-800/80 text-[10px] leading-relaxed">
                                            Creative designer with 5+ years building user-centric digital products. Expert in UI/UX & systems.
                                        </p>
                                    </div>
                                    {/* Experience */}
                                    <div className="bg-purple-50 p-5 rounded-xl flex-1 border border-purple-100 min-h-0 flex flex-col">
                                        <h4 className="text-purple-900 font-bold text-xs mb-3 uppercase tracking-wider">Experience</h4>
                                        <div className="space-y-3 overflow-hidden">
                                            <div>
                                                <div className="flex justify-between items-baseline mb-0.5">
                                                    <span className="font-bold text-purple-900 text-[11px]">Senior Designer</span>
                                                    <span className="text-[9px] text-purple-400 font-mono">2021-Now</span>
                                                </div>
                                                <p className="text-[9px] text-purple-700 mb-1">TechFlow Inc.</p>
                                                <p className="text-[9px] text-purple-600/80 leading-snug">• Increased engagement by 40%</p>
                                                <p className="text-[9px] text-purple-600/80 leading-snug">• Led design team of 3</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Right Col */}
                                <div className="flex flex-col gap-4 h-full">
                                    {/* Skills */}
                                    <div className="bg-gray-50 p-5 rounded-xl flex-1 border border-gray-100 min-h-0 flex flex-col">
                                        <h4 className="text-gray-900 font-bold text-xs mb-3 uppercase tracking-wider">Skills</h4>
                                        <div className="flex flex-wrap gap-1.5 content-start">
                                            {['Figma', 'React', 'UI/UX', 'Prototyping', 'Design Systems', 'User Research'].map(skill => (
                                                <span key={skill} className="bg-white border border-gray-200 px-2 py-1 rounded-md text-[9px] font-medium text-gray-600 shadow-sm">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Contact/Education */}
                                    <div className="bg-amber-50 p-4 rounded-xl h-24 border border-amber-100 flex flex-col justify-center shrink-0 relative overflow-hidden">
                                        <div className="absolute -right-2 -bottom-2 w-12 h-12 bg-amber-200/50 rounded-full blur-xl" />
                                        <div className="relative z-10">
                                            <p className="text-[10px] font-bold text-amber-900">BFA Design</p>
                                            <p className="text-[9px] text-amber-800/70">Parsons School</p>
                                            <div className="mt-2 h-px bg-amber-200/50 w-full" />
                                            <p className="text-[9px] text-amber-800/70 mt-2">alex@example.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features List */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {t.features.map((feature, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                <CheckCircle2 size={20} />
                            </div>
                            <span className="font-bold text-ink text-sm">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
