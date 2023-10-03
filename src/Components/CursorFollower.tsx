import * as React from "react";

export interface ICursorFollowerProps {}

export default function CursorFollower(props: ICursorFollowerProps) {
  React.useEffect(() => {
    const gradientBox = document.getElementById("gradient-box");

    const moveGradientBox = (e: MouseEvent) => {
      if (gradientBox) {
        gradientBox.style.left = `${e.clientX - 300}px`; // 50 is half the width and height of the box
        gradientBox.style.top = `${e.clientY - 300}px`;
      }
    };

    window.addEventListener("mousemove", moveGradientBox);

    return () => {
      window.removeEventListener("mousemove", moveGradientBox);
    };
  }, []);

  return <div id="gradient-box"></div>;
}
