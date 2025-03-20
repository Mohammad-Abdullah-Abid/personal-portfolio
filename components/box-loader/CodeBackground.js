"use client";
import React, { useEffect, useRef } from "react";

const CodeBackground = ({
    snippets,
    maxSnippets = 10,
    interval = 800,
    initialBatch = 5,
}) => {
    const backgroundRef = useRef(null);

    useEffect(() => {
        const background = backgroundRef.current;
        if (!background || !snippets.length) return;

        const usedPositions = new Set();

        const createCodeSnippet = () => {
            const codeElement = document.createElement("pre");
            codeElement.className = "code-snippet";

            const pos = [
                { x: 10, y: 10 },
                { x: 30, y: 30 },
                { x: 50, y: 50 },
                { x: 70, y: 70 },
                { x: 90, y: 90 },
                { x: 10, y: 90 },
                { x: 90, y: 10 },
                { x: 30, y: 70 },
                { x: 70, y: 30 },
                { x: 50, y: 10 },
            ];

            let randomPos;
            do {
                randomPos = pos[Math.floor(Math.random() * pos.length)];
            } while (usedPositions.has(`${randomPos.x}-${randomPos.y}`));

            const posX = randomPos.x;
            const posY = randomPos.y;

            usedPositions.add(`${posX}-${posY}`);

            const rotation = Math.random() * 10 - 5;
            const size = Math.random() * 0.4 + 0.8;
            const snippetIndex = Math.floor(Math.random() * snippets.length);

            codeElement.style.left = `${posX}%`;
            codeElement.style.top = `${posY}%`;
            codeElement.style.transform = `rotate(${rotation}deg) scale(${size})`;
            codeElement.style.opacity = "0";
            codeElement.textContent = snippets[snippetIndex];

            background.appendChild(codeElement);

            setTimeout(() => {
                codeElement.style.opacity = "0.15";
            }, 100);

            const lifespan = Math.random() * 5000 + 3000;
            setTimeout(() => {
                codeElement.style.opacity = "0";
                setTimeout(() => {
                    if (background.contains(codeElement)) {
                        background.removeChild(codeElement);
                        usedPositions.delete(`${posX}-${posY}`);
                    }
                }, 1000);
            }, lifespan);
        };

        const snippetInterval = setInterval(() => {
            if (
                background.querySelectorAll(".code-snippet").length <
                maxSnippets
            ) {
                createCodeSnippet();
            }
        }, interval);

        for (let i = 0; i < initialBatch; i++) {
            setTimeout(() => createCodeSnippet(), i * 300);
        }

        return () => {
            clearInterval(snippetInterval);
            const timeouts = setTimeout(() => {}, 0);
            for (let i = 0; i < timeouts; i++) {
                clearTimeout(i);
            }
        };
    }, [snippets, maxSnippets, interval, initialBatch]);

    return <div ref={backgroundRef} className="code-background"></div>;
};

export default CodeBackground;
