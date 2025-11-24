
import React, { useState, useRef, useEffect } from 'react';
import { Upload, UploadCloud, Download, RefreshCw, AlertCircle, Layout, Globe2, Briefcase, Grid, Palette, CheckCircle2, Lock, LogIn, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeResume } from '../services/geminiService';
import { supabase } from '../services/supabase';
import { AppState, ResumeData } from '../types';
import { ResumeDesign, TemplateId, Language } from './ResumeDesign';
import { Logo } from './Logo';
import { AuthModal } from './AuthModal';
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
        cat_bento: "Bento Style (Free Generation)",
        cat_gradient: "Gradient Style (Free Generation)",
        lifetime: "LIFETIME $9.9",
        members_only: "MEMBERS ONLY",
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
        cat_bento: "便当风格 (免费生成)",
        cat_gradient: "弥散渐变 (免费生成)",
        lifetime: "终身会员 $9.9",
        members_only: "仅会员下载",
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

import { AdminPanel } from './AdminPanel';
import { ManualEntryForm } from './ManualEntryForm';
import { PrivacyPolicyModal, TermsOfServiceModal, RefundPolicyModal, ContactUsModal } from './LegalModals';

import { initiateCheckout } from '../services/creemService';
import { trackEvent, AnalyticsEvents } from '../services/analytics';

const ResumeBuilder: React.FC = () => {
    const [state, setState] = useState<AppState>(AppState.IDLE);
    const [inputMode, setInputMode] = useState<'upload' | 'manual'>('upload');
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [template, setTemplate] = useState<TemplateId>('standard');
    const [category, setCategory] = useState<'classic' | 'bento' | 'gradient'>('classic');
    const [language, setLanguage] = useState<Language>('en');
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [user, setUser] = useState<SupabaseUser | null>(null);

    // Alias isPaid to isPro for compatibility if needed, or just use isPaid. 
    // The previous code used isPro, let's keep it consistent or update usages.
    // Since I see isPro used in useEffect, I will add it back.
    const [isPro, setIsPro] = useState(false);

    // Legal Modals State
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showRefund, setShowRefund] = useState(false);
    const [showContact, setShowContact] = useState(false);

    const [showAdmin, setShowAdmin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const resumeRef = useRef<HTMLDivElement>(null);
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
        } else if (params.get('upgrade') === 'true') {
            // Auto trigger upgrade flow
            // We need to wait a bit for user state to settle or just trigger it
            // If user is not logged in, handleUpgrade will show auth modal
            // We use a small timeout to ensure component is mounted and user state might be ready (though user state is async)
            setTimeout(() => {
                handleUpgrade();
                // Clear URL params to prevent loop if we refresh
                window.history.replaceState({}, '', window.location.pathname);
            }, 1000);
        }

        return () => subscription.unsubscribe();
    }, [language, user]); // Added user to dependency to retry if user loads late

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

        trackEvent(AnalyticsEvents.UPLOAD_RESUME, { fileName: file.name });
        setErrorMsg('');
        setState(AppState.ANALYZING);

        try {
            const data = await analyzeResume(file);
            setResumeData(data);
            setState(AppState.PREVIEW);
            trackEvent(AnalyticsEvents.ANALYSIS_SUCCESS, { method: 'upload' });
        } catch (err: any) {
            console.error(err);
            setState(AppState.ERROR);
            setErrorMsg(err.message || (language === 'en' ? "Failed to analyze resume." : "简历解析失败。"));
            trackEvent(AnalyticsEvents.ANALYSIS_FAILURE, { error: err.message });
        }
    };

    const handleManualSubmit = async (textData: string) => {
        trackEvent(AnalyticsEvents.MANUAL_ENTRY_SUBMIT);
        setState(AppState.ANALYZING);
        try {
            // Reuse the analyze endpoint but pass the text directly
            // We need to modify analyzeResume or call the API directly here
            // Since analyzeResume expects a File, let's create a temporary one or modify the service
            // Better: call the API directly here for simplicity or overload the service

            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ resumeText: textData }),
            });

            if (!response.ok) {
                throw new Error('Analysis failed');
            }

            const data = await response.json();
            setResumeData(data);
            setState(AppState.PREVIEW);
            trackEvent(AnalyticsEvents.ANALYSIS_SUCCESS, { method: 'manual' });
        } catch (err: any) {
            console.error(err);
            setState(AppState.ERROR);
            setErrorMsg(err.message || (language === 'en' ? "Failed to generate resume." : "简历生成失败。"));
            trackEvent(AnalyticsEvents.ANALYSIS_FAILURE, { error: err.message });
        }
    };

    const handleUpgrade = async () => {
        if (!user) {
            setShowAuthModal(true);
            return;
        }
        try {
            trackEvent(AnalyticsEvents.INITIATE_CHECKOUT);
            await initiateCheckout(user?.email || '');
        } catch (error: any) {
            alert(error.message || (language === 'en' ? 'Payment initiation failed.' : '支付启动失败。'));
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

            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} language={language} />

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
                            <button
                                onClick={handleUpgrade}
                                className="hidden md:flex items-center gap-2 font-mono text-xs bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 px-4 py-1.5 rounded-full hover:shadow-lg hover:scale-105 transition-all uppercase font-bold"
                            >
                                <Lock size={12} />
                                {t.lifetime}
                            </button>
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
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className="hidden md:flex items-center gap-2 font-mono text-xs bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 px-4 py-1.5 rounded-full hover:shadow-lg hover:scale-105 transition-all uppercase font-bold"
                            >
                                <Lock size={12} />
                                {t.lifetime}
                            </button>
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className="flex items-center gap-2 font-mono text-xs bg-ink text-white px-4 py-2 rounded-full hover:bg-accent transition-colors uppercase shadow-lg shadow-ink/20"
                            >
                                <LogIn size={14} />
                                {t.login}
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            <main className="pt-24 pb-12 min-h-screen flex flex-col">

                {/* Hero / Upload State */}
                <AnimatePresence mode="wait">
                    {/* Upload State */}
                    {state === AppState.IDLE && (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex-1 flex flex-col items-center justify-center max-w-xl w-full mx-auto px-4"
                        >
                            <div className="text-center space-y-8 w-full">
                                <div className="space-y-4">
                                    <div className="inline-block mb-2">
                                        <span className="bg-accent/5 text-accent px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-accent/10">
                                            {t.slogan}
                                        </span>
                                    </div>
                                    <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight text-ink">
                                        {language === 'en' ? (
                                            <>
                                                ELEVATE YOUR <br />
                                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-600">CAREER</span>
                                            </>
                                        ) : (
                                            <>
                                                重塑 <br />
                                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-600">职业形象</span>
                                            </>
                                        )}
                                    </h1>
                                    <p className="font-sans text-lg text-ink-light max-w-md mx-auto leading-relaxed">
                                        {t.upload_desc}
                                    </p>
                                </div>

                                {/* Mode Toggle */}
                                <div className="flex justify-center gap-4 mb-8">
                                    <button
                                        onClick={() => setInputMode('upload')}
                                        className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${inputMode === 'upload' ? 'bg-ink text-white shadow-lg shadow-ink/20' : 'bg-white text-ink-light hover:bg-paper border border-ink/5'}`}
                                    >
                                        {language === 'en' ? 'Upload PDF' : '上传简历'}
                                    </button>
                                    <button
                                        onClick={() => setInputMode('manual')}
                                        className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${inputMode === 'manual' ? 'bg-ink text-white shadow-lg shadow-ink/20' : 'bg-white text-ink-light hover:bg-paper border border-ink/5'}`}
                                    >
                                        {language === 'en' ? 'Create from Scratch' : '手动录入'}
                                    </button>
                                </div>

                                {inputMode === 'upload' ? (
                                    <div className="relative group w-full">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-accent to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                                        <label className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-ink/10 rounded-2xl bg-white/50 hover:bg-white hover:border-accent/50 transition-all cursor-pointer overflow-hidden backdrop-blur-sm">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <div className="w-16 h-16 mb-4 rounded-2xl bg-blue-50 text-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                    <UploadCloud size={32} />
                                                </div>
                                                <p className="mb-2 text-lg font-bold text-ink">
                                                    {t.upload_btn}
                                                </p>
                                                <p className="text-xs text-ink-light font-medium">
                                                    {t.upload_hint}
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept=".pdf"
                                                onChange={handleFileUpload}
                                            />
                                        </label>
                                    </div>
                                ) : (
                                    <ManualEntryForm
                                        onSubmit={handleManualSubmit}
                                        onCancel={() => setInputMode('upload')}
                                        isAnalyzing={state === AppState.ANALYZING}
                                        language={language}
                                    />
                                )}

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
                    {
                        state === AppState.ANALYZING && (
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
                        )
                    }

                    {/* Error State */}
                    {
                        state === AppState.ERROR && (
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
                        )
                    }
                </AnimatePresence >

                {/* Preview State */}
                {
                    state === AppState.PREVIEW && resumeData && (
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
                                                onClick={() => {
                                                    if (!user) {
                                                        setShowAuthModal(true);
                                                        return;
                                                    }
                                                    setCategory('bento');
                                                    setTemplate('rio');
                                                }}
                                                className={`w-full px-4 py-3 text-xs font-bold rounded-lg transition-all flex items-center justify-between group ${category === 'bento' ? 'bg-white shadow-sm text-ink border border-ink/5' : 'text-ink-light hover:text-ink hover:bg-white/50'}`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Grid size={14} className={category === 'bento' ? 'text-accent' : 'text-ink-light'} />
                                                    <span>{t.cat_bento}</span>
                                                </div>
                                                {category === 'bento' && <CheckCircle2 size={14} className="text-accent" />}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (!user) {
                                                        setShowAuthModal(true);
                                                        return;
                                                    }
                                                    setCategory('gradient');
                                                    setTemplate('aurora');
                                                }}
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
                                                        {t.members_only}
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
                            <div className="flex-1 flex justify-center order-1 lg:order-2 mb-12 lg:mb-0 overflow-visible print:block print:w-full print:h-auto">
                                <div className="transform origin-top scale-[0.5] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.8] xl:scale-[0.9] 2xl:scale-100 transition-transform duration-500 print:transform-none print:scale-100 print:w-full">
                                    <ResumeDesign
                                        data={resumeData}
                                        template={template}
                                        language={language}
                                        ref={resumeRef}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )
                }
                {/* Footer */}
                <footer className="py-8 text-center text-ink-light/40 text-[10px] font-mono uppercase tracking-widest print:hidden">
                    <div className="flex flex-wrap justify-center gap-6 mb-4 px-4">
                        <button onClick={() => setShowPrivacy(true)} className="hover:text-ink-light transition-colors">Privacy Policy</button>
                        <button onClick={() => setShowTerms(true)} className="hover:text-ink-light transition-colors">Terms of Service</button>
                        <button onClick={() => setShowRefund(true)} className="hover:text-ink-light transition-colors">Refund Policy</button>
                        <button onClick={() => setShowContact(true)} className="hover:text-ink-light transition-colors">Contact Us</button>
                    </div>
                    <p>© 2025 DeepResume AI. All rights reserved.</p>
                </footer>

            </main>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                language={language}
            />

            <PrivacyPolicyModal
                isOpen={showPrivacy}
                onClose={() => setShowPrivacy(false)}
            />

            <TermsOfServiceModal
                isOpen={showTerms}
                onClose={() => setShowTerms(false)}
            />

            <RefundPolicyModal
                isOpen={showRefund}
                onClose={() => setShowRefund(false)}
            />

            <ContactUsModal
                isOpen={showContact}
                onClose={() => setShowContact(false)}
            />
        </div >
    );
};

export default ResumeBuilder;
