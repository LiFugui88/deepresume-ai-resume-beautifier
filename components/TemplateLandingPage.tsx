import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Sparkles, Download, Globe2, ChevronLeft, Star } from 'lucide-react';
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
