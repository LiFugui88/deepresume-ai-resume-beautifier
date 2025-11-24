import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden"
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <div className="p-6 overflow-y-auto custom-scrollbar text-sm text-gray-600 leading-relaxed space-y-4">
                        {children}
                    </div>
                    <div className="p-6 border-t border-gray-100 bg-gray-50">
                        <button
                            onClick={onClose}
                            className="w-full py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export const PrivacyPolicyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Privacy Policy">
        <p><strong>Last Updated: November 2025</strong></p>
        <p>Welcome to DeepResume ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.</p>

        <h3 className="text-lg font-bold text-gray-900 mt-4">1. Information We Collect</h3>
        <ul className="list-disc pl-5 space-y-1">
            <li><strong>Personal Information:</strong> When you use our resume builder, we collect the information you include in your resume, such as your name, contact details, education history, work experience, and skills.</li>
            <li><strong>Usage Data:</strong> We automatically collect certain information about your device and how you interact with our website, including your IP address, browser type, and pages visited.</li>
            <li><strong>Payment Information:</strong> If you purchase our premium services, our third-party payment processor (Creem) collects your payment details. We do not store your full credit card information.</li>
        </ul>

        <h3 className="text-lg font-bold text-gray-900 mt-4">2. How We Use Your Information</h3>
        <p>We use your information to:</p>
        <ul className="list-disc pl-5 space-y-1">
            <li>Provide, maintain, and improve our services.</li>
            <li>Generate and optimize your resume using AI technology.</li>
            <li>Process transactions and send related information.</li>
            <li>Respond to your comments, questions, and requests.</li>
        </ul>

        <h3 className="text-lg font-bold text-gray-900 mt-4">3. Data Sharing and Disclosure</h3>
        <p>We do not sell your personal information. We may share your data with:</p>
        <ul className="list-disc pl-5 space-y-1">
            <li><strong>Service Providers:</strong> Third-party vendors who help us operate our business (e.g., AI providers, payment processors, analytics services).</li>
            <li><strong>Legal Requirements:</strong> If required by law or to protect our rights and safety.</li>
        </ul>

        <h3 className="text-lg font-bold text-gray-900 mt-4">4. Data Security</h3>
        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

        <h3 className="text-lg font-bold text-gray-900 mt-4">5. Your Rights</h3>
        <p>Depending on your location, you may have the right to access, correct, delete, or restrict the use of your personal information. Contact us to exercise these rights.</p>

        <h3 className="text-lg font-bold text-gray-900 mt-4">6. Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, please contact us at support@deepresume.ai.</p>
    </Modal>
);

export const TermsOfServiceModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Terms of Service">
        <p><strong>Last Updated: November 2025</strong></p>
        <p>Please read these Terms of Service ("Terms") carefully before using DeepResume.</p>

        <h3 className="text-lg font-bold text-gray-900 mt-4">1. Acceptance of Terms</h3>
        <p>By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use our services.</p>

        <h3 className="text-lg font-bold text-gray-900 mt-4">2. Use of Services</h3>
        <p>You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for the accuracy of the information you provide in your resume.</p>

        <h3 className="text-lg font-bold text-gray-900 mt-4">3. Intellectual Property</h3>
        <p>The content, features, and functionality of DeepResume are owned by us and are protected by international copyright, trademark, and other intellectual property laws. You retain ownership of the content you submit to create your resume.</p>

        <h3 className="text-lg font-bold text-gray-900 mt-4">4. User Accounts</h3>
        <p>You may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

        <h3 className="text-lg font-bold text-gray-900 mt-4">5. Payment and Refunds</h3>
        <p>Premium features are billed in advance. All fees are non-refundable unless otherwise required by law.</p>

        <h3 className="text-lg font-bold text-gray-900 mt-4">6. Limitation of Liability</h3>
        <p>To the fullest extent permitted by law, DeepResume shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.</p>

        <h3 className="text-lg font-bold text-gray-900 mt-4">7. Changes to Terms</h3>
        <p>We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page.</p>

        <h3 className="text-lg font-bold text-gray-900 mt-4">8. Contact Us</h3>
        <p>If you have any questions about these Terms, please contact us at support@deepresume.ai.</p>
    </Modal>
);
