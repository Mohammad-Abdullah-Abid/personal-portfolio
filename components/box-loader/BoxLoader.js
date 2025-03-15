"use client";
import React, { useEffect, useRef } from "react";
import "./BoxLoader.css";

const BoxLoader = () => {
    const animationContainerRef = useRef(null);

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

        // Cleanup on unmount
        return () => {
            const timeouts = setTimeout(() => {}, 0);
            for (let i = 0; i < timeouts; i++) {
                clearTimeout(i);
            }
        };
    }, []);

    return (
        <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black w-full h-24 min-h-screen flex justify-center items-center font-bold bg-[length:200%_200%] animate-[gradient_8s_ease_infinite]">
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
