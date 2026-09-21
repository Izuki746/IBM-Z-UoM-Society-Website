import { useEffect, useRef } from "react";
import "./Cursor.css";

// Things the ring should grow around.
const INTERACTIVE = "a, button, summary, label, [data-cursor]";

// The pointer itself is your Z (src/assets/cursor.png), set in Cursor.css.
// This component adds a soft glow that trails the mouse, plus a ring that
// appears around anything clickable. It only runs on devices with a real
// mouse, so phones and tablets never see it.
export default function Cursor() {
  const glow = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasMouse) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("has-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;
    let glowX = x;
    let glowY = y;
    let frame = 0;
    let visible = false;

    const place = (el, px, py) => {
      el.style.transform = `translate3d(${px}px, ${py}px, 0)`;
    };

    const onMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (!visible) {
        visible = true;
        ringX = glowX = x;
        ringY = glowY = y;
        glow.current.classList.add("is-visible");
        ring.current.classList.add("is-visible");
      }
    };

    const onOver = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      ring.current.classList.toggle("is-active", !!target.closest(INTERACTIVE));
    };

    const onLeave = () => {
      visible = false;
      glow.current.classList.remove("is-visible");
      ring.current.classList.remove("is-visible");
    };

    const tick = () => {
      ringX += (x - ringX) * (reduceMotion ? 1 : 0.22);
      ringY += (y - ringY) * (reduceMotion ? 1 : 0.22);
      glowX += (x - glowX) * (reduceMotion ? 1 : 0.07);
      glowY += (y - glowY) * (reduceMotion ? 1 : 0.07);
      place(ring.current, ringX, ringY);
      place(glow.current, glowX, glowY);
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden="true">
      <div ref={glow} className="cursor-glow" />
      <div ref={ring} className="cursor-ring" />
    </div>
  );
}
