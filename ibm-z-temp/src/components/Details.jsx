import { ArrowUpRight } from "lucide-react";
import Art from "./Art";

// The content of the pop-up windows for events and projects.

export function EventDetail({ event, onRegister }) {
  const when = event.day
    ? `${event.day} ${event.month} ${event.year}`
    : `${event.month} ${event.year} (date to be confirmed)`;

  return (
    <div className="detail">
      <p className="detail__tag">{event.category}</p>
      <h2 id="modal-title">{event.title}</h2>
      <p>{event.details}</p>

      <dl className="detail__facts">
        <div>
          <dt>When</dt>
          <dd>{when}</dd>
        </div>
        <div>
          <dt>Where</dt>
          <dd>{event.location}</dd>
        </div>
      </dl>

      <div className="detail__actions">
        <button className="btn btn--primary" type="button" onClick={() => onRegister(event)}>
          Ask about this event
          <ArrowUpRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export function ProjectDetail({ item }) {
  return (
    <div className="detail">
      <Art className="detail__art art--fill" variant={item.art} seed={item.seed} />
      <p className="detail__tag">{item.tag}</p>
      <h2 id="modal-title">{item.title}</h2>
      <p>{item.details}</p>

      <div className="detail__actions">
        {item.link ? (
          <a className="btn btn--primary" href={item.link} target="_blank" rel="noreferrer">
            Open
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        ) : (
          <p className="detail__note">More details coming soon.</p>
        )}
      </div>
    </div>
  );
}
