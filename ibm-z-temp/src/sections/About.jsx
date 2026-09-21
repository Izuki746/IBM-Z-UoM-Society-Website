import { ArrowUpRight } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <h2 className="about__verbs">
          <span>Learn.</span>
          <span className="is-outline">Build.</span>
          <span>Connect.</span>
        </h2>

        <div className="about__body">
          <p className="about__lead">Enterprise computing, made accessible.</p>

          <p>
            IBM Z powers some of the world's most important systems. We are a
            student community interested in how those systems work, and in what we
            can build with them.
          </p>

          <p>
            From mainframes and operating systems to AI, security and open source,
            we create chances to explore technology beyond the standard degree
            curriculum, through workshops, talks, projects and events.
          </p>

          <aside className="aside">
            <h3>New to IBM Z?</h3>
            <p>
              IBM Z is a family of enterprise computers built to handle huge
              volumes of work reliably and securely. It's the kind of computing
              behind banking, airline bookings and public services. No experience
              needed to join us.
            </p>
          </aside>

          <a className="text-link" href="#join">
            Get involved
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
