import { ArrowUpRight } from "lucide-react";

export default function Events({ items, onOpen }) {
  return (
    <section id="events" className="section">
      <div className="container">
        <div className="head">
          <h2>Learn by doing</h2>
          <p>
            Workshops, talks, hackathons and conversations with people working across
            enterprise technology. Select an event to see the details.
          </p>
        </div>

        <ul className="events__list">
          {items.map((event) => (
            <li key={event.id}>
              <button className="event" type="button" onClick={() => onOpen(event)}>
                <span className="event__date">
                  <span className={`event__day ${event.day ? "" : "is-tbc"}`}>
                    {event.day || "TBC"}
                  </span>
                  <span className="event__month">
                    {event.month}
                    <br />
                    {event.year}
                  </span>
                </span>

                <span className="event__main">
                  <span className="event__cat">{event.category}</span>
                  <span className="event__title">{event.title}</span>
                  <span className="event__desc">{event.description}</span>
                </span>

                <span className="event__place">{event.location}</span>

                <span className="event__arrow">
                  <ArrowUpRight size={22} aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="events__more">
          Want to hear about new events first? <a className="text-link" href="#subscribe">Get updates by email</a>
        </p>
      </div>
    </section>
  );
}
