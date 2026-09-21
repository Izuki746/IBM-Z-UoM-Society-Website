import "./Marquee.css";

// The slow-moving band of big type between the hero and the About section.
export default function Marquee({ words }) {
  const group = [...words, ...words];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <div className="marquee__group" key={copy}>
            {group.map((word, i) => (
              <span className={`marquee__word ${i % 2 ? "is-outline" : ""}`} key={i}>
                {word}
                <i />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
