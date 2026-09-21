import { useState } from "react";
import Art from "../components/Art";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "project", label: "Projects" },
  { id: "resource", label: "Resources" },
];

export default function Projects({ projects, resources, onOpen }) {
  const [filter, setFilter] = useState("all");

  const items = [
    ...projects.map((item) => ({ ...item, kind: "project" })),
    ...resources.map((item) => ({ ...item, kind: "resource" })),
  ].filter((item) => filter === "all" || item.kind === filter);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="head">
          <h2>Things we're building</h2>
          <p>
            Projects give members a place to turn what they learn into something real.
            Resources help you keep learning between events.
          </p>
        </div>

        <div className="filters" role="group" aria-label="Filter projects and resources">
          {FILTERS.map((option) => (
            <button
              key={option.id}
              className="filter"
              type="button"
              aria-pressed={filter === option.id}
              onClick={() => setFilter(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <ul className="projects__grid">
          {items.map((item) => (
            <li key={item.id}>
              <button className="tile" type="button" onClick={() => onOpen(item)}>
                <span className="tile__art">
                  <Art variant={item.art} seed={item.seed} className="art--fill" />
                </span>
                <span className="tile__body">
                  <span className="tile__tag">{item.tag}</span>
                  <span className="tile__title">{item.title}</span>
                  <span className="tile__blurb">{item.blurb}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
