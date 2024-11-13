import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { CanvasRevealEffect } from "./ui/canvas-reveal-effect";
import { cn } from "@/lib/utils";

export default function CanvasCard({
    children,
    className,
    canvasClassName,
    canvasColor,
}: {
    children?: React.ReactNode;
    className?: string;
    canvasClassName?: string;
    canvasColor?: number[];
}) {
    const [hovered, setHovered] = useState(0);
    return (
        <div
            onMouseEnter={() => setHovered((prev) => prev + 1)}
            className={cn(
                "border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full p-4 relative h-[30rem]",
                className,
            )}
        >
            <PlusIcon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
            <PlusIcon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
            <PlusIcon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
            <PlusIcon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

            <div className="h-full w-full absolute inset-0 opacity-100 group-hover/canvas-card:opacity-0 transition-all duration-300 ease-in-out">
                <CanvasRevealEffect
                    animationSpeed={3}
                    containerClassName={canvasClassName ?? "bg-white"}
                    colors={[canvasColor ?? [0, 0, 0]]}
                    opacities={[0.2, 0.4, 1]}
                    dotSize={4}
                    key={hovered.toString()}
                />
            </div>

            <div className="relative z-20 opacity-0 group-hover/canvas-card:opacity-100 transition-all duration-300 ease-in-out">
                {children}
            </div>
        </div>
    );
}
