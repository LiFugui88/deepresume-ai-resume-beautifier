import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ResumeBuilder from './components/ResumeBuilder';
import { Pricing } from './components/Pricing';
import { PrivacyPage, TermsPage, RefundPage } from './components/LegalPages';
import { TemplatesIndexPage } from './components/TemplatesIndexPage';
import { TemplateLandingPage } from './components/TemplateLandingPage';
import { useEffect } from 'react';

const App: React.FC = () => {
    const location = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <Routes>
            <Route path="/" element={<ResumeBuilder />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/refund" element={<RefundPage />} />
            <Route path="/templates" element={<TemplatesIndexPage />} />
            <Route path="/templates/:slug" element={<TemplateLandingPage />} />
        </Routes>
    );
};

export default App;
