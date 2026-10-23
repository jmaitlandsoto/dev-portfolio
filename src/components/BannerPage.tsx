import * as React from "react";
import {
  siTypescript,
  siPython,
  siDocker,
  siReact,
  siClaude,
} from "simple-icons";
import { faAws } from "@fortawesome/free-brands-svg-icons";
import { CONNECT_DISTANCE, FIELD_DEPTH } from "./particle/constants";

// LinkedIn's recommended banner size is 1584x396 (4:1). It re-encodes uploads
// as JPEG, so everything is drawn bold: hairlines and small text turn to mush.
const BANNER_WIDTH = 1584;
const BANNER_HEIGHT = 396;

// The site's dark background (--background in index.css, rgb(19, 15, 42)).
const BACKGROUND = "#130f2a";

// Same camera as the site (z=8, 50deg fov), projected by hand: the banner is a
// still, so we draw lines at a real thickness instead of 1px WebGL hairlines.
// The field spans a little past the 4:1 view so lines run off the edges, at the
// same density as the site's 80 particles over 14x10.
const CAMERA_Z = 8;
const TAN_HALF_FOV = Math.tan((50 / 2) * (Math.PI / 180));
const FIELD_WIDTH = 34;
const FIELD_HEIGHT = 9;
const PARTICLE_COUNT = 140;

// Brighter than the site's navy lines (0x183453) so they survive compression.
const LINE_COLOR = "rgba(52, 96, 148, 0.85)";
const POINT_COLOR = "rgba(200, 226, 255, 0.7)";
const LINE_WIDTH = 1;
const POINT_RADIUS = 2.4;

const NAME = "Josh Maitland";
const TITLE = "Full-Stack Software Engineer";
const BADGE_ROWS = [["Agentic AI", "Cloud-Native", "Distributed Systems", "DevOps"]];

// Simple Icons are all 24x24; AWS isn't in that set, so it comes from FontAwesome.
const LOGOS = [
  { path: siTypescript.path, width: 24, height: 24 },
  { path: siPython.path, width: 24, height: 24 },
  { path: faAws.icon[4] as string, width: faAws.icon[0], height: faAws.icon[1] },
  { path: siDocker.path, width: 24, height: 24 },
  { path: siReact.path, width: 24, height: 24 },
  { path: siClaude.path, width: 24, height: 24 },
];

const FONT = '"Geist Variable", sans-serif';
const MARGIN_RIGHT = 72;

type Particle = { x: number; y: number; z: number };

function makeParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: (Math.random() - 0.5) * FIELD_WIDTH,
    y: (Math.random() - 0.5) * FIELD_HEIGHT,
    z: (Math.random() - 0.5) * FIELD_DEPTH,
  }));
}

function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[], s: number) {
  const w = BANNER_WIDTH * s;
  const h = BANNER_HEIGHT * s;

  // World (x, y, z) -> pixels, plus a depth factor so nearer dots/lines are bigger.
  const project = (p: Particle) => {
    const depth = CAMERA_Z - p.z;
    const halfH = depth * TAN_HALF_FOV;
    const halfW = halfH * (BANNER_WIDTH / BANNER_HEIGHT);
    return {
      x: (p.x / halfW + 1) * 0.5 * w,
      y: (1 - p.y / halfH) * 0.5 * h,
      k: CAMERA_Z / depth,
    };
  };
  const projected = particles.map(project);

  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = LINE_COLOR;
  ctx.lineCap = "round";
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      // Distance in the x/y plane only, like findConnections on the site.
      if (
        Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y) >=
        CONNECT_DISTANCE
      )
        continue;
      ctx.lineWidth = LINE_WIDTH * s * ((projected[i].k + projected[j].k) / 2);
      ctx.beginPath();
      ctx.moveTo(projected[i].x, projected[i].y);
      ctx.lineTo(projected[j].x, projected[j].y);
      ctx.stroke();
    }
  }

  ctx.fillStyle = POINT_COLOR;
  for (const p of projected) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, POINT_RADIUS * s * p.k, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawLogos(ctx: CanvasRenderingContext2D, top: number, s: number) {
  const h = 52 * s;
  const gap = 32 * s;
  const widths = LOGOS.map((l) => (l.width / l.height) * h);
  let x =
    (BANNER_WIDTH - MARGIN_RIGHT) * s -
    (widths.reduce((a, b) => a + b, 0) + gap * (LOGOS.length - 1));
  ctx.fillStyle = "rgba(200, 226, 255, 0.85)";
  LOGOS.forEach((logo, i) => {
    ctx.save();
    ctx.translate(x, top * s);
    ctx.scale(h / logo.height, h / logo.height);
    ctx.fill(new Path2D(logo.path));
    ctx.restore();
    x += widths[i] + gap;
  });
}

// `backdrop` is a copy of the particle layer, blurred behind each badge for a
// frosted-glass look (like the site's glass cards).
function drawText(
  ctx: CanvasRenderingContext2D,
  backdrop: HTMLCanvasElement,
  s: number,
) {
  const right = (BANNER_WIDTH - MARGIN_RIGHT) * s;
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "right";

  ctx.fillStyle = "#f2f7ff";
  ctx.font = `700 ${90 * s}px ${FONT}`;
  ctx.fillText(NAME, right, 118 * s);

  ctx.fillStyle = "#d6e8ff";
  ctx.font = `500 ${36 * s}px ${FONT}`;
  ctx.fillText(TITLE, right, 164 * s);

  const fontSize = 24 * s;
  const padX = 20 * s;
  const height = 42 * s;
  const gap = 12 * s;
  ctx.font = `600 ${fontSize}px ${FONT}`;
  ctx.textAlign = "left";

  BADGE_ROWS.forEach((row, r) => {
    const widths = row.map((label) => ctx.measureText(label).width + padX * 2);
    let x = right - (widths.reduce((a, b) => a + b, 0) + gap * (row.length - 1));
    const y = (198 + r * 54) * s;
    row.forEach((label, i) => {
      ctx.beginPath();
      ctx.roundRect(x, y, widths[i], height, height / 2);
      ctx.save();
      ctx.clip();
      ctx.filter = `blur(${5 * s}px)`;
      ctx.drawImage(backdrop, 0, 0);
      ctx.restore();
      ctx.fillStyle = "rgba(200, 226, 255, 0.14)";
      ctx.fill();
      ctx.strokeStyle = "rgba(200, 226, 255, 0.6)";
      ctx.lineWidth = 1.5 * s;
      ctx.stroke();
      ctx.fillStyle = "#e8f1ff";
      ctx.fillText(label, x + padX, y + height / 2 + fontSize * 0.35);
      x += widths[i] + gap;
    });
  });

  drawLogos(ctx, 198 + BADGE_ROWS.length * 54 + 12, s);
}

export default function BannerPage() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = React.useState(makeParticles);
  const [scale, setScale] = React.useState<1 | 2>(1);
  const [fontsReady, setFontsReady] = React.useState(false);

  React.useEffect(() => {
    // Draw again once the webfont is ready so it doesn't fall back to sans-serif.
    void Promise.all([
      document.fonts.load(`700 20px ${FONT}`),
      document.fonts.load(`500 20px ${FONT}`),
      document.fonts.load(`600 20px ${FONT}`),
    ]).then(() => setFontsReady(true));
  }, []);

  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    drawParticles(ctx, particles, scale);
    const backdrop = document.createElement("canvas");
    backdrop.width = ctx.canvas.width;
    backdrop.height = ctx.canvas.height;
    backdrop.getContext("2d")?.drawImage(ctx.canvas, 0, 0);
    drawText(ctx, backdrop, scale);
  }, [particles, scale, fontsReady]);

  function download() {
    canvasRef.current?.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `linkedin-banner-${BANNER_WIDTH * scale}x${BANNER_HEIGHT * scale}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0919",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        padding: 24,
        color: "#c8e2ff",
        fontFamily: "sans-serif",
      }}
    >
      <canvas
        ref={canvasRef}
        width={BANNER_WIDTH * scale}
        height={BANNER_HEIGHT * scale}
        style={{
          width: "min(100%, 1584px)",
          aspectRatio: `${BANNER_WIDTH} / ${BANNER_HEIGHT}`,
        }}
      />
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={() => setParticles(makeParticles())} style={buttonStyle}>
          Shuffle
        </button>
        <button
          onClick={() => setScale((s) => (s === 1 ? 2 : 1))}
          style={buttonStyle}
        >
          Size: {BANNER_WIDTH * scale}×{BANNER_HEIGHT * scale} (switch)
        </button>
        <button onClick={download} style={buttonStyle}>
          Download PNG
        </button>
      </div>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: "10px 18px",
  borderRadius: 8,
  border: "1px solid #183453",
  background: "#130f2a",
  color: "#c8e2ff",
  cursor: "pointer",
  fontSize: 14,
};
