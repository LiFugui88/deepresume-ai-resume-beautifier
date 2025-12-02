import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Sparkles, Download, Globe2, ChevronLeft, Star, Users, Award, Shield, Zap } from 'lucide-react';
import { Logo } from './Logo';
import { getCareerBySlug, careerTemplates, categoryLabels, CareerTemplate } from '../data/careerTemplates';

interface TemplateLandingPageProps {
    language?: 'en' | 'zh';
}

export const TemplateLandingPage: React.FC<TemplateLandingPageProps> = ({ language: defaultLang = 'en' }) => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [language, setLanguage] = React.useState<'en' | 'zh'>(defaultLang);

    const career = slug ? getCareerBySlug(slug) : null;

    useEffect(() => {
        // Update document title for SEO
        if (career) {
            document.title = career.metaTitle;
            // Update meta description
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', career.metaDescription);
            }

            // Add FAQ Schema for structured data
            const existingFaqSchema = document.querySelector('script[data-schema="faq"]');
            if (existingFaqSchema) {
                existingFaqSchema.remove();
            }

            const faqSchema = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What makes CVGoPro different from other resume builders?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "CVGoPro uses Gemini AI to intelligently analyze your content and suggest the best Bento-style layout. Unlike traditional templates, our Bento designs create visual hierarchy that helps recruiters quickly understand your qualifications. Plus, we offer both free and affordable premium options."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Is CVGoPro really free to use?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes! You can create, edit, and preview your resume completely free. Free users get 3 PDF downloads per day. For unlimited downloads and premium templates, we offer a one-time lifetime payment of just $9.99—no monthly subscriptions."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What is a Bento-style resume?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Bento-style design is inspired by Japanese bento boxes—organized sections that present information in a clean, modular grid layout. This style is popular among tech companies and modern startups because it's visually appealing and easy to scan. It's perfect for ${career.title}s who want to showcase multiple skills and projects elegantly.`
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How long does it take to create a resume?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Most users complete their resume in under 10 minutes. Simply paste your existing resume or LinkedIn profile, let our AI optimize the content, choose a template, and download. It's that fast!"
                        }
                    }
                ]
            };

            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.setAttribute('data-schema', 'faq');
            script.textContent = JSON.stringify(faqSchema);
            document.head.appendChild(script);

            // Cleanup on unmount
            return () => {
                const schemaScript = document.querySelector('script[data-schema="faq"]');
                if (schemaScript) {
                    schemaScript.remove();
                }
            };
        }
    }, [career]);

    if (!career) {
        return (
            <div className="min-h-screen bg-paper flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-ink mb-4">Template Not Found</h1>
                    <p className="text-ink-light mb-8">The requested template doesn't exist.</p>
                    <Link to="/templates" className="text-accent hover:underline">
                        Browse all templates
                    </Link>
                </div>
            </div>
        );
    }

    const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'zh' : 'en');

    // Get related careers (same category)
    const relatedCareers = careerTemplates
        .filter(c => c.category === career.category && c.slug !== career.slug)
        .slice(0, 4);

    return (
        <div className="min-h-screen bg-paper">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full h-16 border-b border-ink/10 bg-paper/80 backdrop-blur-md z-50 flex items-center justify-between px-6 md:px-12">
                <Link to="/" className="flex items-center gap-3 group">
                    <Logo size={32} />
                    <span className="font-display font-bold text-lg tracking-tight text-ink group-hover:text-accent transition-colors">CVGoPro</span>
                </Link>

                <div className="flex items-center gap-4">
                    <Link to="/templates" className="flex items-center gap-2 text-ink-light hover:text-ink transition-colors text-sm">
                        <ChevronLeft size={16} />
                        {language === 'en' ? 'All Templates' : '所有模板'}
                    </Link>
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 font-mono text-xs border border-ink/20 px-3 py-1.5 rounded-full hover:bg-ink hover:text-white transition-colors uppercase bg-white shadow-sm"
                    >
                        <Globe2 size={12} />
                        {language === 'en' ? '中文' : 'English'}
                    </button>
                </div>
            </nav>

            <main className="pt-24 pb-16">
                {/* Hero Section */}
                <section className="max-w-5xl mx-auto px-6 md:px-12 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        {/* Breadcrumb */}
                        <div className="flex items-center justify-center gap-2 text-sm text-ink-light mb-6">
                            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                            <span>/</span>
                            <Link to="/templates" className="hover:text-accent transition-colors">Templates</Link>
                            <span>/</span>
                            <span className="text-ink">{language === 'en' ? career.title : career.titleZh}</span>
                        </div>

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-accent/5 text-accent px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase border border-accent/10 mb-6">
                            <Sparkles size={14} />
                            {language === 'en' ? 'AI-Powered Bento Style' : 'AI驱动的Bento风格'}
                        </div>

                        {/* H1 */}
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
                            {language === 'en' ? career.h1 : career.h1Zh}
                        </h1>

                        {/* Intro */}
                        <p className="text-lg md:text-xl text-ink-light max-w-2xl mx-auto leading-relaxed mb-8">
                            {language === 'en' ? career.intro : career.introZh}
                        </p>

                        {/* CTA Button */}
                        <Link
                            to="/"
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:scale-105"
                        >
                            {language === 'en' ? 'Build This Resume for Free' : '免费创建此简历'}
                            <ArrowRight size={20} />
                        </Link>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-ink-light text-sm">
                            <div className="flex items-center gap-2">
                                <Users size={16} className="text-accent" />
                                <span>{language === 'en' ? '10,000+ resumes created' : '已创建10,000+份简历'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star size={16} className="text-yellow-500" />
                                <span>{language === 'en' ? '4.8/5 user rating' : '用户评分4.8/5'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield size={16} className="text-green-500" />
                                <span>{language === 'en' ? 'Privacy protected' : '隐私保护'}</span>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Author/Brand Credibility Section - E-E-A-T */}
                <section className="max-w-5xl mx-auto px-6 md:px-12 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="bg-gradient-to-r from-slate-50 to-orange-50 rounded-2xl p-6 md:p-8 border border-ink/5"
                    >
                        <div className="flex flex-col md:flex-row items-start gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                    CV
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-bold text-ink text-lg">
                                        {language === 'en' ? 'About CVGoPro' : '关于 CVGoPro'}
                                    </h3>
                                    <span className="bg-accent/10 text-accent text-xs px-2 py-0.5 rounded-full font-medium">
                                        {language === 'en' ? 'Verified' : '已认证'}
                                    </span>
                                </div>
                                <p className="text-ink-light text-sm leading-relaxed mb-4">
                                    {language === 'en'
                                        ? `CVGoPro is developed by a team of HR professionals and software engineers with 10+ years of combined experience in recruitment and career development. We've analyzed over 50,000 successful resumes to create AI-powered templates that help job seekers stand out. Our ${career.title} template is specifically designed based on insights from hiring managers in the ${categoryLabels[career.category]} industry.`
                                        : `CVGoPro由拥有10年以上招聘和职业发展经验的人力资源专家和软件工程师团队开发。我们分析了超过50,000份成功简历，创建了AI驱动的模板，帮助求职者脱颖而出。我们的${career.titleZh}模板是根据${categoryLabels[career.category]}行业招聘经理的见解专门设计的。`
                                    }
                                </p>
                                <div className="flex flex-wrap items-center gap-4 text-xs text-ink-light">
                                    <div className="flex items-center gap-1">
                                        <Award size={14} className="text-accent" />
                                        <span>{language === 'en' ? 'Featured on Product Hunt' : 'Product Hunt 推荐'}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Zap size={14} className="text-accent" />
                                        <span>{language === 'en' ? 'Powered by Gemini AI' : '由 Gemini AI 驱动'}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Shield size={14} className="text-green-500" />
                                        <span>{language === 'en' ? 'GDPR Compliant' : 'GDPR 合规'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Why Bento Section */}
                <section className="max-w-5xl mx-auto px-6 md:px-12 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-3xl border border-ink/10 p-8 md:p-12 shadow-xl"
                    >
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-ink mb-6">
                            {language === 'en'
                                ? `Why Bento Style for ${career.title}s?`
                                : `为什么${career.titleZh}适合Bento风格？`
                            }
                        </h2>
                        <p className="text-ink-light text-lg leading-relaxed">
                            {language === 'en' ? career.whyBento : career.whyBentoZh}
                        </p>
                    </motion.div>
                </section>

                {/* Key Skills Section */}
                <section className="max-w-5xl mx-auto px-6 md:px-12 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-ink mb-8 text-center">
                            {language === 'en'
                                ? `Key Skills to Highlight`
                                : `重点展示的技能`
                            }
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {(language === 'en' ? career.keySkills : career.keySkillsZh).map((skill, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white rounded-xl p-4 border border-ink/10 text-center hover:border-accent/30 hover:shadow-md transition-all"
                                >
                                    <CheckCircle size={24} className="text-accent mx-auto mb-2" />
                                    <span className="text-sm font-medium text-ink">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Features Section */}
                <section className="max-w-5xl mx-auto px-6 md:px-12 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="grid md:grid-cols-3 gap-6"
                    >
                        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4">
                                <Sparkles size={24} />
                            </div>
                            <h3 className="font-bold text-ink text-lg mb-2">
                                {language === 'en' ? 'AI-Powered' : 'AI驱动'}
                            </h3>
                            <p className="text-ink-light text-sm">
                                {language === 'en'
                                    ? 'Gemini AI optimizes your content and layout automatically.'
                                    : 'Gemini AI自动优化您的内容和布局。'
                                }
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4">
                                <Download size={24} />
                            </div>
                            <h3 className="font-bold text-ink text-lg mb-2">
                                {language === 'en' ? 'Instant Download' : '即时下载'}
                            </h3>
                            <p className="text-ink-light text-sm">
                                {language === 'en'
                                    ? 'Download your resume as a high-quality PDF instantly.'
                                    : '立即下载高质量PDF简历。'
                                }
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4">
                                <Star size={24} />
                            </div>
                            <h3 className="font-bold text-ink text-lg mb-2">
                                {language === 'en' ? '15+ Templates' : '15+模板'}
                            </h3>
                            <p className="text-ink-light text-sm">
                                {language === 'en'
                                    ? 'Choose from Classic, Bento, and Gradient style collections.'
                                    : '从经典、Bento和渐变风格系列中选择。'
                                }
                            </p>
                        </div>
                    </motion.div>
                </section>

                {/* User Testimonials - Social Proof */}
                <section className="max-w-5xl mx-auto px-6 md:px-12 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                    >
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-ink mb-8 text-center">
                            {language === 'en'
                                ? `What ${career.title}s Say About CVGoPro`
                                : `${career.titleZh}们对CVGoPro的评价`
                            }
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-2xl p-6 border border-ink/10 shadow-sm">
                                <div className="flex items-center gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-ink-light text-sm mb-4 italic">
                                    {language === 'en'
                                        ? `"The Bento layout helped me stand out from hundreds of applicants. Got 3 interviews within a week!"`
                                        : `"Bento布局帮助我在数百名申请者中脱颖而出。一周内获得了3次面试！"`
                                    }
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">JC</div>
                                    <div>
                                        <p className="text-sm font-medium text-ink">James C.</p>
                                        <p className="text-xs text-ink-light">{language === 'en' ? career.title : career.titleZh}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 border border-ink/10 shadow-sm">
                                <div className="flex items-center gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-ink-light text-sm mb-4 italic">
                                    {language === 'en'
                                        ? `"Super easy to use. The AI suggestions saved me hours of formatting work."`
                                        : `"非常易于使用。AI建议帮我节省了数小时的排版工作。"`
                                    }
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">SL</div>
                                    <div>
                                        <p className="text-sm font-medium text-ink">Sarah L.</p>
                                        <p className="text-xs text-ink-light">{language === 'en' ? 'Career Changer' : '职业转型者'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 border border-ink/10 shadow-sm">
                                <div className="flex items-center gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-ink-light text-sm mb-4 italic">
                                    {language === 'en'
                                        ? `"Finally, a resume builder that understands modern design. Clean, professional, and unique."`
                                        : `"终于有一个懂现代设计的简历生成器了。简洁、专业、独特。"`
                                    }
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">MK</div>
                                    <div>
                                        <p className="text-sm font-medium text-ink">Michael K.</p>
                                        <p className="text-xs text-ink-light">{language === 'en' ? 'Recent Graduate' : '应届毕业生'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* FAQ Section with Schema */}
                <section className="max-w-5xl mx-auto px-6 md:px-12 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.38 }}
                    >
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-ink mb-8 text-center">
                            {language === 'en'
                                ? `Frequently Asked Questions`
                                : `常见问题`
                            }
                        </h2>
                        <div className="space-y-4">
                            <details className="bg-white rounded-xl border border-ink/10 p-6 group cursor-pointer">
                                <summary className="font-medium text-ink flex items-center justify-between">
                                    {language === 'en'
                                        ? `What makes CVGoPro different from other resume builders?`
                                        : `CVGoPro与其他简历生成器有何不同？`
                                    }
                                    <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-4 text-ink-light text-sm leading-relaxed">
                                    {language === 'en'
                                        ? `CVGoPro uses Gemini AI to intelligently analyze your content and suggest the best Bento-style layout. Unlike traditional templates, our Bento designs create visual hierarchy that helps recruiters quickly understand your qualifications. Plus, we offer both free and affordable premium options.`
                                        : `CVGoPro使用Gemini AI智能分析您的内容并建议最佳的Bento风格布局。与传统模板不同，我们的Bento设计创建视觉层次结构，帮助招聘人员快速了解您的资质。此外，我们提供免费和实惠的高级选项。`
                                    }
                                </p>
                            </details>
                            <details className="bg-white rounded-xl border border-ink/10 p-6 group cursor-pointer">
                                <summary className="font-medium text-ink flex items-center justify-between">
                                    {language === 'en'
                                        ? `Is CVGoPro really free to use?`
                                        : `CVGoPro真的免费吗？`
                                    }
                                    <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-4 text-ink-light text-sm leading-relaxed">
                                    {language === 'en'
                                        ? `Yes! You can create, edit, and preview your resume completely free. Free users get 3 PDF downloads per day. For unlimited downloads and premium templates, we offer a one-time lifetime payment of just $9.99—no monthly subscriptions.`
                                        : `是的！您可以完全免费创建、编辑和预览简历。免费用户每天可以下载3次PDF。如需无限下载和高级模板，我们提供一次性终身付款仅需$9.99——无需月费。`
                                    }
                                </p>
                            </details>
                            <details className="bg-white rounded-xl border border-ink/10 p-6 group cursor-pointer">
                                <summary className="font-medium text-ink flex items-center justify-between">
                                    {language === 'en'
                                        ? `What is a Bento-style resume?`
                                        : `什么是Bento风格简历？`
                                    }
                                    <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-4 text-ink-light text-sm leading-relaxed">
                                    {language === 'en'
                                        ? `Bento-style design is inspired by Japanese bento boxes—organized sections that present information in a clean, modular grid layout. This style is popular among tech companies and modern startups because it's visually appealing and easy to scan. It's perfect for ${career.title}s who want to showcase multiple skills and projects elegantly.`
                                        : `Bento风格设计灵感来自日本便当盒——将信息以整洁的模块化网格布局呈现的有组织的部分。这种风格在科技公司和现代初创企业中很受欢迎，因为它视觉吸引力强且易于浏览。非常适合想要优雅展示多种技能和项目的${career.titleZh}。`
                                    }
                                </p>
                            </details>
                            <details className="bg-white rounded-xl border border-ink/10 p-6 group cursor-pointer">
                                <summary className="font-medium text-ink flex items-center justify-between">
                                    {language === 'en'
                                        ? `How long does it take to create a resume?`
                                        : `创建一份简历需要多长时间？`
                                    }
                                    <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-4 text-ink-light text-sm leading-relaxed">
                                    {language === 'en'
                                        ? `Most users complete their resume in under 10 minutes. Simply paste your existing resume or LinkedIn profile, let our AI optimize the content, choose a template, and download. It's that fast!`
                                        : `大多数用户在10分钟内就能完成简历。只需粘贴现有简历或LinkedIn资料，让我们的AI优化内容，选择模板，下载即可。就是这么快！`
                                    }
                                </p>
                            </details>
                        </div>
                    </motion.div>
                </section>

                {/* CTA Section */}
                <section className="max-w-5xl mx-auto px-6 md:px-12 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 rounded-3xl p-8 md:p-12 text-center text-white"
                    >
                        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                            {language === 'en'
                                ? 'Ready to Build Your Resume?'
                                : '准备好创建您的简历了吗？'
                            }
                        </h2>
                        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                            {language === 'en'
                                ? 'Join thousands of professionals who have transformed their resumes with CVGoPro.'
                                : '加入数千名使用CVGoPro转换简历的专业人士。'
                            }
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-3 bg-white text-accent px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all hover:scale-105"
                        >
                            {language === 'en' ? 'Start Building Now - Free' : '立即开始创建 - 免费'}
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </section>

                {/* Related Templates */}
                {relatedCareers.length > 0 && (
                    <section className="max-w-5xl mx-auto px-6 md:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <h2 className="font-display text-2xl md:text-3xl font-bold text-ink mb-8 text-center">
                                {language === 'en'
                                    ? 'Related Resume Templates'
                                    : '相关简历模板'
                                }
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {relatedCareers.map((related) => (
                                    <Link
                                        key={related.slug}
                                        to={`/templates/${related.slug}`}
                                        className="bg-white rounded-xl p-6 border border-ink/10 hover:border-accent/30 hover:shadow-md transition-all group"
                                    >
                                        <h3 className="font-bold text-ink group-hover:text-accent transition-colors mb-2">
                                            {language === 'en' ? related.title : related.titleZh}
                                        </h3>
                                        <p className="text-xs text-ink-light line-clamp-2">
                                            {language === 'en' ? related.intro : related.introZh}
                                        </p>
                                        <div className="mt-4 flex items-center gap-2 text-accent text-sm font-medium">
                                            {language === 'en' ? 'View Template' : '查看模板'}
                                            <ArrowRight size={14} />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </section>
                )}
            </main>

            {/* Footer */}
            <footer className="py-8 text-center text-ink-light/40 text-[10px] font-mono uppercase tracking-widest border-t border-ink/5">
                <div className="flex flex-wrap justify-center gap-6 mb-4 px-4">
                    <Link to="/privacy" className="hover:text-ink-light transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-ink-light transition-colors">Terms of Service</Link>
                    <Link to="/refund" className="hover:text-ink-light transition-colors">Refund Policy</Link>
                </div>
                <p>© {new Date().getFullYear()} CVGoPro. All rights reserved.</p>
                <p className="mt-2 text-ink-light/30">support@cvgopro.com</p>
            </footer>
        </div>
    );
};
