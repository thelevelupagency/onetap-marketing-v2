"use client";

import { motion, stagger, useAnimate } from "framer-motion";
import * as React from "react";

import { cn } from "@/lib/utils";

type TextGenerateEffectProps = Omit<React.ComponentProps<"div">, "children"> & {
  words: string;
  filter?: boolean;
  duration?: number;
  staggerDelay?: number;
  /** Consecutive words that receive extra classes (e.g. brand accent). */
  accentWords?: string;
  accentClassName?: string;
  /** Insert a mobile-only line break immediately before this word. */
  breakBeforeWord?: string;
};

function findSubsequenceStart(haystack: string[], needle: string[]): number {
  if (needle.length === 0) return -1;
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    if (needle.every((word, offset) => haystack[i + offset] === word)) {
      return i;
    }
  }
  return -1;
}

function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
  staggerDelay = 0.2,
  accentWords,
  accentClassName,
  breakBeforeWord,
  ...props
}: TextGenerateEffectProps) {
  const [scope, animate] = useAnimate();
  const wordsArray = React.useMemo(
    () => words.split(" ").filter((word) => word.length > 0),
    [words],
  );
  const accentParts = React.useMemo(
    () => accentWords?.split(" ").filter((word) => word.length > 0) ?? [],
    [accentWords],
  );
  const accentStart = React.useMemo(
    () => findSubsequenceStart(wordsArray, accentParts),
    [accentParts, wordsArray],
  );
  const breakIndex = React.useMemo(
    () => (breakBeforeWord ? wordsArray.indexOf(breakBeforeWord) : -1),
    [breakBeforeWord, wordsArray],
  );

  React.useEffect(() => {
    if (scope.current) {
      animate(
        "span[data-slot='text-generate-word']",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration,
          delay: stagger(staggerDelay),
        },
      );
    }
  }, [animate, duration, filter, scope, staggerDelay]);

  return (
    <div
      className={cn("font-bold", className)}
      data-slot="text-generate-effect"
      {...props}
    >
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          const isAccent =
            accentStart >= 0 &&
            idx >= accentStart &&
            idx < accentStart + accentParts.length;

          return (
            <React.Fragment key={`${word}-${idx}`}>
              {idx === breakIndex ? (
                <br className="block sm:hidden" />
              ) : null}
              <motion.span
                className={cn(
                  "opacity-0 will-change-transform will-change-opacity will-change-filter",
                  isAccent && accentClassName,
                )}
                data-slot="text-generate-word"
                style={{
                  filter: filter ? "blur(10px)" : "none",
                }}
              >
                {word}{" "}
              </motion.span>
            </React.Fragment>
          );
        })}
      </motion.div>
    </div>
  );
}

export { TextGenerateEffect, type TextGenerateEffectProps };
export default TextGenerateEffect;
