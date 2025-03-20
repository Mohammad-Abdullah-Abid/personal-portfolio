"use client";
import React, { useEffect, useRef } from "react";

const AnimatedBox = ({
    firstText = { left: "PERSONAL", right: "PORTFOLIO" },
    secondText = { left: "MOHAMMAD", right: "ABDULLAH" },
    timings = {
        firstTextAppear: 1800,
        firstTextHide: 4000,
        secondTextAppear: 5000,
        secondTextHide: 7000,
        boxOut: 8000,
        lineOut: 9000,
        dotOut: 9500,
    },
}) => {
    const animationContainerRef = useRef(null);

    useEffect(() => {
        const container = animationContainerRef.current;
        if (!container) return;

        const textElements = { first: firstText, second: secondText };
        const leftTextEl = container.querySelector(".text-left");
        const rightTextEl = container.querySelector(".text-right");

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
            }, timings.firstTextAppear);

            // First text hides
            setTimeout(() => {
                const textContainers =
                    container.querySelectorAll(".text-container");
                textContainers.forEach((el) => {
                    el.classList.remove("text-show");
                    el.classList.add("text-hide");
                });
            }, timings.firstTextHide);

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
            }, timings.secondTextAppear);

            // Second text hides
            setTimeout(() => {
                const textContainers =
                    container.querySelectorAll(".text-container");
                textContainers.forEach((el) => {
                    el.classList.remove("text-show");
                    el.classList.add("text-hide");
                });
            }, timings.secondTextHide);

            // Animation out sequence
            setTimeout(() => {
                const boxes = container.querySelector(".box-container");
                boxes.classList.remove("animate-in");
                boxes.classList.add("animate-out");
            }, timings.boxOut);

            setTimeout(() => {
                const line = container.querySelector(".center-line");
                line.classList.remove("animate-in");
                line.classList.add("animate-out");
            }, timings.lineOut);

            setTimeout(() => {
                const dot = container.querySelector(".dot");
                dot.classList.remove("animate-in");
                dot.classList.add("animate-out");
            }, timings.dotOut);
        };

        startAnimation();
    }, [firstText, secondText, timings]);

    return (
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
    );
};

export default AnimatedBox;
