"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(16, 24, 40)",
  gradientBackgroundEnd = "rgb(16, 24, 40)",
  firstColor = "45, 225, 194",
  secondColor = "30, 58, 138",
  thirdColor = "45, 225, 194",
  fourthColor = "16, 24, 40",
  fifthColor = "45, 225, 194",
  pointerColor = "45, 225, 194",
  size = "80%",
  blendingValue = "soft-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);

  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let x = 0;
    let y = 0;

    const move = () => {
      if (!interactiveRef.current) return;
      
      x += (tgX - x) / 20;
      y += (tgY - y) / 20;
      
      interactiveRef.current.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
      
      animationFrameId = requestAnimationFrame(move);
    };

    move();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [tgX, tgY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  const styles = {
    "--gradient-background-start": gradientBackgroundStart,
    "--gradient-background-end": gradientBackgroundEnd,
    "--first-color": firstColor,
    "--second-color": secondColor,
    "--third-color": thirdColor,
    "--fourth-color": fourthColor,
    "--fifth-color": fifthColor,
    "--pointer-color": pointerColor,
    "--size": size,
    "--blending-value": blendingValue,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "h-full w-full relative overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName
      )}
      style={styles}
    >
      <div className={cn("relative z-10", className)}>{children}</div>
      <div
        className={cn(
          "gradients-container h-full w-full absolute inset-0 blur-3xl",
          isSafari ? "blur-3xl" : "blur-[100px]"
        )}
      >
        <div
          style={{
            background: `radial-gradient(circle at center, rgba(var(--first-color), 0.45) 0, rgba(var(--first-color), 0) 50%) no-repeat`,
            mixBlendMode: blendingValue as any,
            width: `var(--size)`,
            height: `var(--size)`,
            top: `calc(50% - var(--size) / 2)`,
            left: `calc(50% - var(--size) / 2)`,
            transformOrigin: "center center",
            animation: "moveVertical 30s ease infinite",
          }}
          className="absolute opacity-100"
        ></div>
        <div
          style={{
            background: `radial-gradient(circle at center, rgba(var(--second-color), 0.45) 0, rgba(var(--second-color), 0) 50%) no-repeat`,
            mixBlendMode: blendingValue as any,
            width: `var(--size)`,
            height: `var(--size)`,
            top: `calc(50% - var(--size) / 2)`,
            left: `calc(50% - var(--size) / 2)`,
            transformOrigin: "calc(50% - 400px)",
            animation: "moveInCircle 20s reverse infinite",
          }}
          className="absolute opacity-100"
        ></div>
        <div
          style={{
            background: `radial-gradient(circle at center, rgba(var(--third-color), 0.45) 0, rgba(var(--third-color), 0) 50%) no-repeat`,
            mixBlendMode: blendingValue as any,
            width: `var(--size)`,
            height: `var(--size)`,
            top: `calc(50% - var(--size) / 2)`,
            left: `calc(50% - var(--size) / 2)`,
            transformOrigin: "calc(50% + 400px)",
            animation: "moveInCircle 40s linear infinite",
          }}
          className="absolute opacity-100"
        ></div>
        <div
          style={{
            background: `radial-gradient(circle at center, rgba(var(--fourth-color), 0.45) 0, rgba(var(--fourth-color), 0) 50%) no-repeat`,
            mixBlendMode: blendingValue as any,
            width: `var(--size)`,
            height: `var(--size)`,
            top: `calc(50% - var(--size) / 2)`,
            left: `calc(50% - var(--size) / 2)`,
            transformOrigin: "calc(50% - 200px)",
            animation: "moveHorizontal 40s ease infinite",
          }}
          className="absolute opacity-70"
        ></div>
        <div
          style={{
            background: `radial-gradient(circle at center, rgba(var(--fifth-color), 0.45) 0, rgba(var(--fifth-color), 0) 50%) no-repeat`,
            mixBlendMode: blendingValue as any,
            width: `var(--size)`,
            height: `var(--size)`,
            top: `calc(50% - var(--size) / 2)`,
            left: `calc(50% - var(--size) / 2)`,
            transformOrigin: "calc(50% - 800px) calc(50% + 200px)",
            animation: "moveInCircle 20s ease infinite",
          }}
          className="absolute opacity-100"
        ></div>

        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            style={{
              background: `radial-gradient(circle at center, rgba(var(--pointer-color), 0.45) 0, rgba(var(--pointer-color), 0) 50%) no-repeat`,
              mixBlendMode: blendingValue as any,
              width: "100%",
              height: "100%",
              top: "-50%",
              left: "-50%",
            }}
            className="absolute opacity-70"
          ></div>
        )}
      </div>
    </div>
  );
};
