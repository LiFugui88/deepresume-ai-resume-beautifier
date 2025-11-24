import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ResumeBuilder from './components/ResumeBuilder';
import { Pricing } from './components/Pricing';
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
        </Routes>
    );
};

export default App;
