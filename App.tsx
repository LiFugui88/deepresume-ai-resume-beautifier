import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ResumeBuilder from './components/ResumeBuilder';
import { Pricing } from './components/Pricing';
import { PrivacyPage, TermsPage, RefundPage } from './components/LegalPages';
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
        </Routes>
    );
};

export default App;
