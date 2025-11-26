import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface StyleTemplate {
    id: string;
    name: string;
    nameEn: string;
    color: string;
    gradient: string;
    preview: JSX.Element;
}

export const StyleCarousel: React.FC<{ language: 'en' | 'zh' }> = ({ language }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);

    const t = {
        en: {
            title: "Premium Resume Styles",
            subtitle: "Swipe to explore our professionally designed templates",
            viewAll: "View All Styles"
        },
        zh: {
            title: "高级简历风格展示",
            subtitle: "滑动查看我们的专业设计模板",
            viewAll: "查看所有风格"
        }
    }[language];

    const templates: StyleTemplate[] = [
        {
            id: 'bento',
            name: 'Bento 网格风格',
            nameEn: 'Bento Grid',
            color: 'from-blue-500 to-purple-600',
            gradient: 'bg-gradient-to-br from-blue-50 to-purple-50',
            preview: (
                <div className="w-full h-full bg-white rounded-xl p-6 shadow-2xl font-sans overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-5 text-white mb-4">
                        <h3 className="font-bold text-xl mb-1">Alex Morgan</h3>
                        <p className="text-sm text-blue-100">产品设计师</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 h-[calc(100%-100px)]">
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                            <h4 className="text-xs font-bold text-blue-900 mb-2">关于我</h4>
                            <div className="space-y-1">
                                <div className="h-2 bg-blue-200 rounded w-full"></div>
                                <div className="h-2 bg-blue-200 rounded w-4/5"></div>
                            </div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                            <h4 className="text-xs font-bold text-purple-900 mb-2">技能</h4>
                            <div className="flex flex-wrap gap-1">
                                {['Figma', 'React', 'UI/UX'].map(s => (
                                    <span key={s} className="bg-white text-[8px] px-2 py-0.5 rounded border border-purple-200">{s}</span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 border border-green-100 col-span-2">
                            <h4 className="text-xs font-bold text-green-900 mb-2">工作经历</h4>
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px]">
                                    <span className="font-semibold">高级设计师</span>
                                    <span className="text-green-600">2021-至今</span>
                                </div>
                                <div className="h-1.5 bg-green-200 rounded w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'minimal',
            name: '极简风格',
            nameEn: 'Minimal',
            color: 'from-gray-700 to-gray-900',
            gradient: 'bg-gradient-to-br from-gray-50 to-slate-50',
            preview: (
                <div className="w-full h-full bg-white rounded-xl p-8 shadow-2xl font-sans overflow-hidden">
                    <div className="border-b-2 border-gray-900 pb-4 mb-6">
                        <h3 className="font-bold text-2xl text-gray-900 mb-1">Alex Morgan</h3>
                        <p className="text-sm text-gray-600">产品设计师 / UI/UX 专家</p>
                    </div>
                    <div className="space-y-5">
                        <div>
                            <h4 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">工作经历</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="font-semibold text-sm">高级设计师</span>
                                    <span className="text-xs text-gray-500">2021-至今</span>
                                </div>
                                <p className="text-xs text-gray-600">TechFlow Inc.</p>
                                <div className="h-px bg-gray-200 my-2"></div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">技能</h4>
                            <div className="space-y-1">
                                <div className="h-1.5 bg-gray-900 rounded w-full"></div>
                                <div className="h-1.5 bg-gray-900 rounded w-4/5"></div>
                                <div className="h-1.5 bg-gray-900 rounded w-3/5"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'creative',
            name: '创意配色',
            nameEn: 'Creative',
            color: 'from-orange-400 to-pink-600',
            gradient: 'bg-gradient-to-br from-orange-50 to-pink-50',
            preview: (
                <div className="w-full h-full bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl p-6 shadow-2xl font-sans overflow-hidden">
                    <div className="bg-white rounded-xl p-5 mb-4 shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-pink-500"></div>
                            <div>
                                <h3 className="font-bold text-lg">Alex Morgan</h3>
                                <p className="text-xs text-gray-600">创意设计师</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <h4 className="text-xs font-bold text-orange-600 mb-2">关于我</h4>
                            <div className="space-y-1">
                                <div className="h-2 bg-gradient-to-r from-orange-200 to-pink-200 rounded w-full"></div>
                                <div className="h-2 bg-gradient-to-r from-orange-200 to-pink-200 rounded w-3/4"></div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <h4 className="text-xs font-bold text-pink-600 mb-2">技能标签</h4>
                            <div className="flex flex-wrap gap-1.5">
                                {['创意', '设计', '艺术'].map(s => (
                                    <span key={s} className="bg-gradient-to-r from-orange-400 to-pink-500 text-white text-[9px] px-2.5 py-1 rounded-full">{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'professional',
            name: '商务专业',
            nameEn: 'Professional',
            color: 'from-blue-600 to-indigo-700',
            gradient: 'bg-gradient-to-br from-blue-50 to-indigo-50',
            preview: (
                <div className="w-full h-full bg-white rounded-xl shadow-2xl font-sans overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                        <h3 className="font-bold text-xl mb-1">Alex Morgan</h3>
                        <p className="text-sm text-blue-100">商务分析师</p>
                        <p className="text-xs text-blue-200 mt-2">alex@example.com</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="border-l-4 border-blue-600 pl-4">
                            <h4 className="text-xs font-bold text-gray-900 mb-2">专业摘要</h4>
                            <div className="space-y-1">
                                <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                                <div className="h-1.5 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                        <div className="border-l-4 border-indigo-600 pl-4">
                            <h4 className="text-xs font-bold text-gray-900 mb-2">工作经历</h4>
                            <div className="flex justify-between text-[10px] mb-1">
                                <span className="font-semibold">高级分析师</span>
                                <span className="text-gray-500">2020-至今</span>
                            </div>
                            <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'modern',
            name: '现代简约',
            nameEn: 'Modern',
            color: 'from-teal-500 to-cyan-600',
            gradient: 'bg-gradient-to-br from-teal-50 to-cyan-50',
            preview: (
                <div className="w-full h-full bg-white rounded-xl p-6 shadow-2xl font-sans overflow-hidden">
                    <div className="flex items-start justify-between mb-5">
                        <div>
                            <h3 className="font-bold text-2xl text-gray-900">Alex Morgan</h3>
                            <p className="text-sm text-teal-600 font-medium">前端开发工程师</p>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500"></div>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4">
                            <h4 className="text-xs font-bold text-teal-700 mb-2 flex items-center gap-1">
                                <Sparkles size={12} />
                                核心技能
                            </h4>
                            <div className="grid grid-cols-3 gap-1.5">
                                {['React', 'Vue', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js'].map(s => (
                                    <div key={s} className="bg-white text-[8px] px-2 py-1 rounded text-center shadow-sm border border-teal-100">{s}</div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-xs font-bold text-gray-900">项目经验</h4>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <div className="flex justify-between text-[10px] mb-1">
                                    <span className="font-semibold text-gray-900">电商平台开发</span>
                                    <span className="text-teal-600">2023</span>
                                </div>
                                <div className="h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % templates.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + templates.length) % templates.length);
    };

    // Auto-play carousel
    useEffect(() => {
        if (!isDragging) {
            const interval = setInterval(nextSlide, 5000);
            return () => clearInterval(interval);
        }
    }, [isDragging, currentIndex]);

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
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
                    <div className="relative h-[500px] md:h-[600px] mb-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                exit={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="w-full max-w-md md:max-w-lg lg:max-w-xl h-full px-4">
                                    {/* Template Card */}
                                    <div className="relative h-full">
                                        {/* Gradient background */}
                                        <div className={`absolute -inset-4 bg-gradient-to-r ${templates[currentIndex].color} opacity-20 rounded-3xl blur-xl`}></div>

                                        {/* Template Name Badge */}
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                                            <div className={`bg-gradient-to-r ${templates[currentIndex].color} text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-2`}>
                                                <Sparkles size={16} />
                                                <span className="font-bold text-sm">
                                                    {language === 'zh' ? templates[currentIndex].name : templates[currentIndex].nameEn}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Template Preview */}
                                        <div className="relative h-full mt-4">
                                            {templates[currentIndex].preview}
                                        </div>
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
                    <div className="flex justify-center gap-3 flex-wrap px-4">
                        {templates.map((template, idx) => (
                            <button
                                key={template.id}
                                onClick={() => setCurrentIndex(idx)}
                                className={`relative group transition-all duration-300 ${
                                    idx === currentIndex
                                        ? 'scale-110'
                                        : 'scale-100 hover:scale-105 opacity-60 hover:opacity-100'
                                }`}
                            >
                                <div className={`w-20 h-24 md:w-24 md:h-28 rounded-lg border-2 transition-all ${
                                    idx === currentIndex
                                        ? `border-transparent shadow-xl bg-gradient-to-r ${template.color}`
                                        : 'border-gray-200 bg-white shadow-sm'
                                }`}>
                                    <div className={`w-full h-full rounded-md overflow-hidden ${
                                        idx === currentIndex ? 'p-0.5' : ''
                                    }`}>
                                        <div className="w-full h-full bg-white rounded-md overflow-hidden scale-[0.35] origin-top-left transform">
                                            {template.preview}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                    <span className={`text-xs font-medium transition-all ${
                                        idx === currentIndex
                                            ? 'text-gray-900 font-bold'
                                            : 'text-gray-500'
                                    }`}>
                                        {language === 'zh' ? template.name : template.nameEn}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Progress Indicators */}
                    <div className="flex justify-center gap-2 mt-16">
                        {templates.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className="relative"
                            >
                                <div className={`h-1.5 rounded-full transition-all duration-300 ${
                                    idx === currentIndex
                                        ? 'w-12 bg-gradient-to-r from-blue-500 to-purple-600'
                                        : 'w-6 bg-gray-300 hover:bg-gray-400'
                                }`}></div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
