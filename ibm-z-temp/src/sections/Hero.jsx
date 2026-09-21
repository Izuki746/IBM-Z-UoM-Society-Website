import { ArrowUpRight } from "lucide-react";
import { SOCIETY } from "../data";

// Splits a word into letters so each one can rise into place.
function Letters({ text, start = 0 }) {
  return [...text].map((char, i) =>
    char === " " ? (
      <span key={i} className="char char--space">
        {"\u00a0"}
      </span>
    ) : (
      <span key={i} className="char" style={{ "--i": start + i }}>
        {char}
      </span>
    )
  );
}

export default function Hero({ ready, nextEvent, onOpenEvent }) {
  return (
    <section id="home" className={`hero ${ready ? "is-ready" : ""}`}>
      <div className="hero__inner container">
        <p className="hero__kicker">
          {SOCIETY.university} student society, est. {SOCIETY.founded}
        </p>

        <h1 className="hero__title" aria-label={SOCIETY.name}>
          <span className="hero__line" aria-hidden="true">
            <Letters text="IBM Z" />
          </span>
          <span className="hero__line hero__line--outline" aria-hidden="true">
            <Letters text="SOCIETY" start={5} />
          </span>
        </h1>

        <div className="hero__foot">
          <p className="hero__lede">
            A student community exploring IBM Z, enterprise computing, systems and
            AI, and the technology behind the world's most critical workloads.
          </p>

          <div className="hero__actions">
            <a className="btn btn--primary" href="#join">
              Join the society
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="btn btn--ghost" href="#events">
              See events
            </a>
          </div>

          {nextEvent && (
            <button className="next" type="button" onClick={() => onOpenEvent(nextEvent)}>
              <span className="next__when">
                <strong>{nextEvent.day || "TBC"}</strong>
                <span>
                  {nextEvent.month} {nextEvent.year}
                </span>
              </span>
              <span className="next__body">
                <span className="next__label">Next event</span>
                <span className="next__title">{nextEvent.title}</span>
              </span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
