import { Terminal, Mic, Trophy, Users, Briefcase, GitBranch } from "lucide-react";

// Add a new icon by importing it above and adding it here.
// The key is what you write as `icon` in src/data.js.
const ACTIVITY_ICONS = {
  terminal: Terminal,
  mic: Mic,
  trophy: Trophy,
  users: Users,
  briefcase: Briefcase,
  git: GitBranch,
};

export default function Activities({ items }) {
  return (
    <section id="activities" className="section section--paper">
      <div className="container">
        <div className="head">
          <h2>More than a society</h2>
          <p>
            A technical community built around learning, experimenting, industry
            connections and projects.
          </p>
        </div>

        <div className="activities__grid">
          {items.map((item) => {
            const Icon = ACTIVITY_ICONS[item.icon] ?? Terminal;
            return (
              <article className="activity" key={item.title}>
                <span className="activity__icon">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
