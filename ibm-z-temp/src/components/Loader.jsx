import { useEffect, useRef, useState } from "react";
import { markBooted } from "../lib/boot";
import "./Loader.css";

/*
  The intro screen. It's a nod to how a mainframe starts up: an IPL
  (Initial Program Load) followed by a READY prompt.
  Click anywhere, or press any key, to skip it.
*/

const STEPS = [
  { cmd: "IPL", what: "initial program load" },
  { cmd: "LOAD", what: "workshops" },
  { cmd: "LOAD", what: "talks" },
  { cmd: "LOAD", what: "datathon" },
  { cmd: "LOAD", what: "community" },
];

const STEP_MS = 380;

export default function Loader({ onLeave, onDone }) {
  const [shown, setShown] = useState(0); // how many lines are visible
  const [leaving, setLeaving] = useState(false);

  // keep the latest callbacks without restarting timers
  const callbacks = useRef({ onLeave, onDone });
  useEffect(() => {
    callbacks.current = { onLeave, onDone };
  });

  // no scrolling while the intro is up
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // reveal one line at a time, then leave
  useEffect(() => {
    if (leaving) return undefined;

    if (shown <= STEPS.length) {
      const delay = shown === 0 ? 500 : STEP_MS;
      const timer = setTimeout(() => setShown((n) => n + 1), delay);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => setLeaving(true), 700);
    return () => clearTimeout(timer);
  }, [shown, leaving]);

  // the curtain lifts, then the loader is removed
  useEffect(() => {
    if (!leaving) return undefined;
    markBooted();
    callbacks.current.onLeave();
    const timer = setTimeout(() => callbacks.current.onDone(), 900);
    return () => clearTimeout(timer);
  }, [leaving]);

  // any key skips
  useEffect(() => {
    const skip = () => setLeaving(true);
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, []);

  const ready = shown > STEPS.length;
  const progress = Math.min(shown / (STEPS.length + 1), 1);

  return (
    <div
      className={`loader ${leaving ? "is-leaving" : ""}`}
      role="status"
      aria-label="Loading the IBM Z Society site"
      onClick={() => setLeaving(true)}
    >
      <p className="loader__head" aria-hidden="true">
        IBM Z Society, University of Manchester
      </p>

      <div className="loader__screen" aria-hidden="true">
        <ol className="loader__log">
          {STEPS.slice(0, shown).map((step) => (
            <li key={step.what} className="loader__line">
              <span className="loader__cmd">{step.cmd}</span>
              <span>{step.what}</span>
              <span className="loader__fill" />
              <span className="loader__ok">OK</span>
            </li>
          ))}
        </ol>

        {ready && (
          <p className="loader__ready">
            READY<span className="loader__caret" />
          </p>
        )}
      </div>

      <div className="loader__foot">
        <div className="loader__bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
        <button className="loader__skip" type="button">
          Skip intro
        </button>
      </div>
    </div>
  );
}
