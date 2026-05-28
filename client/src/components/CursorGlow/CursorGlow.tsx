"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
  // despawn lifecycle
  dying: boolean;
  dieStartTs: number;   // timestamp when despawn began
  spawnProgress: number; // 0→1 fade-in on spawn
}

const ACCENT = { r: 6, g: 182, b: 212 };
const PARTICLE_COUNT = 80;
const CONNECTION_DIST = 130;
const GRAVITY_STRENGTH = 1800;
const GRAVITY_RADIUS = 350;        // gravity only pulls within this px radius
const MAX_SPEED = 2.5;
const CURSOR_RING_RADIUS = 18;     // the drawn follower ring
const DESPAWN_DURATION = 5000;     // ms to fade out after touch
const SPAWN_DURATION = 800;        // ms to fade in on respawn
const GRID_COLS = 28;
const GRID_ROWS = 18;
const WAVE_SPEED = 0.0012;
const WAVE_AMPLITUDE = 6;

const SPAWN_SPEED_MIN = 0.6;
const SPAWN_SPEED_MAX = 2.2;

function makeParticle(W: number, H: number): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = SPAWN_SPEED_MIN + Math.random() * (SPAWN_SPEED_MAX - SPAWN_SPEED_MIN);
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: Math.random() * 1.5 + 0.5,
    baseOpacity: Math.random() * 0.4 + 0.1,
    dying: false,
    dieStartTs: 0,
    spawnProgress: 0,
  };
}

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef({ x: -1000, y: -1000 });
  const followerRef = useRef({ x: -1000, y: -1000 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function onMouseMove(e: MouseEvent) {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () =>
      makeParticle(window.innerWidth, window.innerHeight)
    );
    // stagger spawn-in so they don't all pop in at once
    particles.forEach((p, i) => { p.spawnProgress = i / PARTICLE_COUNT; });

    function draw(ts: number) {
      const W = canvas!.width;
      const H = canvas!.height;
      ctx.clearRect(0, 0, W, H);

      // ── Wave grid ──
      const cellW = W / GRID_COLS;
      const cellH = H / GRID_ROWS;
      ctx.lineWidth = 0.5;

      for (let row = 0; row <= GRID_ROWS; row++) {
        ctx.beginPath();
        for (let col = 0; col <= GRID_COLS; col++) {
          const bx = col * cellW;
          const by = row * cellH;
          const distToCursor = Math.hypot(bx - cursorRef.current.x, by - cursorRef.current.y);
          const waveY =
            Math.sin(col * 0.3 + ts * WAVE_SPEED) * WAVE_AMPLITUDE +
            Math.sin(row * 0.4 + ts * WAVE_SPEED * 0.7) * WAVE_AMPLITUDE * 0.5;
          const cursorPush = Math.max(0, 1 - distToCursor / 220) * 18;
          const angle = Math.atan2(by - cursorRef.current.y, bx - cursorRef.current.x);
          const px = bx + Math.cos(angle) * cursorPush;
          const py = by + waveY + Math.sin(angle) * cursorPush;
          ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.06)`;
          col === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      for (let col = 0; col <= GRID_COLS; col++) {
        ctx.beginPath();
        for (let row = 0; row <= GRID_ROWS; row++) {
          const bx = col * cellW;
          const by = row * cellH;
          const distToCursor = Math.hypot(bx - cursorRef.current.x, by - cursorRef.current.y);
          const waveX =
            Math.sin(row * 0.3 + ts * WAVE_SPEED * 0.8) * WAVE_AMPLITUDE +
            Math.sin(col * 0.4 + ts * WAVE_SPEED * 0.5) * WAVE_AMPLITUDE * 0.5;
          const cursorPush = Math.max(0, 1 - distToCursor / 220) * 18;
          const angle = Math.atan2(by - cursorRef.current.y, bx - cursorRef.current.x);
          const px = bx + waveX + Math.cos(angle) * cursorPush;
          const py = by + Math.sin(angle) * cursorPush;
          ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.06)`;
          row === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // ── Update follower first so ring position is ready for touch-detection ──
      const cx = cursorRef.current.x;
      const cy = cursorRef.current.y;
      followerRef.current.x += (cx - followerRef.current.x) * 0.1;
      followerRef.current.y += (cy - followerRef.current.y) * 0.1;
      const fx = followerRef.current.x;
      const fy = followerRef.current.y;

      // ── Particles ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Fade-in on spawn
        if (p.spawnProgress < 1) {
          p.spawnProgress = Math.min(1, p.spawnProgress + 1 / (SPAWN_DURATION / 16.67));
        }

        // Check if touching the follower ring (not yet dying)
        if (!p.dying) {
          const distToFollower = Math.hypot(p.x - fx, p.y - fy);
          if (distToFollower <= CURSOR_RING_RADIUS + p.radius) {
            p.dying = true;
            p.dieStartTs = ts;
          }
        }

        // If dying, check if fully faded — respawn
        if (p.dying) {
          const elapsed = ts - p.dieStartTs;
          if (elapsed >= DESPAWN_DURATION) {
            // Respawn at a random edge so it drifts in naturally
            const newP = makeParticle(W, H);
            newP.spawnProgress = 0;
            particles[i] = newP;
            continue;
          }
        }

        // Gravity — only within GRAVITY_RADIUS
        const dx = cx - p.x;
        const dy = cy - p.y;
        const distToCursor = Math.sqrt(dx * dx + dy * dy);

        if (distToCursor < GRAVITY_RADIUS) {
          const distSq = dx * dx + dy * dy + 200;
          const dist = Math.sqrt(distSq);
          // Taper force to 0 at the radius edge so there's no hard cutoff snap
          const falloff = 1 - distToCursor / GRAVITY_RADIUS;
          const force = GRAVITY_STRENGTH / distSq * falloff;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Cap speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        // Compute final opacity
        let alpha = p.baseOpacity;
        // Fade in
        alpha *= Math.min(1, p.spawnProgress);
        // Fade out if dying
        if (p.dying) {
          const t = (ts - p.dieStartTs) / DESPAWN_DURATION;
          alpha *= Math.max(0, 1 - t);
        }

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${alpha})`;
        ctx.fill();
      }

      // ── Connections ──
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pi = particles[i];
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECTION_DIST) {
            // Inherit opacity of the dimmer of the two
            const aI = pi.dying ? Math.max(0, 1 - (ts - pi.dieStartTs) / DESPAWN_DURATION) : pi.spawnProgress;
            const aJ = pj.dying ? Math.max(0, 1 - (ts - pj.dieStartTs) / DESPAWN_DURATION) : pj.spawnProgress;
            const alpha = (1 - d / CONNECTION_DIST) * 0.18 * Math.min(aI, aJ);
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // ── Cursor-to-particle lines ──
      for (const p of particles) {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 200) {
          const fade = p.dying ? Math.max(0, 1 - (ts - p.dieStartTs) / DESPAWN_DURATION) : p.spawnProgress;
          const alpha = (1 - d / 200) * 0.35 * fade;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      // ── Cursor follower ring ──
      ctx.beginPath();
      ctx.arc(fx, fy, CURSOR_RING_RADIUS, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.5)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Inner dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.9)`;
      ctx.fill();

      frameRef.current = requestAnimationFrame(draw);
    }

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
