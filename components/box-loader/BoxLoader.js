"use client";
import React, { useEffect, useRef } from "react";
import "./BoxLoader.css";

// Array of short code snippets to display randomly
const codeSnippets = [
    `function animate() {\n  requestAnimationFrame(animate);\n  renderer.render(scene, camera);\n}`,
    `const data = await fetch('/api/users');\nconst json = await data.json();\nconsole.log(json);`,
    `useEffect(() => {\n  setLoading(true);\n  fetchData();\n  return () => clearTimeout(timer);\n}, []);`,
    `export default function App() {\n  return (\n    <Main component={<Home />} />\n  );\n}`,
    `const calculateTotal = (items) => {\n  return items.reduce((sum, item) => \n    sum + item.price, 0);\n};`,
    `router.get('/profile/:id', async (req, res) => {\n  const user = await User.findById(req.params.id);\n  res.json(user);\n});`,
    `class Node {\n  constructor(val) {\n    this.val = val;\n    this.next = null;\n  }\n}`,
    `import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n}`,
    `async function loadUsers() {\n  try {\n    const data = await fetchUsers();\n    setUsers(data);\n  } catch (err) {}\n}`,
    `const styles = {\n  container: { display: 'flex' },\n  header: { fontSize: '24px' },\n  button: { padding: '8px' }\n};`,
];

const BoxLoader = () => {
    const animationContainerRef = useRef(null);
    const backgroundRef = useRef(null);

    useEffect(() => {
        const container = animationContainerRef.current;
        if (!container) return;

        // Animation sequence control
        const textElements = {
            first: {
                left: "PERSONAL",
                right: "PORTFOLIO",
            },
            second: {
                left: "MOHAMMAD",
                right: "ABDULLAH",
            },
        };

        const leftTextEl = container.querySelector(".text-left");
        const rightTextEl = container.querySelector(".text-right");

        // Animation timeline - run only once
        const startAnimation = () => {
            // Reset all elements
            const elements = container.querySelectorAll(".animated-element");
            elements.forEach((el) => {
                el.classList.remove("animate-out", "text-change", "text-hide");
                void el.offsetWidth; // Force reflow
                el.classList.add("animate-in");
            });

            // Set initial text
            leftTextEl.textContent = textElements.first.left;
            rightTextEl.textContent = textElements.first.right;

            // First text appears
            setTimeout(() => {
                const textContainers =
                    container.querySelectorAll(".text-container");
                textContainers.forEach((el) => {
                    el.classList.add("text-show");
                });
            }, 1800);

            // First text hides toward center line
            setTimeout(() => {
                const textContainers =
                    container.querySelectorAll(".text-container");
                textContainers.forEach((el) => {
                    el.classList.remove("text-show");
                    el.classList.add("text-hide");
                });
            }, 4000);

            // Change text content
            setTimeout(() => {
                leftTextEl.textContent = textElements.second.left;
                rightTextEl.textContent = textElements.second.right;

                const textContainers =
                    container.querySelectorAll(".text-container");
                textContainers.forEach((el) => {
                    el.classList.remove("text-hide");
                    el.classList.add("text-change", "text-show");
                });
            }, 5000);

            // Second text hides toward center line
            setTimeout(() => {
                const textContainers =
                    container.querySelectorAll(".text-container");
                textContainers.forEach((el) => {
                    el.classList.remove("text-show");
                    el.classList.add("text-hide");
                });
            }, 7000);

            // Begin final animation out sequence
            setTimeout(() => {
                const boxes = container.querySelector(".box-container");
                boxes.classList.remove("animate-in");
                boxes.classList.add("animate-out");
            }, 8000);

            setTimeout(() => {
                const line = container.querySelector(".center-line");
                line.classList.remove("animate-in");
                line.classList.add("animate-out");
            }, 9000);

            setTimeout(() => {
                const dot = container.querySelector(".dot");
                dot.classList.remove("animate-in");
                dot.classList.add("animate-out");
            }, 9500);

            // No restart - animation runs only once
        };

        // Start initial animation
        startAnimation();

        // Background code snippets animation
        const background = backgroundRef.current;
        if (!background) return;

        // Create and animate code snippets
        const usedPositions = new Set();

        const createCodeSnippet = () => {
            // Create element
            const codeElement = document.createElement("pre");
            codeElement.className = "code-snippet";

            // Random position
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

            // Random rotation
            const rotation = Math.random() * 10 - 5; // -5 to 5 degrees

            // Random size
            const size = Math.random() * 0.4 + 0.8; // 0.8-1.2 scale

            // Random snippet
            const snippetIndex = Math.floor(
                Math.random() * codeSnippets.length
            );

            // Set properties
            codeElement.style.left = `${posX}%`;
            codeElement.style.top = `${posY}%`;
            codeElement.style.transform = `rotate(${rotation}deg) scale(${size})`;
            codeElement.style.opacity = "0";
            codeElement.textContent = codeSnippets[snippetIndex];

            // Add to background
            background.appendChild(codeElement);

            // Animate in
            setTimeout(() => {
                codeElement.style.opacity = "0.15";
            }, 100);

            // Animate out and remove
            const lifespan = Math.random() * 5000 + 3000; // 3-8 seconds
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

        // Create new snippets periodically
        const snippetInterval = setInterval(() => {
            // Limit the number of code snippets on screen
            if (background.querySelectorAll(".code-snippet").length < 10) {
                createCodeSnippet();
            }
        }, 800);

        // Create initial batch
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createCodeSnippet(), i * 300);
        }

        // Cleanup on unmount
        return () => {
            clearInterval(snippetInterval);
            const timeouts = setTimeout(() => {}, 0);
            for (let i = 0; i < timeouts; i++) {
                clearTimeout(i);
            }
        };
    }, []);

    return (
        <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black w-full h-24 min-h-screen flex justify-center items-center font-bold bg-[length:200%_200%] animate-[gradient_8s_ease_infinite]">
            <div ref={backgroundRef} className="code-background"></div>
            <div ref={animationContainerRef} className="animation-container">
                <div className="dot animated-element"></div>
                <div className="center-line animated-element"></div>
                <div className="box-container animated-element">
                    <div className="box-left">
                        <div className="text-container text-container-left">
                            <div className="text text-left"></div>
                        </div>
                    </div>
                    <div className="box-right">
                        <div className="text-container text-container-right">
                            <div className="text text-right"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoxLoader;
