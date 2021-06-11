import React from "react";
import Sketch from "react-p5";

export default function PageTwoBackground() {
  const setup = (p5, canvasParentRef) => {
    const canvas = p5
      .createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL)
      .parent(canvasParentRef);
    p5.angleMode(p5.DEGREES);

    canvas.position(0, 0);
    canvas.style("z-index", "-2");
    p5.fill(229, 204, 255, 200);
  };

  const draw = (p5) => {
    p5.background(30);
    p5.rotateX(60);
    p5.noFill();
    p5.stroke(255);
    p5.strokeWeight(5);

    for (let i = 0; i < 60; i++) {
      let r = p5.map(p5.sin(p5.frameCount / 2), -1, 1, 100, 255);
      let g = p5.map(i, 0, 20, 100, 255);
      let b = p5.map(p5.cos(p5.frameCount), -1, 1, 200, 100);

      p5.stroke(r, g, b);
      p5.rotateY(60);
      p5.rotate(p5.frameCount / 20);

      p5.beginShape();
      for (let j = 0; j < 360; j += 1) {
        let rad = i * 36;
        let x = rad * p5.cos(j);
        let y = rad * p5.sin(j);
        let z = p5.sin(p5.frameCount + i * 5) * 80;
        p5.vertex(x, y, z);
      }
      p5.endShape(p5.CLOSE);
    }
  };
  return (
    <div>
      <Sketch className="p5-sketch" setup={setup} draw={draw} />
    </div>
  );
}
