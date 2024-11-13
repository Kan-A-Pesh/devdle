"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({ text }: { text: string }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "0%" });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const svgRect = svgRef.current?.getBoundingClientRect();
            if (svgRect) {
                const cxPercentage = ((e.clientX - svgRect.left) / svgRect.width) * 100;
                const cyPercentage = ((e.clientY - svgRect.top) / svgRect.height) * 100;
                setMaskPosition({
                    cx: `${cxPercentage}%`,
                    cy: `${cyPercentage}%`,
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="fixed -z-40 inset-0 grid place-items-center opacity-40">
            <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg" className="select-none">
                <defs>
                    <linearGradient id="textGradient" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="25%">
                        <stop offset="0%" stopColor={"var(--yellow-500)"} />
                        <stop offset="25%" stopColor={"var(--red-500)"} />
                        <stop offset="50%" stopColor={"var(--blue-500)"} />
                        <stop offset="75%" stopColor={"var(--cyan-500)"} />
                        <stop offset="100%" stopColor={"var(--violet-500)"} />
                    </linearGradient>

                    <motion.radialGradient
                        id="revealMask"
                        gradientUnits="userSpaceOnUse"
                        r="20%"
                        animate={maskPosition}
                        // transition={{ duration: duration ?? 0, ease: "easeOut" }}

                        // example for a smoother animation below

                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 50,
                        }}
                    >
                        <stop offset="0%" stopColor="white" />
                        <stop offset="100%" stopColor="black" />
                    </motion.radialGradient>
                    <mask id="textMask">
                        <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
                    </mask>
                </defs>
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    strokeWidth="0.3"
                    className="font-[helvetica] font-bold stroke-neutral-200 dark:stroke-neutral-800 fill-transparent text-7xl opacity-70"
                >
                    {text}
                </text>
                <motion.text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    strokeWidth="0.3"
                    className="font-[helvetica] font-bold fill-transparent text-7xl   stroke-neutral-200 dark:stroke-neutral-800"
                    initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
                    animate={{
                        strokeDashoffset: 0,
                        strokeDasharray: 1000,
                    }}
                    transition={{
                        duration: 4,
                        ease: "easeInOut",
                    }}
                >
                    {text}
                </motion.text>
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    stroke="url(#textGradient)"
                    strokeWidth="0.3"
                    mask="url(#textMask)"
                    className="font-[helvetica] font-bold fill-transparent text-7xl  "
                >
                    {text}
                </text>
            </svg>
        </div>
    );
};
