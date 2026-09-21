import { useCallback, useState } from "react";

import Waves from "./components/Waves";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Marquee from "./components/Marquee";
import Modal from "./components/Modal";
import { EventDetail, ProjectDetail } from "./components/Details";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Explore from "./sections/Explore";
import Events from "./sections/Events";
import Activities from "./sections/Activities";
import Projects from "./sections/Projects";
import Committee from "./sections/Committee";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

import { useContent } from "./hooks/useContent";
import { useActiveSection } from "./hooks/useActiveSection";
import { hasBooted } from "./lib/boot";
import * as data from "./data";

import "./sections/sections.css";

const NAV_IDS = data.navLinks.map((link) => link.id);

export default function App() {
  // ----- content (mock data now, API later: see src/api.js) -----
  const events = useContent("/api/events", data.events);
  const projects = useContent("/api/projects", data.projects);
  const resources = useContent("/api/knowledge", data.knowledge);
  const committee = useContent("/api/committee", data.committee);

  // ----- intro screen -----
  const [showLoader, setShowLoader] = useState(() => !hasBooted());
  const [heroReady, setHeroReady] = useState(() => hasBooted());

  // ----- pop-up window (an event or a project) -----
  const [modal, setModal] = useState(null); // { type: "event" | "project", item }
  const closeModal = useCallback(() => setModal(null), []);

  // ----- "Ask about this event" fills in the contact form -----
  const [prefill, setPrefill] = useState(null);

  const active = useActiveSection(NAV_IDS);
  const nextEvent = events.find((event) => event.day) ?? events[0];

  function askAboutEvent(event) {
    setPrefill({ message: `Hi, I'd like to know more about ${event.title}.`, key: Date.now() });
    setModal(null);
    // wait a moment so the pop-up has released the page scroll
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>

      {showLoader && (
        <Loader onLeave={() => setHeroReady(true)} onDone={() => setShowLoader(false)} />
      )}

      <div className="scene" aria-hidden="true">
        <Waves
          lineColor="rgba(71, 219, 217, 0.34)"
          backgroundColor="transparent"
          waveSpeedX={0.0125}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />
        <div className="scene__glow" />
      </div>

      <Cursor />
      <Header active={active} />

      <main>
        <Hero
          ready={heroReady}
          nextEvent={nextEvent}
          onOpenEvent={(item) => setModal({ type: "event", item })}
        />
        <Marquee words={[data.SOCIETY.name, data.SOCIETY.university]} />
        <About />
        <Explore groups={data.explore} />
        <Events items={events} onOpen={(item) => setModal({ type: "event", item })} />
        <Activities items={data.activities} />
        <Projects
          projects={projects}
          resources={resources}
          onOpen={(item) => setModal({ type: "project", item })}
        />
        <Committee members={committee} />
        <Contact key={prefill?.key ?? "blank"} prefill={prefill} />
      </main>

      <Footer />

      {modal && (
        <Modal labelId="modal-title" onClose={closeModal}>
          {modal.type === "event" ? (
            <EventDetail event={modal.item} onRegister={askAboutEvent} />
          ) : (
            <ProjectDetail item={modal.item} />
          )}
        </Modal>
      )}
    </>
  );
}
