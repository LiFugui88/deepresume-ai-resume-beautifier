import React from 'react';

interface LogoProps {
    className?: string;
    size?: number | string;
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 32 }) => {
    return (
        <svg 
            viewBox="0 0 300 220" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={{ 
                width: typeof size === 'number' ? `${size}px` : size,
                height: 'auto'
            }}
        >
            {/* Top Right: Blue Block */}
            <rect x="100" y="0" width="200" height="140" fill="#002FA7" />
            
            {/* Bottom Left: Red Square */}
            <rect x="0" y="150" width="70" height="70" fill="#ca0000" />
            
            {/* DEEP Vertical Text (Rotated) */}
            <text 
                transform="translate(70, 140) rotate(-90)" 
                fill="#0F172A" 
                fontFamily="serif" 
                fontSize="60" 
                fontWeight="bold"
            >
                DEEP
            </text>
            
            {/* RESUME Horizontal Text */}
            <text 
                x="100" 
                y="200" 
                fill="#0F172A" 
                fontFamily="serif" 
                fontSize="55" 
                fontWeight="bold"
                letterSpacing="0.05em"
            >
                RESUME
            </text>
        </svg>
    );
};