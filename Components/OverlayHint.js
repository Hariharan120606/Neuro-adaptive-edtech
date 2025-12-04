import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function OverlayHint({ state }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = 250;
    const height = 180;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x66ccff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.015;
      cube.rotation.y += 0.02;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      {state === "attentive" && <p>✅ Great focus!</p>}
      {state === "neutral" && <p>🙂 Steady pace.</p>}
      {state === "drowsy" && <p>⚠️ Focus dropping — hint cube active!</p>}
      <div ref={mountRef}></div>
    </div>
  );
}
