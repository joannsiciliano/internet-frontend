import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Link } from "react-router-dom";

function Sphere() {
  return (
    <mesh>
      <sphereGeometry attach="geometry" />
      <meshPhongMaterial attach="material" color="lightblue" alphaTest="0.3" />
    </mesh>
  );
}

export default function SixthPage({ user, logout }) {
  return (
    <div className="Universe">
      <Link to="/login" onClick={logout}>
        LOGOUT
      </Link>
      <Canvas style={{ width: `100vw`, height: `100vh` }}>
        <OrbitControls />
        <Stars />
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <Sphere />
      </Canvas>
    </div>
  );
}
