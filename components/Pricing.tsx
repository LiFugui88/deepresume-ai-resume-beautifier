import React from 'react';
import { CheckCircle2, Zap, Layout, Download, Star, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export const Pricing: React.FC = () => {
    const features = [
        {
            icon: <Zap className="text-yellow-500" />,
            title: "Unlimited AI Generation",
            desc: "Generate as many resumes as you need with our advanced Gemini AI."
        },
        {
            icon: <Layout className="text-blue-500" />,
            title: "All Premium Templates",
            desc: "Access our exclusive Bento and Gradient style collections."
        },
        {
            icon: <Download className="text-green-500" />,
            title: "Unlimited PDF Downloads",
            desc: "Export high-quality PDFs without any watermarks."
        },
        {
            icon: <Star className="text-purple-500" />,
            title: "Priority Support",
            desc: "Get faster responses from our dedicated support team."
        }
    ];

    return (
        <div className="min-h-screen bg-paper font-body relative overflow-hidden">
            {/* Background Grid */}
            <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-40 pointer-events-none" />

            {/* Nav */}
            <nav className="fixed top-0 left-0 w-full h-16 border-b border-ink/10 bg-paper/80 backdrop-blur-md z-50 flex items-center justify-between px-6 md:px-12">
                <Link to="/" className="flex items-center gap-3 cursor-pointer group">
                    <Logo size={32} />
                    <div className="flex flex-col">
                        <span className="font-display font-bold text-lg tracking-tight leading-none text-ink group-hover:text-accent transition-colors">DeepResume</span>
                    </div>
                </Link>
                <Link to="/" className="flex items-center gap-2 text-sm font-bold text-ink hover:text-accent transition-colors">
                    <ArrowLeft size={16} />
                    Back to Builder
                </Link>
            </nav>

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center space-y-6 mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block"
                        >
                            <span className="bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-accent/20">
                                Simple Pricing
                            </span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-display text-5xl md:text-6xl font-bold text-ink"
                        >
                            One Payment.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-600">Lifetime Access.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-ink-light max-w-2xl mx-auto"
                        >
                            No subscriptions. No hidden fees. Just a one-time payment of <span className="font-bold text-ink">$9.99</span> to unlock everything forever.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-3xl shadow-xl border border-ink/5 overflow-hidden relative"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent to-purple-600" />

                        <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                            <div className="space-y-8">
                                <h3 className="font-display text-2xl font-bold text-ink">Everything included:</h3>
                                <div className="grid gap-6">
                                    {features.map((feature, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <div className="shrink-0 w-10 h-10 rounded-xl bg-paper flex items-center justify-center">
                                                {feature.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-ink">{feature.title}</h4>
                                                <p className="text-sm text-ink-light">{feature.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-paper rounded-2xl p-8 flex flex-col justify-center items-center text-center space-y-6 border border-ink/5">
                                <div>
                                    <p className="text-sm text-ink-light font-bold uppercase tracking-widest mb-2">LIFETIME MEMBERSHIP</p>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-5xl font-bold text-ink">$9.99</span>
                                        <span className="text-ink-light">USD</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => alert("Payment system is currently undergoing scheduled maintenance/upgrades. Please check back later.")}
                                    className="w-full bg-gray-400 text-white py-4 rounded-xl font-bold text-lg cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <Zap size={20} />
                                    Upgrading Payment System...
                                </button>

                                <p className="text-xs text-ink-light/60">
                                    Secure payment via Stripe/Creem. 30-day money-back guarantee.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <footer className="py-8 text-center text-ink-light/40 text-[10px] font-mono uppercase tracking-widest">
                <p>© 2025 DeepResume AI. All rights reserved.</p>
            </footer>
        </div>
    );
};
