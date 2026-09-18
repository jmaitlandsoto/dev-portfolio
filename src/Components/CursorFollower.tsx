import * as React from "react";

export interface ICursorFollowerProps {}

export default function CursorFollower(props: ICursorFollowerProps) {
  React.useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gradientBox = document.getElementById("gradient-box");

    let targetX = 0,
      targetY = 0;
    let currentX = 0,
      currentY = 0;
    let rafId: number;
    const LERP = 0.2;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX - 300;
      targetY = e.clientY - 300;
    };

    const tick = () => {
      currentX += (targetX - currentX) * LERP;
      currentY += (targetY - currentY) * LERP;
      if (gradientBox) {
        gradientBox.style.left = `${currentX}px`;
        gradientBox.style.top = `${currentY}px`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      id="gradient-box"
      className="top-0 left-0 z-0 fixed bg-radial from-primary/85 via-primary/8 to-primary/0 opacity-15 [body.card-hovered_&]:opacity-30 rounded-full w-150 h-150 transition-opacity duration-200 [body.card-hovered_&]:duration-600 ease-in-out pointer-events-none"
    ></div>
  );
}
