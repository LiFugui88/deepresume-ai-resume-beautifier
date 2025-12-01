import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Globe2, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { Logo } from './Logo';
import { careerTemplates, categoryLabels, getAllCategories, CareerTemplate } from '../data/careerTemplates';

export const TemplatesIndexPage: React.FC = () => {
    const [language, setLanguage] = useState<'en' | 'zh'>('en');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<CareerTemplate['category'] | 'all'>('all');

    const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'zh' : 'en');

    const categories = getAllCategories();

    // Filter careers based on search and category
    const filteredCareers = careerTemplates.filter(career => {
        const matchesSearch = searchQuery === '' ||
            career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            career.titleZh.includes(searchQuery) ||
            career.keySkills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = selectedCategory === 'all' || career.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // Group by category for display
    const groupedCareers = selectedCategory === 'all'
        ? categories.reduce((acc, cat) => {
            acc[cat] = filteredCareers.filter(c => c.category === cat);
            return acc;
        }, {} as Record<string, CareerTemplate[]>)
        : { [selectedCategory]: filteredCareers };

    return (
        <div className="min-h-screen bg-paper">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full h-16 border-b border-ink/10 bg-paper/80 backdrop-blur-md z-50 flex items-center justify-between px-6 md:px-12">
                <Link to="/" className="flex items-center gap-3 group">
                    <Logo size={32} />
                    <span className="font-display font-bold text-lg tracking-tight text-ink group-hover:text-accent transition-colors">CVGoPro</span>
                </Link>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 font-mono text-xs border border-ink/20 px-3 py-1.5 rounded-full hover:bg-ink hover:text-white transition-colors uppercase bg-white shadow-sm"
                    >
                        <Globe2 size={12} />
                        {language === 'en' ? '中文' : 'English'}
                    </button>
                    <Link
                        to="/"
                        className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-full font-bold text-sm hover:shadow-lg transition-all"
                    >
                        {language === 'en' ? 'Build Resume' : '创建简历'}
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </nav>

            <main className="pt-24 pb-16">
                {/* Hero Section */}
                <section className="max-w-6xl mx-auto px-6 md:px-12 mb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-accent/5 text-accent px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase border border-accent/10 mb-6">
                            <Sparkles size={14} />
                            {language === 'en' ? `${careerTemplates.length}+ Professional Templates` : `${careerTemplates.length}+专业模板`}
                        </div>

                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
                            {language === 'en' ? (
                                <>
                                    Resume Templates for <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-600">Every Profession</span>
                                </>
                            ) : (
                                <>
                                    适用于每个职业的<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-600">简历模板</span>
                                </>
                            )}
                        </h1>

                        <p className="text-lg text-ink-light max-w-2xl mx-auto leading-relaxed mb-8">
                            {language === 'en'
                                ? 'Find the perfect Bento-style resume template for your career. AI-powered, beautifully designed, and optimized for applicant tracking systems.'
                                : '为您的职业找到完美的Bento风格简历模板。AI驱动，设计精美，针对招聘系统优化。'
                            }
                        </p>

                        {/* Search */}
                        <div className="max-w-xl mx-auto relative">
                            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-light" />
                            <input
                                type="text"
                                placeholder={language === 'en' ? 'Search by job title or skill...' : '按职位或技能搜索...'}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-xl border border-ink/10 bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-ink"
                            />
                        </div>
                    </motion.div>
                </section>

                {/* Category Filter */}
                <section className="max-w-6xl mx-auto px-6 md:px-12 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter size={16} className="text-ink-light" />
                        <span className="text-sm font-medium text-ink-light">
                            {language === 'en' ? 'Filter by Category' : '按类别筛选'}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'all'
                                    ? 'bg-ink text-white'
                                    : 'bg-white text-ink-light hover:bg-paper border border-ink/10'
                                }`}
                        >
                            {language === 'en' ? 'All Categories' : '全部类别'}
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                        ? 'bg-ink text-white'
                                        : 'bg-white text-ink-light hover:bg-paper border border-ink/10'
                                    }`}
                            >
                                {language === 'en' ? categoryLabels[cat].en : categoryLabels[cat].zh}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Templates Grid */}
                <section className="max-w-6xl mx-auto px-6 md:px-12">
                    {Object.entries(groupedCareers).map(([category, careers]) => {
                        if (careers.length === 0) return null;

                        return (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-12"
                            >
                                <h2 className="font-display text-2xl font-bold text-ink mb-6 flex items-center gap-3">
                                    {language === 'en'
                                        ? categoryLabels[category as CareerTemplate['category']].en
                                        : categoryLabels[category as CareerTemplate['category']].zh
                                    }
                                    <span className="text-sm font-normal text-ink-light">
                                        ({careers.length} {language === 'en' ? 'templates' : '模板'})
                                    </span>
                                </h2>

                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {careers.map((career) => (
                                        <Link
                                            key={career.slug}
                                            to={`/templates/${career.slug}`}
                                            className="group bg-white rounded-2xl p-6 border border-ink/10 hover:border-accent/30 hover:shadow-lg transition-all"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                                                    <Sparkles size={20} />
                                                </div>
                                                <span className="text-[10px] font-mono text-ink-light uppercase tracking-wider bg-paper px-2 py-1 rounded">
                                                    {career.recommendedTemplate}
                                                </span>
                                            </div>

                                            <h3 className="font-bold text-ink text-lg mb-2 group-hover:text-accent transition-colors">
                                                {language === 'en' ? career.title : career.titleZh}
                                            </h3>

                                            <p className="text-sm text-ink-light line-clamp-2 mb-4">
                                                {language === 'en' ? career.intro : career.introZh}
                                            </p>

                                            <div className="flex flex-wrap gap-1 mb-4">
                                                {(language === 'en' ? career.keySkills : career.keySkillsZh).slice(0, 3).map((skill, idx) => (
                                                    <span key={idx} className="text-[10px] bg-paper text-ink-light px-2 py-1 rounded-full">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex items-center gap-2 text-accent text-sm font-medium">
                                                {language === 'en' ? 'Use This Template' : '使用此模板'}
                                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}

                    {filteredCareers.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-ink-light text-lg mb-4">
                                {language === 'en'
                                    ? 'No templates found matching your search.'
                                    : '未找到匹配您搜索的模板。'
                                }
                            </p>
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                                className="text-accent hover:underline"
                            >
                                {language === 'en' ? 'Clear filters' : '清除筛选'}
                            </button>
                        </div>
                    )}
                </section>

                {/* CTA Section */}
                <section className="max-w-5xl mx-auto px-6 md:px-12 mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 rounded-3xl p-8 md:p-12 text-center text-white"
                    >
                        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                            {language === 'en'
                                ? "Can't Find Your Profession?"
                                : '找不到您的职业？'
                            }
                        </h2>
                        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                            {language === 'en'
                                ? 'No worries! CVGoPro works for any profession. Just upload your resume and let our AI create a stunning Bento-style design for you.'
                                : '别担心！CVGoPro适用于任何职业。只需上传您的简历，让我们的AI为您创建令人惊艳的Bento风格设计。'
                            }
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-3 bg-white text-accent px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all hover:scale-105"
                        >
                            {language === 'en' ? 'Build Your Resume Now' : '立即创建您的简历'}
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </section>
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
