import React from 'react';
import { FileText, Wand2, Download, Lightbulb, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

export const SEOContent: React.FC<{ language: 'en' | 'zh' }> = ({ language }) => {
    const t = {
        en: {
            guide: {
                title: "How It Works",
                subtitle: "Create your professional resume in 3 simple steps",
                steps: [
                    {
                        title: "Upload or Enter",
                        desc: "Upload your existing PDF resume or manually enter your details into our structured form.",
                        icon: FileText
                    },
                    {
                        title: "AI Optimization",
                        desc: "Our Gemini AI analyzes your content, improving structure and phrasing for maximum impact.",
                        icon: Wand2
                    },
                    {
                        title: "Style & Download",
                        desc: "Choose from our premium Bento-style templates and download your new resume as a PDF.",
                        icon: Download
                    }
                ]
            },
            tips: {
                title: "Resume Tips for Success",
                subtitle: "Expert advice to help you land your dream job",
                items: [
                    {
                        title: "Keep it Concise",
                        desc: "Recruiters spend only 6 seconds scanning a resume. Keep yours under 2 pages and focus on recent, relevant experience."
                    },
                    {
                        title: "Quantify Achievements",
                        desc: "Use numbers to prove your value. Instead of 'Managed sales', say 'Increased sales by 20% in Q3'."
                    },
                    {
                        title: "Tailor to the Job",
                        desc: "Customize your resume for each application. Use keywords from the job description to pass ATS scans."
                    },
                    {
                        title: "Use Active Verbs",
                        desc: "Start bullet points with strong action verbs like 'Led', 'Developed', 'Created', rather than passive language."
                    }
                ]
            },
            faq: {
                title: "Frequently Asked Questions",
                items: [
                    {
                        q: "Is DeepResume really free?",
                        a: "Yes! You can generate and download standard resumes for free. We also offer a Pro plan for exclusive templates and advanced features."
                    },
                    {
                        q: "Is my data safe?",
                        a: "Absolutely. We do not store your personal data permanently. Your resume is processed securely and you have full control."
                    },
                    {
                        q: "What is a Bento-style resume?",
                        a: "Bento style is a modern design trend inspired by bento boxes, organizing content into distinct, grid-based modules for better readability and visual appeal."
                    },
                    {
                        q: "Can I edit my resume after generating it?",
                        a: "Yes, you can switch templates, adjust colors, and re-upload or edit your data at any time during the session."
                    }
                ]
            }
        },
        zh: {
            guide: {
                title: "使用指南",
                subtitle: "只需三步，打造您的专业简历",
                steps: [
                    {
                        title: "上传或录入",
                        desc: "上传您现有的 PDF 简历，或手动将您的详细信息录入我们的结构化表单。",
                        icon: FileText
                    },
                    {
                        title: "AI 智能优化",
                        desc: "Gemini AI 将深度分析您的内容，优化结构和措辞，最大化简历的影响力。",
                        icon: Wand2
                    },
                    {
                        title: "选择风格并下载",
                        desc: "从我们高端的 Bento 风格模板中选择一款，即刻下载您的全新 PDF 简历。",
                        icon: Download
                    }
                ]
            },
            tips: {
                title: "求职简历技巧",
                subtitle: "助您斩获心仪 Offer 的专家建议",
                items: [
                    {
                        title: "保持简洁",
                        desc: "HR 平均只花 6 秒钟浏览一份简历。请将篇幅控制在 2 页以内，并聚焦于近期且相关的经验。"
                    },
                    {
                        title: "量化您的成就",
                        desc: "用数据说话。与其说“负责销售”，不如说“第三季度销售额提升了 20%”。"
                    },
                    {
                        title: "针对性调整",
                        desc: "为每个职位定制简历。使用职位描述中的关键词，以提高通过 ATS 筛选的几率。"
                    },
                    {
                        title: "使用强动词",
                        desc: "用强有力的动词开头，如“领导”、“开发”、“创建”，避免使用被动或乏味的语言。"
                    }
                ]
            },
            faq: {
                title: "常见问题解答",
                items: [
                    {
                        q: "DeepResume 真的是免费的吗？",
                        a: "是的！您可以免费生成并下载标准简历。我们也提供包含独家模板和高级功能的专业版。"
                    },
                    {
                        q: "我的数据安全吗？",
                        a: "绝对安全。我们不会永久存储您的个人数据。您的简历处理过程是加密的，且完全由您掌控。"
                    },
                    {
                        q: "什么是 Bento 风格简历？",
                        a: "Bento 风格是一种灵感来自便当盒的现代设计趋势，将内容组织成清晰的网格模块，提升可读性和视觉美感。"
                    },
                    {
                        q: "生成后我可以修改简历吗？",
                        a: "可以，您可以在会话期间随时切换模板、调整颜色，或重新上传/编辑您的数据。"
                    }
                ]
            }
        }
    }[language];

    return (
        <div className="bg-paper pb-24">
            {/* How It Works Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-ink">{t.guide.title}</h2>
                        <p className="text-ink-light text-lg">{t.guide.subtitle}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {t.guide.steps.map((step, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-ink/5 flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow">
                                <div className="w-16 h-16 bg-accent/5 rounded-2xl flex items-center justify-center text-accent mb-2">
                                    <step.icon size={32} />
                                </div>
                                <h3 className="font-bold text-xl text-ink">{step.title}</h3>
                                <p className="text-ink-light leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Resume Tips Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                            <Lightbulb size={14} />
                            <span>Pro Tips</span>
                        </div>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-ink">{t.tips.title}</h2>
                        <p className="text-ink-light text-lg">{t.tips.subtitle}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {t.tips.items.map((item, idx) => (
                            <div key={idx} className="flex gap-4 p-6 rounded-xl bg-paper border border-ink/5 hover:border-accent/20 transition-colors">
                                <div className="shrink-0 mt-1">
                                    <CheckCircle2 className="text-accent" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-ink mb-2">{item.title}</h3>
                                    <p className="text-ink-light text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-ink">{t.faq.title}</h2>
                    </div>
                    <div className="space-y-4">
                        {t.faq.items.map((item, idx) => (
                            <details key={idx} className="group bg-white rounded-2xl border border-ink/5 overflow-hidden">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                    <span className="font-bold text-lg text-ink">{item.q}</span>
                                    <span className="transition-transform group-open:rotate-180 text-ink-light">
                                        <ChevronDown size={20} />
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 text-ink-light leading-relaxed border-t border-ink/5 pt-4">
                                    {item.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
