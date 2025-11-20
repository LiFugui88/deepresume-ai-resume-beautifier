import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { X, Mail, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    language: 'en' | 'zh';
}

const UI_TEXT = {
    en: {
        title: "Welcome Back",
        subtitle: "Sign in to save your resumes and access premium styles.",
        google_btn: "Continue with Google",
        or: "Or continue with email",
        email_placeholder: "name@example.com",
        email_btn: "Sign in with Email",
        sending: "Sending Magic Link...",
        success: "Check your email for the login link!",
        error_default: "An error occurred"
    },
    zh: {
        title: "欢迎回来",
        subtitle: "登录以保存您的简历并使用高级模版。",
        google_btn: "通过 Google 继续",
        or: "或通过邮箱继续",
        email_placeholder: "name@example.com",
        email_btn: "通过邮箱登录",
        sending: "正在发送登录链接...",
        success: "请查收邮件以获取登录链接！",
        error_default: "发生错误"
    }
};

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, language }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const t = UI_TEXT[language];

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: window.location.origin,
                },
            });

            if (error) throw error;
            setMessage(t.success);
        } catch (error: any) {
            setMessage(error.message || t.error_default);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin
                }
            });
            if (error) throw error;
        } catch (error: any) {
            setMessage(error.message || t.error_default);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
                    >
                        <div className="p-6 relative">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-display font-bold text-ink mb-2">{t.title}</h2>
                                <p className="text-ink-light text-sm">{t.subtitle}</p>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={handleGoogleLogin}
                                    className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-ink font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                                    {t.google_btn}
                                </button>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white px-2 text-gray-400">{t.or}</span>
                                    </div>
                                </div>

                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div>
                                        <input
                                            type="email"
                                            placeholder={t.email_placeholder}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-ink text-white font-bold py-3 rounded-xl hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Mail size={20} />}
                                        {loading ? t.sending : t.email_btn}
                                    </button>
                                </form>

                                {message && (
                                    <div className={`p-3 rounded-lg text-sm text-center ${message.includes('Check') || message.includes('查收') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                        {message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
