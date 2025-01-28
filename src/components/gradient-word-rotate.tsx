"use client";

import { AnimatePresence, motion, MotionProps } from "motion/react";
import { useEffect, useState } from "react";
import { AuroraText } from "@/components/ui/aurora-text";

import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  motionProps?: MotionProps;
  className?: string;
}

export function GradientWordRotate({
  words,
  duration = 2500,
  motionProps = {
    initial: { opacity: 0, transform: "translateY(-50px) rotateX(-40deg)" },
    animate: { opacity: 1, transform: "translateY(-3px) rotateX(0deg)" },
    exit: { opacity: 0, transform: "translateY(50px) rotateX(40deg)" },
    transition: { 
      duration: 0.4,
      ease: [0.4, 0.0, 0.2, 1]
    },
  },
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className="overflow-hidden pt-2 perspective-[1000px]">
      <AuroraText className={cn("block align-middle", className)}>
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            {...motionProps}
            className="block py-2"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </AuroraText>
    </div>
  );
}
