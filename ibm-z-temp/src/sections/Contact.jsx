import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { apiPost } from "../api";
import { SOCIETY } from "../data";

const TOPICS = [
  { id: "student", label: "I'm a student" },
  { id: "company", label: "I'm from a company" },
  { id: "speaker", label: "I'd like to speak" },
];

const EMPTY = { topic: "student", name: "", email: "", organisation: "", message: "" };

export default function Contact({ prefill }) {
  // "Ask about this event" starts the form with a message already written
  // (App re-creates this component with a new `key` when that happens).
  const [form, setForm] = useState({ ...EMPTY, message: prefill?.message ?? "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const isStudent = form.topic === "student";

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();
    setStatus("sending");

    try {
      // Students go to /api/contact. Companies and speakers go to
      // /api/partnerships and include their organisation.
      if (isStudent) {
        const { topic, name, email, message } = form;
        await apiPost("/api/contact", { topic, name, email, message });
      } else {
        await apiPost("/api/partnerships", form);
      }
      setStatus("success");
      setForm({ ...EMPTY, topic: form.topic });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container contact__grid">
        <div className="contact__intro">
          <h2>
            Let's
            <br />
            connect
          </h2>
          <p>
            Want to join, sponsor an event, speak at the society or just find out
            more? Send us a message and we'll get back to you.
          </p>

          {SOCIETY.socials.length > 0 && (
            <ul className="socials">
              {SOCIETY.socials.map((link) => (
                <li key={link.label}>
                  <a className="text-link" href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form className="form" onSubmit={submit}>
          <fieldset className="segments">
            <legend>What best describes you?</legend>
            {TOPICS.map((topic) => (
              <label className="segment" key={topic.id}>
                <input
                  type="radio"
                  name="topic"
                  value={topic.id}
                  checked={form.topic === topic.id}
                  onChange={update}
                />
                <span>{topic.label}</span>
              </label>
            ))}
          </fieldset>

          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" autoComplete="name" value={form.name} onChange={update} required />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={update} required />
          </div>

          {!isStudent && (
            <div className="field">
              <label htmlFor="organisation">Organisation</label>
              <input
                id="organisation"
                name="organisation"
                autoComplete="organization"
                value={form.organisation}
                onChange={update}
              />
            </div>
          )}

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" value={form.message} onChange={update} required />
          </div>

          <button className="btn btn--primary form__submit" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
            <ArrowUpRight size={18} aria-hidden="true" />
          </button>

          <p className="form__status" role="status" aria-live="polite">
            {status === "success" && "Message sent. We'll reply by email."}
            {status === "error" && "Your message didn't send. Check your connection and try again."}
          </p>
        </form>
      </div>
    </section>
  );
}
