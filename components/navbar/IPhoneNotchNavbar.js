"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const IPhoneNotchNavbar = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [frontendHovered, setFrontendHovered] = useState(false);
    const [backendHovered, setBackendHovered] = useState(false);

    useEffect(() => {
        // Trigger the animation after component mounts
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: isLoaded ? 0 : -100 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
            }}
            className="fixed w-full flex justify-center top-[-1rem] z-50"
        >
            <motion.div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                animate={{
                    width: 300,
                    height: isHovered ? 60 : 85,
                    borderRadius: isHovered ? 30 : 24,
                    y: isHovered ? 30 : 0,
                    paddingTop: isHovered ? 0 : 10,
                }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 30,
                }}
                className="relative flex items-center justify-center bg-deep-black px-6"
                style={{
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                }}
            >
                {/* Camera dot in center */}
                <motion.div
                    className="absolute top-[calc(50%+5px)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#fe003c] z-20"
                    animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [
                            "0 0 0px #fe003c",
                            "0 0 8px #fe003c",
                            "0 0 0px #fe003c",
                        ],
                        top: isHovered ? "50%" : "55%",
                    }}
                    transition={{
                        duration: 0,
                        repeat: 0,
                        ease: "easeIn",
                    }}
                >
                    <motion.div
                        className="absolute inset-0 w-full h-full rounded-full bg-[#550003]"
                        animate={{ opacity: [0.5, 0.2, 0.5] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </motion.div>

                {/* Left button - Frontend */}
                <motion.div
                    className="absolute left-6 flex items-center justify-center"
                    animate={{
                        scale: isHovered ? 1.05 : 1,
                        x: isHovered ? -8 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 10, damping: 25 }}
                    onMouseEnter={() => setFrontendHovered(true)}
                    onMouseLeave={() => setFrontendHovered(false)}
                >
                    {/* Double-layered approach for gradient border */}
                    <motion.div
                        className="relative w-20 h-8 rounded-full"
                        style={{ padding: "2px" }} // Border thickness
                        animate={{
                            background: frontendHovered
                                ? "linear-gradient(90deg, #550003 0%, #fe003c 50%, #550003 100%)"
                                : "linear-gradient(90deg, #550003 0%, #fe003c 100%)",
                            backgroundSize: "200% 200%",
                            backgroundPosition: frontendHovered
                                ? ["0% 50%", "100% 50%", "0% 50%"]
                                : "0% 50%",
                        }}
                        transition={{
                            duration: frontendHovered ? 1.5 : 0.5,
                            repeat: frontendHovered ? Infinity : 0,
                            ease: "linear",
                        }}
                        whileHover={{ scale: 1.05 }}
                    >
                        {/* Inner content */}
                        <div className="w-full h-full rounded-full bg-[#111216] flex items-center justify-center">
                            <span className="text-white text-xs font-medium z-10">
                                Frontend
                            </span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right button - Backend */}
                <motion.div
                    className="absolute right-6 flex items-center justify-center"
                    animate={{
                        scale: isHovered ? 1.05 : 1,
                        x: isHovered ? 8 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 10, damping: 25 }}
                    onMouseEnter={() => setBackendHovered(true)}
                    onMouseLeave={() => setBackendHovered(false)}
                >
                    {/* Double-layered approach for gradient border */}
                    <motion.div
                        className="relative w-20 h-8 rounded-full"
                        style={{ padding: "2px" }} // Border thickness
                        animate={{
                            background: backendHovered
                                ? "linear-gradient(90deg, #550003 0%, #fe003c 50%, #550003 100%)"
                                : "linear-gradient(90deg, #550003 0%, #fe003c 100%)",
                            backgroundSize: "200% 200%",
                            backgroundPosition: backendHovered
                                ? ["0% 50%", "100% 50%", "0% 50%"]
                                : "0% 50%",
                        }}
                        transition={{
                            duration: backendHovered ? 1.5 : 0.5,
                            repeat: backendHovered ? Infinity : 0,
                            ease: "linear",
                        }}
                        whileHover={{ scale: 1.05 }}
                    >
                        {/* Inner content */}
                        <div className="w-full h-full rounded-full bg-[#111216] flex items-center justify-center">
                            <span className="text-white text-xs font-medium z-10">
                                Backend
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default IPhoneNotchNavbar;
