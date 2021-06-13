import React from "react";
import Sketch from "react-p5";

export default function FifthBackground() {
  const setup = (p5, canvasParentRef) => {
    const canvas = p5
      .createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL)
      .parent(canvasParentRef);
    p5.angleMode(p5.DEGREES);

    canvas.position(0, 0);
    canvas.style("z-index", "-2");
  };
  const draw = (p5) => {
    p5.background(0);
  };
  return (
    <div>
      <Sketch className="p5-sketch" setup={setup} draw={draw} />
    </div>
  );
}
