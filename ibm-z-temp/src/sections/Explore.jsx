export default function Explore({ groups }) {
  return (
    <section id="explore" className="section">
      <div className="container">
        <div className="head">
          <h2>What we explore</h2>
          <p>
            IBM Z sits where systems, software, infrastructure, security and modern
            development meet.
          </p>
        </div>

        <div className="explore__grid">
          {groups.map((group) => (
            <div className="group" key={group.group}>
              <h3>{group.group}</h3>
              <p>{group.note}</p>
              <ul className="chips">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
