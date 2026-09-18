import * as React from "react";
import * as THREE from "three";
import { lerp } from "./particle/lerp";
import { findConnections } from "./particle/connections";
import { prefersReducedMotion, isCoarsePointer } from "./particle/capabilities";
import {
  PARTICLE_COUNT,
  CONNECT_DISTANCE,
  POINT_SIZE,
  POINT_OPACITY,
  LINE_OPACITY,
  POINT_COLOR,
  LINE_COLOR,
  POINT_COLOR_LIGHT,
  LINE_COLOR_LIGHT,
  PARALLAX_LERP,
  FIELD_WIDTH,
  FIELD_HEIGHT,
  FIELD_DEPTH,
  DRIFT_SPEED,
} from "./particle/constants";

function isDarkTheme() {
  return document.documentElement.classList.contains("dark");
}

export default function ParticleBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (prefersReducedMotion()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const boundX = FIELD_WIDTH / 2;
    const boundY = FIELD_HEIGHT / 2;

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities: [number, number][] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * FIELD_WIDTH;
      positions[i * 3 + 1] = (Math.random() - 0.5) * FIELD_HEIGHT;
      positions[i * 3 + 2] = (Math.random() - 0.5) * FIELD_DEPTH;
      velocities.push([
        (Math.random() - 0.5) * DRIFT_SPEED,
        (Math.random() - 0.5) * DRIFT_SPEED,
      ]);
    }

    let renderer: THREE.WebGLRenderer;
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let pointsGeometry: THREE.BufferGeometry;
    let pointsMaterial: THREE.PointsMaterial;
    let lineGeometry: THREE.BufferGeometry;
    let lineMaterial: THREE.LineBasicMaterial;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        100,
      );
      camera.position.z = 8;

      scene = new THREE.Scene();

      const dark = isDarkTheme();

      pointsGeometry = new THREE.BufferGeometry();
      pointsGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      pointsMaterial = new THREE.PointsMaterial({
        color: dark ? POINT_COLOR : POINT_COLOR_LIGHT,
        size: POINT_SIZE,
        transparent: true,
        opacity: POINT_OPACITY,
      });
      const points = new THREE.Points(pointsGeometry, pointsMaterial);
      scene.add(points);

      lineGeometry = new THREE.BufferGeometry();
      lineMaterial = new THREE.LineBasicMaterial({
        color: dark ? LINE_COLOR : LINE_COLOR_LIGHT,
        transparent: true,
        opacity: LINE_OPACITY,
      });
      const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lines);
    } catch {
      return;
    }

    const themeObserver = new MutationObserver(() => {
      const dark = isDarkTheme();
      pointsMaterial.color.setHex(dark ? POINT_COLOR : POINT_COLOR_LIGHT);
      lineMaterial.color.setHex(dark ? LINE_COLOR : LINE_COLOR_LIGHT);
      if (isCoarsePointer()) renderFrame();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }
    resize();

    function renderFrame() {
      const pos = pointsGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i * 3] += velocities[i][0];
        pos[i * 3 + 1] += velocities[i][1];
        if (pos[i * 3] > boundX || pos[i * 3] < -boundX) velocities[i][0] *= -1;
        if (pos[i * 3 + 1] > boundY || pos[i * 3 + 1] < -boundY)
          velocities[i][1] *= -1;
      }
      pointsGeometry.attributes.position.needsUpdate = true;

      const segments = findConnections(pos, PARTICLE_COUNT, CONNECT_DISTANCE);
      lineGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(segments, 3),
      );

      renderer.render(scene, camera);
    }

    if (isCoarsePointer()) {
      renderFrame();

      function onStaticResize() {
        resize();
        renderFrame();
      }
      window.addEventListener("resize", onStaticResize);

      return () => {
        themeObserver.disconnect();
        window.removeEventListener("resize", onStaticResize);
        pointsGeometry.dispose();
        lineGeometry.dispose();
        pointsMaterial.dispose();
        lineMaterial.dispose();
        renderer.dispose();
      };
    }

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let targetScroll = window.scrollY;
    let currentScroll = targetScroll;
    let rafId = 0;

    function onMouseMove(e: MouseEvent) {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    function onScroll() {
      targetScroll = window.scrollY;
    }

    function onResize() {
      resize();
    }

    function tick() {
      currentMouseX = lerp(currentMouseX, targetMouseX, PARALLAX_LERP);
      currentMouseY = lerp(currentMouseY, targetMouseY, PARALLAX_LERP);
      currentScroll = lerp(currentScroll, targetScroll, PARALLAX_LERP);

      camera.position.x = currentMouseX * 0.6;
      camera.position.y = -currentMouseY * 0.4 - currentScroll * 0.0015;
      camera.lookAt(0, 0, 0);

      renderFrame();
      rafId = requestAnimationFrame(tick);
    }

    function onVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(tick);
      }
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibilityChange);
    rafId = requestAnimationFrame(tick);

    return () => {
      themeObserver.disconnect();
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      pointsGeometry.dispose();
      lineGeometry.dispose();
      pointsMaterial.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
