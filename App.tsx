
import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, RefreshCw, AlertCircle, Layout, Globe2, Briefcase, Grid, Palette, CheckCircle2, Lock, LogIn, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeResume, fileToBase64 } from './services/geminiService';
import { supabase } from './services/supabase';
import { AppState, ResumeData } from './types';
import { ResumeDesign, TemplateId, Language } from './components/ResumeDesign';
import { Logo } from './components/Logo';
import { AuthModal } from './components/AuthModal';
import { User as SupabaseUser } from '@supabase/supabase-js';

// UI Translations
const UI_TEXT = {
    en: {
        slogan: "Forever Free Resume Beautifier",
        upload_title: "ELEVATE YOUR CAREER",
        upload_desc: "DeepResume transforms your existing CV into a high-end, Bento-style architectural masterpiece using Gemini AI. Completely free, forever.",
        upload_btn: "UPLOAD PDF RESUME",
        analyzing: "DECONSTRUCTING",
        analyzing_desc: "AI is optimizing your content structure...",
        error: "ANALYSIS FAILED",
        try_again: "TRY AGAIN",
        action_center: "DESIGN STUDIO",
        review_desc: "Select a style to match your personal brand.",
        template_label: "STYLE COLLECTION",
        save_pdf: "DOWNLOAD PDF",
        create_new: "START OVER",
        print_instr: "PRINT SETTINGS: Save as PDF • Background Graphics: ON • Margins: None",
        cat_classic: "Classic Series (Free)",
        cat_bento: "Bento Style (Paid)",
        cat_gradient: "Gradient Style (Paid)",
        login: "LOGIN",
        logout: "LOGOUT",
        templates: {
            // Classic
            standard: "Standard (Serif)",
            minimal: "Minimal (Clean)",
            modern: "Modern (Sidebar)",
            executive: "Executive (Gold)",
            bold: "Bold (Strong)",
            // Bento
            rio: "RIO (Soft)",
            tokyo: "TOKYO (Dark)",
            oslo: "OSLO (Wire)",
            milan: "MILAN (Elegant)",
            nyc: "NYC (Pop)",
            // Gradient
            aurora: "Aurora (Ethereal)",
            midnight: "Midnight (Space)",
            sunrise: "Sunrise (Warm)",
            azure: "Azure (Fluid)",
            bloom: "Bloom (Soft)"
        }
    },
    zh: {
        slogan: "永久免费的简历美化工具",
        upload_title: "重塑职业形象",
        upload_desc: "DeepResume 使用 AI 将您的简历转化为高端 Bento 风格的设计杰作。永久免费。",
        upload_btn: "上传 PDF 简历",
        analyzing: "正在解构",
        analyzing_desc: "AI 正在优化您的内容结构...",
        error: "解析失败",
        try_again: "重试",
        action_center: "设计工坊",
        review_desc: "选择最适合您个人品牌的风格。",
        template_label: "风格选择",
        save_pdf: "下载 PDF",
        create_new: "重新制作",
        print_instr: "打印设置：另存为 PDF • 勾选背景图形 • 边距：无",
        cat_classic: "经典系列 (免费)",
        cat_bento: "便当风格 (付费)",
        cat_gradient: "弥散渐变 (付费)",
        login: "登录",
        logout: "退出",
        templates: {
            // Classic
            standard: "标准 (衬线)",
            minimal: "极简 (清爽)",
            modern: "现代 (侧栏)",
            executive: "行政 (典雅)",
            bold: "醒目 (粗体)",
            // Bento
            rio: "RIO (柔和)",
            tokyo: "TOKYO (暗黑)",
            oslo: "OSLO (极客)",
            milan: "MILAN (杂志)",
            nyc: "NYC (波普)",
            // Gradient
            aurora: "Aurora (极光)",
            midnight: "Midnight (深空)",
            sunrise: "Sunrise (日出)",
            azure: "Azure (流体)",
            bloom: "Bloom (绽放)"
        }
    }
};

type Category = 'classic' | 'bento' | 'gradient';

import { AdminPanel } from './components/AdminPanel';

import { initiateCheckout } from './services/creemService';

const App: React.FC = () => {
    const [state, setState] = useState<AppState>(AppState.IDLE);
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [language, setLanguage] = useState<Language>('zh');
    const [template, setTemplate] = useState<TemplateId>('rio');
    const [category, setCategory] = useState<Category>('bento');

    // Auth State
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [isPro, setIsPro] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const t = UI_TEXT[language];

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            // In a real app, check subscription status from DB here
            if (session?.user?.user_metadata?.subscription_status === 'active') {
                setIsPro(true);
            }
            if (session?.user) {
                checkAdminStatus(session.user.id);
            }
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                checkAdminStatus(session.user.id);
            } else {
                setIsAdmin(false);
                setShowAdmin(false);
            }
        });

        // Check for payment success
        const params = new URLSearchParams(window.location.search);
        if (params.get('payment') === 'success') {
            setIsPro(true);
            // Ideally, you would verify this with your backend
            alert(language === 'en' ? 'Payment Successful! You are now a Pro member.' : '支付成功！您已成为专业会员。');
            // Clear URL params
            window.history.replaceState({}, '', window.location.pathname);
        }

        return () => subscription.unsubscribe();
    }, [language]);

    const checkAdminStatus = async (userId: string) => {
        const { data } = await supabase.from('profiles').select('is_admin').eq('id', userId).single();
        if (data?.is_admin) {
            setIsAdmin(true);
        }
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'zh' : 'en');
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setErrorMsg(language === 'en' ? "Please upload a PDF file." : "请上传 PDF 文件。");
            return;
        }

        setFileName(file.name);
        setErrorMsg('');
        setState(AppState.ANALYZING);

        try {
            const base64 = await fileToBase64(file);
            const data = await analyzeResume(base64, file.type);
            setResumeData(data);
            setState(AppState.PREVIEW);
        } catch (err) {
            console.error(err);
            setState(AppState.ERROR);
            setErrorMsg(language === 'en' ? "Failed to analyze resume." : "简历解析失败。");
        }
    };

    const handleUpgrade = async () => {
        if (!user) {
            setShowAuthModal(true);
            return;
        }
        try {
            await initiateCheckout(user.email || '');
        } catch (error) {
            alert(language === 'en' ? 'Payment initiation failed.' : '支付启动失败。');
        }
    };

    const triggerPrint = () => {
        if (isPaid && !isPro) {
            handleUpgrade();
            return;
        }
        window.print();
    };

    const reset = () => {
        setResumeData(null);
        setFileName('');
        setState(AppState.IDLE);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    // Template groups
    const classicTemplates: TemplateId[] = ['standard', 'minimal', 'modern', 'executive', 'bold'];
    const bentoTemplates: TemplateId[] = ['rio', 'tokyo', 'oslo', 'milan', 'nyc'];
    const gradientTemplates: TemplateId[] = ['aurora', 'midnight', 'sunrise', 'azure', 'bloom'];

    const getTemplatesByCategory = () => {
        switch (category) {
            case 'classic': return classicTemplates;
            case 'bento': return bentoTemplates;
            case 'gradient': return gradientTemplates;
            default: return bentoTemplates;
        }
    };

    const isPaid = category !== 'classic';

    if (showAdmin) {
        return (
            <div className="min-h-screen bg-paper">
                <nav className="h-16 border-b border-ink/10 bg-white px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-ink cursor-pointer" onClick={() => setShowAdmin(false)}>
                        <Logo size={24} />
                        <span>Back to App</span>
                    </div>
                    <div className="font-mono text-xs text-ink-light">ADMIN MODE</div>
                </nav>
                <AdminPanel />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-paper relative overflow-x-hidden font-body">
            {/* Background Grid */}
            <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-40 pointer-events-none no-print" />

            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

            {/* Nav */}
            <nav className="fixed top-0 left-0 w-full h-16 border-b border-ink/10 bg-paper/80 backdrop-blur-md z-50 flex items-center justify-between px-6 md:px-12 no-print">
                <div className="flex items-center gap-3 cursor-pointer group" onClick={reset}>
                    <Logo size={32} />
                    <div className="flex flex-col">
                        <span className="font-display font-bold text-lg tracking-tight leading-none text-ink group-hover:text-accent transition-colors">DeepResume</span>
                        <span className="text-[9px] font-mono text-ink-light tracking-wider mt-0.5 uppercase">{t.slogan}</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex gap-6 font-mono text-[10px] uppercase tracking-widest text-ink-light">
                        <span>Bento Design System</span>
                    </div>
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 font-mono text-xs border border-ink/20 px-3 py-1.5 rounded-full hover:bg-ink hover:text-white transition-colors uppercase bg-white shadow-sm"
                    >
                        <Globe2 size={12} />
                        {language === 'en' ? '中文' : 'English'}
                    </button>

                    {user ? (
                        <div className="flex items-center gap-3">
                            {isAdmin && (
                                <button
                                    onClick={() => setShowAdmin(true)}
                                    className="text-xs font-bold text-ink hover:text-accent uppercase"
                                >
                                    Admin
                                </button>
                            )}
                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                <User size={16} />
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 font-mono text-xs text-ink hover:text-red-500 transition-colors uppercase"
                            >
                                <LogOut size={14} />
                                {t.logout}
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowAuthModal(true)}
                            className="flex items-center gap-2 font-mono text-xs bg-ink text-white px-4 py-2 rounded-full hover:bg-accent transition-colors uppercase shadow-lg shadow-ink/20"
                        >
                            <LogIn size={14} />
                            {t.login}
                        </button>
                    )}
                </div>
            </nav>

            <main className="pt-24 pb-12 min-h-screen flex flex-col">

                {/* Hero / Upload State */}
                <AnimatePresence mode="wait">
                    {state === AppState.IDLE && (
                        <motion.div
                            key="hero"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex-1 flex flex-col items-center justify-center px-4"
                        >
                            <div className="max-w-3xl w-full text-center space-y-8">
                                <div className="inline-block mb-4">
                                    <span className="bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-accent/20">
                                        {t.slogan}
                                    </span>
                                </div>

                                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter text-ink">
                                    {language === 'en' ? (
                                        <>
                                            ELEVATE YOUR <br />
                                            <span className="text-accent">CAREER</span>
                                        </>
                                    ) : (
                                        <>
                                            重塑 <br />
                                            <span className="text-accent">职业形象</span>
                                        </>
                                    )}
                                </h1>
                                <p className="font-body text-base md:text-lg text-ink-light max-w-xl mx-auto leading-relaxed">
                                    {t.upload_desc}
                                </p>

                                <div className="mt-12 relative group">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        accept="application/pdf"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                    />
                                    <div className="bg-white border-2 border-ink/10 p-12 md:p-16 rounded-3xl shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.01] group-hover:border-accent/50 cursor-pointer relative z-10 flex flex-col items-center justify-center gap-4">
                                        <div className="w-20 h-20 border-2 border-accent/10 rounded-2xl flex items-center justify-center bg-accent/5 group-hover:bg-accent group-hover:border-accent transition-colors duration-300">
                                            <Upload className="w-8 h-8 text-accent group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="font-display font-bold text-xl text-ink">{t.upload_btn}</span>
                                        <span className="font-mono text-xs text-ink-light bg-paper px-2 py-1 rounded">MAX 5MB • PDF</span>
                                    </div>
                                </div>

                                {errorMsg && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-red-500 font-mono text-xs flex items-center justify-center gap-2 mt-4 bg-red-50 px-4 py-2 rounded-full"
                                    >
                                        <AlertCircle size={14} />
                                        {errorMsg}
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Processing State */}
                    {state === AppState.ANALYZING && (
                        <motion.div
                            key="analyzing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1 flex flex-col items-center justify-center"
                        >
                            <div className="flex flex-col items-center gap-8">
                                <div className="relative w-24 h-24">
                                    <motion.div
                                        className="absolute inset-0 border-4 border-ink/10 rounded-2xl"
                                    />
                                    <motion.div
                                        className="absolute inset-0 border-t-4 border-accent rounded-2xl"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Logo size={40} />
                                    </div>
                                </div>
                                <div className="text-center space-y-2">
                                    <h2 className="font-display text-3xl font-bold text-ink">{t.analyzing}</h2>
                                    <p className="font-mono text-sm text-ink-light animate-pulse">{t.analyzing_desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Error State */}
                    {state === AppState.ERROR && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1 flex flex-col items-center justify-center"
                        >
                            <div className="text-center space-y-6 max-w-md px-4">
                                <div className="mx-auto w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
                                    <AlertCircle size={32} />
                                </div>
                                <h2 className="font-display text-2xl font-bold text-ink">{t.error}</h2>
                                <p className="font-mono text-sm text-ink-light">
                                    {errorMsg || (language === 'en' ? "Could not process file structure." : "无法解析文件结构。")}
                                </p>
                                <button
                                    onClick={reset}
                                    className="bg-ink text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-accent transition-colors flex items-center gap-2 mx-auto shadow-lg"
                                >
                                    <RefreshCw size={16} />
                                    {t.try_again}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Preview State */}
                {state === AppState.PREVIEW && resumeData && (
                    <motion.div
                        key="preview"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col lg:flex-row gap-8 px-4 md:px-12 max-w-[1800px] mx-auto w-full"
                    >
                        {/* Controls Sidebar (Left on Desktop) */}
                        <div className="lg:w-80 shrink-0 flex flex-col gap-6 order-2 lg:order-1 no-print">
                            <div className="bg-white border border-ink/10 rounded-3xl p-6 space-y-6 sticky top-24 shadow-xl">
                                <div>
                                    <h3 className="font-display font-bold text-xl mb-1 text-ink">{t.action_center}</h3>
                                    <p className="text-xs text-ink-light font-medium">{t.review_desc}</p>
                                </div>

                                {/* Category Toggle - Vertical Layout */}
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] font-bold tracking-widest text-ink-light uppercase flex items-center gap-2">
                                        <Layout size={12} /> CATEGORY
                                    </label>
                                    <div className="flex flex-col gap-2 bg-paper p-2 rounded-xl border border-ink/5">
                                        <button
                                            onClick={() => { setCategory('classic'); setTemplate('standard'); }}
                                            className={`w-full px-4 py-3 text-xs font-bold rounded-lg transition-all flex items-center justify-between group ${category === 'classic' ? 'bg-white shadow-sm text-ink border border-ink/5' : 'text-ink-light hover:text-ink hover:bg-white/50'}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Briefcase size={14} className={category === 'classic' ? 'text-accent' : 'text-ink-light'} />
                                                <span>{t.cat_classic}</span>
                                            </div>
                                            {category === 'classic' && <CheckCircle2 size={14} className="text-accent" />}
                                        </button>
                                        <button
                                            onClick={() => { setCategory('bento'); setTemplate('rio'); }}
                                            className={`w-full px-4 py-3 text-xs font-bold rounded-lg transition-all flex items-center justify-between group ${category === 'bento' ? 'bg-white shadow-sm text-ink border border-ink/5' : 'text-ink-light hover:text-ink hover:bg-white/50'}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Grid size={14} className={category === 'bento' ? 'text-accent' : 'text-ink-light'} />
                                                <span>{t.cat_bento}</span>
                                            </div>
                                            {category === 'bento' && <CheckCircle2 size={14} className="text-accent" />}
                                        </button>
                                        <button
                                            onClick={() => { setCategory('gradient'); setTemplate('aurora'); }}
                                            className={`w-full px-4 py-3 text-xs font-bold rounded-lg transition-all flex items-center justify-between group ${category === 'gradient' ? 'bg-white shadow-sm text-ink border border-ink/5' : 'text-ink-light hover:text-ink hover:bg-white/50'}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Palette size={14} className={category === 'gradient' ? 'text-accent' : 'text-ink-light'} />
                                                <span>{t.cat_gradient}</span>
                                            </div>
                                            {category === 'gradient' && <CheckCircle2 size={14} className="text-accent" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Template List */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold tracking-widest text-ink-light uppercase flex items-center gap-2">
                                        <Layout size={12} /> {t.template_label}
                                    </label>
                                    <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                        {getTemplatesByCategory().map((tid) => (
                                            <button
                                                key={tid}
                                                onClick={() => setTemplate(tid)}
                                                className={`text-left px-4 py-3 text-sm font-bold rounded-xl border transition-all flex justify-between items-center ${template === tid
                                                    ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm scale-[1.02]'
                                                    : 'bg-paper text-ink-light border-transparent hover:bg-white hover:border-ink/20 hover:text-ink'
                                                    }`}
                                            >
                                                {t.templates[tid]}
                                                {template === tid && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <hr className="border-ink/5" />

                                <div className="space-y-3">
                                    <button
                                        onClick={triggerPrint}
                                        className={`w-full text-white py-4 rounded-xl font-bold tracking-wide transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 ${isPaid ? 'bg-gradient-to-r from-accent to-indigo-600 hover:shadow-accent/30' : 'bg-accent hover:bg-blue-700 shadow-accent/20'}`}
                                    >
                                        {isPaid ? (
                                            <>
                                                <Lock size={16} className="opacity-80" />
                                                {t.save_pdf}
                                                <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] ml-1">
                                                    {language === 'en' ? '$0.99/USE' : '$0.99/次'}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <Download size={18} />
                                                {t.save_pdf}
                                            </>
                                        )}
                                    </button>

                                    <button
                                        onClick={reset}
                                        className="w-full bg-transparent border border-ink/20 text-ink py-3 rounded-xl font-bold text-xs hover:bg-paper transition-colors"
                                    >
                                        {t.create_new}
                                    </button>
                                </div>

                                <div className="p-4 bg-blue-50 rounded-xl text-[10px] text-blue-800 leading-relaxed border border-blue-100">
                                    <p className="font-bold mb-1 flex items-center gap-1"><AlertCircle size={10} /> IMPORTANT:</p>
                                    {t.print_instr}
                                </div>
                            </div>
                        </div>

                        {/* Resume Canvas (Right on Desktop) */}
                        <div className="flex-1 flex justify-center order-1 lg:order-2 mb-12 lg:mb-0 overflow-visible print:block print:absolute print:inset-0 print:z-50 print:bg-white">
                            <div className="transform origin-top scale-[0.5] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.8] xl:scale-[0.9] 2xl:scale-100 transition-transform duration-500 print:transform-none print:scale-100 print:w-full">
                                <ResumeDesign
                                    data={resumeData}
                                    template={template}
                                    language={language}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </main>
        </div>
    );
};

export default App;
