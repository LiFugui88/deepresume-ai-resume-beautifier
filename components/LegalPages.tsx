import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { ArrowLeft } from 'lucide-react';

const LegalLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="min-h-screen bg-paper font-body relative">
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
                Back to App
            </Link>
        </nav>

        <main className="pt-32 pb-20 px-4 max-w-3xl mx-auto">
            <h1 className="font-display text-4xl font-bold text-ink mb-8">{title}</h1>
            <div className="prose prose-blue max-w-none text-ink-light">
                {children}
            </div>
        </main>

        <footer className="py-8 text-center text-ink-light/40 text-[10px] font-mono uppercase tracking-widest">
            <p>© 2025 DeepResume AI. All rights reserved.</p>
        </footer>
    </div>
);

export const PrivacyPage: React.FC = () => (
    <LegalLayout title="Privacy Policy">
        <p><strong>Last Updated: November 2025</strong></p>
        <p>Welcome to DeepResume ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.</p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h3>
        <ul className="list-disc pl-5 space-y-2">
            <li><strong>Personal Information:</strong> When you use our resume builder, we collect the information you include in your resume, such as your name, contact details, education history, work experience, and skills.</li>
            <li><strong>Usage Data:</strong> We automatically collect certain information about your device and how you interact with our website, including your IP address, browser type, and pages visited.</li>
            <li><strong>Payment Information:</strong> If you purchase our premium services, our third-party payment processor (Creem) collects your payment details. We do not store your full credit card information.</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h3>
        <p>We use your information to:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li>Provide, maintain, and improve our services.</li>
            <li>Generate and optimize your resume using AI technology.</li>
            <li>Process transactions and send related information.</li>
            <li>Respond to your comments, questions, and requests.</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Data Sharing and Disclosure</h3>
        <p>We do not sell your personal information. We may share your data with:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li><strong>Service Providers:</strong> Third-party vendors who help us operate our business (e.g., AI providers, payment processors, analytics services).</li>
            <li><strong>Legal Requirements:</strong> If required by law or to protect our rights and safety.</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Data Security</h3>
        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Your Rights</h3>
        <p>Depending on your location, you may have the right to access, correct, delete, or restrict the use of your personal information. Contact us to exercise these rights.</p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, please contact us at deepresume@deep-resume.xyz.</p>
    </LegalLayout>
);

export const TermsPage: React.FC = () => (
    <LegalLayout title="Terms of Service">
        <p><strong>Last Updated: November 2025</strong></p>
        <p>Please read these Terms of Service ("Terms") carefully before using DeepResume.</p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h3>
        <p>By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use our services.</p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Use of Services</h3>
        <p>You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for the accuracy of the information you provide in your resume.</p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Intellectual Property</h3>
        <p>The content, features, and functionality of DeepResume are owned by us and are protected by international copyright, trademark, and other intellectual property laws. You retain ownership of the content you submit to create your resume.</p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. User Accounts</h3>
        <p>You may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Payment and Refunds</h3>
        <p>Premium features are billed in advance. All fees are non-refundable unless otherwise required by law.</p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Limitation of Liability</h3>
        <p>To the fullest extent permitted by law, DeepResume shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.</p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">7. Changes to Terms</h3>
        <p>We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page.</p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">8. Contact Us</h3>
        <p>If you have any questions about these Terms, please contact us at deepresume@deep-resume.xyz.</p>
    </LegalLayout>
);

export const RefundPage: React.FC = () => (
    <LegalLayout title="Refund Policy">
        <p><strong>Last Updated: November 2025</strong></p>
        <p>At DeepResume, we strive to provide the best AI-powered resume beautification service. However, we understand that things may not always go as planned.</p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Refund Eligibility</h3>
        <p>We offer refunds under the following circumstances:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li><strong>Technical Issues:</strong> If you are unable to use the service due to a technical error on our end that we cannot resolve within a reasonable timeframe.</li>
            <li><strong>Accidental Duplicate Purchase:</strong> If you were charged twice for the same service.</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Non-Refundable Circumstances</h3>
        <p>Refunds are generally not granted for:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li><strong>Change of Mind:</strong> If you decide you no longer need the service after purchase.</li>
            <li><strong>Dissatisfaction with Design:</strong> Since you can preview designs before purchase (or use free versions), we do not refund based on style preference alone.</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. How to Request a Refund</h3>
        <p>To request a refund, please contact our support team at deepresume@deep-resume.xyz with your order details and the reason for your request. We will review your request and respond within 3-5 business days.</p>
    </LegalLayout>
);
