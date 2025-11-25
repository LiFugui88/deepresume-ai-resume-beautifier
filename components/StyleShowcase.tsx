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
                    {/* Before State - Abstract Representation */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gray-100 rounded-3xl transform -rotate-2 opacity-50 group-hover:rotate-0 transition-transform duration-500" />
                        <div className="relative bg-white border border-gray-200 shadow-sm rounded-xl p-8 h-[500px] flex flex-col gap-4 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="absolute top-4 right-4 bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                {t.before}
                            </div>
                            {/* Skeleton Content */}
                            <div className="w-1/3 h-8 bg-gray-200 rounded mb-4" />
                            <div className="space-y-2">
                                <div className="w-full h-3 bg-gray-100 rounded" />
                                <div className="w-full h-3 bg-gray-100 rounded" />
                                <div className="w-3/4 h-3 bg-gray-100 rounded" />
                            </div>
                            <div className="h-px bg-gray-100 my-2" />
                            <div className="w-1/4 h-6 bg-gray-200 rounded mb-2" />
                            <div className="space-y-2">
                                <div className="w-full h-3 bg-gray-100 rounded" />
                                <div className="w-full h-3 bg-gray-100 rounded" />
                                <div className="w-5/6 h-3 bg-gray-100 rounded" />
                            </div>
                            <div className="h-px bg-gray-100 my-2" />
                            <div className="w-1/4 h-6 bg-gray-200 rounded mb-2" />
                            <div className="space-y-2">
                                <div className="w-full h-3 bg-gray-100 rounded" />
                                <div className="w-full h-3 bg-gray-100 rounded" />
                                <div className="w-5/6 h-3 bg-gray-100 rounded" />
                            </div>
                        </div>
                    </div>

                    {/* After State - Bento Representation */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl transform rotate-2 opacity-50 group-hover:rotate-0 transition-transform duration-500" />
                        <div className="relative bg-white border border-blue-100 shadow-xl shadow-blue-900/5 rounded-2xl p-6 h-[550px] flex flex-col gap-4 transform scale-105 z-10">
                            <div className="absolute top-4 right-4 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                {t.after}
                            </div>

                            {/* Header Block */}
                            <div className="bg-slate-900 rounded-xl p-6 text-white mb-2">
                                <div className="w-1/2 h-8 bg-white/20 rounded mb-2" />
                                <div className="w-1/3 h-4 bg-white/10 rounded" />
                            </div>

                            <div className="grid grid-cols-2 gap-4 flex-1">
                                {/* Left Col */}
                                <div className="space-y-4">
                                    <div className="bg-blue-50 p-4 rounded-xl h-32 border border-blue-100">
                                        <div className="w-1/2 h-4 bg-blue-200 rounded mb-2" />
                                        <div className="space-y-2">
                                            <div className="w-full h-2 bg-blue-100 rounded" />
                                            <div className="w-full h-2 bg-blue-100 rounded" />
                                        </div>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-xl h-full border border-purple-100">
                                        <div className="w-1/2 h-4 bg-purple-200 rounded mb-2" />
                                        <div className="space-y-2">
                                            <div className="w-full h-2 bg-purple-100 rounded" />
                                            <div className="w-full h-2 bg-purple-100 rounded" />
                                            <div className="w-3/4 h-2 bg-purple-100 rounded" />
                                        </div>
                                    </div>
                                </div>
                                {/* Right Col */}
                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-4 rounded-xl h-full border border-gray-100">
                                        <div className="w-1/2 h-4 bg-gray-200 rounded mb-2" />
                                        <div className="space-y-2">
                                            <div className="w-full h-2 bg-gray-100 rounded" />
                                            <div className="w-full h-2 bg-gray-100 rounded" />
                                            <div className="w-full h-2 bg-gray-100 rounded" />
                                            <div className="w-5/6 h-2 bg-gray-100 rounded" />
                                        </div>
                                    </div>
                                    <div className="bg-amber-50 p-4 rounded-xl h-24 border border-amber-100 flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full bg-amber-200" />
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
