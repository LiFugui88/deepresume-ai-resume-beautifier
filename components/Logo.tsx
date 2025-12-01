import React from 'react';

interface LogoProps {
    className?: string;
    size?: number | string;
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 32 }) => {
    return (
        <img
            src="/cvgopro-logo.png"
            alt="CVGoPro - AI Resume Beautifier Logo"
            className={`rounded-lg ${className}`}
            style={{
                width: typeof size === 'number' ? `${size}px` : size,
                height: 'auto',
                objectFit: 'contain'
            }}
        />
    );
};