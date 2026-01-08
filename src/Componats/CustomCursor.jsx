import React, { useEffect, useState } from 'react';
import './CustomCursor.css';
import cursorImg from '../Img/Courser/pngimg.com - cricket_PNG95.png';

const CustomCursor = () => {
    const cursorRef = React.useRef(null);
    const positionRef = React.useRef({ x: 0, y: 0 });
    const mouseRef = React.useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            const { x: currentX, y: currentY } = positionRef.current;
            const { x: targetX, y: targetY } = mouseRef.current;

            // Linear interpolation (lerp) for smooth movement
            // Adjust 0.1 to change smoothness (lower = slower/smoother, higher = faster)
            const distX = targetX - currentX;
            const distY = targetY - currentY;

            positionRef.current.x = currentX + distX * 0.15;
            positionRef.current.y = currentY + distY * 0.15;

            if (cursorRef.current) {
                cursorRef.current.style.left = `${positionRef.current.x}px`;
                cursorRef.current.style.top = `${positionRef.current.y}px`;
            }

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="custom-cursor"
        >
            <img src={cursorImg} alt="cursor" className="cursor-img" />
        </div>
    );
};

export default CustomCursor;
