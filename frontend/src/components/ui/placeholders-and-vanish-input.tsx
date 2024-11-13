"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function PlaceholdersAndVanishInput({ values, onValueSubmit }: { values: string[]; onValueSubmit: (id: number) => void }) {
    const lowerValues = values.map((value) => value.toLowerCase());
    const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
    const [value, setValue] = useState("");

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const startAnimation = useCallback(() => {
        intervalRef.current = setInterval(() => {
            if (!value) setCurrentPlaceholder((prev) => (prev + 1) % values.length);
        }, 3000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [value, values.length]);

    const handleVisibilityChange = useCallback(() => {
        if (document.visibilityState !== "visible" && intervalRef.current) {
            clearInterval(intervalRef.current); // Clear the interval when the tab is not visible
            intervalRef.current = null;
        } else if (document.visibilityState === "visible") {
            startAnimation(); // Restart the interval when the tab becomes visible
        }
    }, [startAnimation]);

    useEffect(() => {
        startAnimation();
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [values, handleVisibilityChange, startAnimation]);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const newDataRef = useRef<{ x: number; y: number; r: number; color: string }[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const [animating, setAnimating] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const draw = useCallback(() => {
        if (!inputRef.current) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = 800;
        canvas.height = 800;
        ctx.clearRect(0, 0, 800, 800);
        const computedStyles = getComputedStyle(inputRef.current);

        const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
        ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
        ctx.fillStyle = "#FFF";
        ctx.fillText(value, 16, 40);

        const imageData = ctx.getImageData(0, 0, 800, 800);
        const pixelData = imageData.data;
        const newData: {
            x: number;
            y: number;
            color: number[];
        }[] = [];

        for (let t = 0; t < 800; t++) {
            const i = 4 * t * 800;
            for (let n = 0; n < 800; n++) {
                const e = i + 4 * n;
                if (pixelData[e] !== 0 && pixelData[e + 1] !== 0 && pixelData[e + 2] !== 0) {
                    newData.push({
                        x: n,
                        y: t,
                        color: [pixelData[e], pixelData[e + 1], pixelData[e + 2], pixelData[e + 3]],
                    });
                }
            }
        }

        newDataRef.current = newData.map(({ x, y, color }) => ({
            x,
            y,
            r: 1,
            color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
        }));
    }, [value]);

    useEffect(() => {
        draw();
    }, [value, draw]);

    // Suggestions
    // - starts with value (first order)
    // - contains value (second order)
    const lowerValue = value.toLowerCase();
    const suggestions = values
        .filter((_, i) => lowerValues[i].includes(lowerValue))
        .sort((a, b) => {
            if (a.toLowerCase().startsWith(lowerValue)) return -1;
            if (b.toLowerCase().startsWith(lowerValue)) return 1;
            return 0;
        });

    const animate = (start: number) => {
        const animateFrame = (pos: number = 0) => {
            requestAnimationFrame(() => {
                const newArr = [];
                for (let i = 0; i < newDataRef.current.length; i++) {
                    const current = newDataRef.current[i];
                    if (current.x < pos) {
                        newArr.push(current);
                    } else {
                        if (current.r <= 0) {
                            current.r = 0;
                            continue;
                        }
                        current.x += Math.random() > 0.5 ? 1 : -1;
                        current.y += Math.random() > 0.5 ? 1 : -1;
                        current.r -= 0.05 * Math.random();
                        newArr.push(current);
                    }
                }
                newDataRef.current = newArr;
                const ctx = canvasRef.current?.getContext("2d");
                if (ctx) {
                    ctx.clearRect(pos, 0, 800, 800);
                    newDataRef.current.forEach((t) => {
                        const { x: n, y: i, r: s, color: color } = t;
                        if (n > pos) {
                            ctx.beginPath();
                            ctx.rect(n, i, s, s);
                            ctx.fillStyle = color;
                            ctx.strokeStyle = color;
                            ctx.stroke();
                        }
                    });
                }
                if (newDataRef.current.length > 0) {
                    animateFrame(pos - 8);
                } else {
                    setValue("");
                    setSelectedOption(null);
                    setAnimating(false);
                }
            });
        };
        animateFrame(start);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter" && !animating) {
            if (selectedOption !== null) {
                setValue(suggestions[selectedOption]);
                setSelectedOption(null);
            } else if (lowerValues.includes(lowerValue)) {
                handleSubmit();
            }
        } else if (e.code === "Escape") {
            if (inputRef.current) {
                inputRef.current.blur();
            }
        } else if (e.code === "ArrowUp") {
            e.preventDefault();

            const prev = selectedOption ?? suggestions.length;
            const next = (prev - 1 + suggestions.length) % suggestions.length;
            setSelectedOption(next);

            document.querySelector("div[data-id='suggestions']")?.scrollTo({
                top: next * 40,
                behavior: "smooth",
            });
        } else if (e.code === "ArrowDown") {
            e.preventDefault();

            const prev = selectedOption ?? -1;
            const next = (prev + 1) % suggestions.length;
            setSelectedOption(next);

            document.querySelector("div[data-id='suggestions']")?.scrollTo({
                top: next * 40,
                behavior: "instant",
            });
        }
    };

    const vanishAndSubmit = () => {
        setAnimating(true);
        draw();

        const value = inputRef.current?.value || "";
        if (value && inputRef.current) {
            const maxX = newDataRef.current.reduce((prev, current) => (current.x > prev ? current.x : prev), 0);
            animate(maxX);
        }
    };

    const handleSubmit = () => {
        vanishAndSubmit();
        if (onValueSubmit) {
            const id = lowerValues.indexOf(lowerValue);
            if (id !== -1) {
                onValueSubmit(id);
            }
        }
    };

    return (
        <div className="w-full relative max-w-xl">
            <div
                className={cn(
                    "w-full relative max-w-xl mx-auto bg-white dark:bg-zinc-800 h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200",
                    value && "bg-gray-50",
                )}
            >
                <canvas
                    className={cn(
                        "absolute pointer-events-none  text-base transform scale-50 top-[20%] left-2 sm:left-8 origin-top-left filter invert dark:invert-0 pr-20",
                        !animating ? "opacity-0" : "opacity-100",
                    )}
                    ref={canvasRef}
                />
                <input
                    onChange={(e) => {
                        if (!animating) {
                            setValue(e.target.value);
                            setSelectedOption(null);
                        }
                    }}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                    value={value}
                    type="text"
                    className={cn(
                        "w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20",
                        animating && "text-transparent dark:text-transparent",
                    )}
                />

                <button
                    disabled={!value}
                    type="submit"
                    className="absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-gray-100 bg-black dark:bg-zinc-900 dark:disabled:bg-zinc-800 transition duration-200 flex items-center justify-center"
                >
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-300 h-4 w-4"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <motion.path
                            d="M5 12l14 0"
                            initial={{
                                strokeDasharray: "50%",
                                strokeDashoffset: "50%",
                            }}
                            animate={{
                                strokeDashoffset: value ? 0 : "50%",
                            }}
                            transition={{
                                duration: 0.3,
                                ease: "linear",
                            }}
                        />
                        <path d="M13 18l6 -6" />
                        <path d="M13 6l6 6" />
                    </motion.svg>
                </button>

                <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
                    <AnimatePresence mode="wait">
                        {!value && (
                            <motion.p
                                initial={{
                                    y: 5,
                                    opacity: 0,
                                }}
                                key={`current-placeholder-${currentPlaceholder}`}
                                animate={{
                                    y: 0,
                                    opacity: 1,
                                }}
                                exit={{
                                    y: -15,
                                    opacity: 0,
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "linear",
                                }}
                                className="dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate"
                            >
                                {values[currentPlaceholder]}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {value && suggestions.length > 0 && (
                <div
                    className="absolute top-14 w-full flex flex-col bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl max-h-96 overflow-y-auto"
                    data-id="suggestions"
                >
                    {suggestions.map((option, idx) => (
                        <button
                            key={option}
                            data-id={idx}
                            onClick={() => setValue(option)}
                            className={cn(
                                "px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl",
                                idx === selectedOption && "bg-slate-200 dark:bg-slate-700",
                            )}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
