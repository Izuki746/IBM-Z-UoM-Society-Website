import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { apiPost } from "../api";
import { SOCIETY, navLinks } from "../data";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function subscribe(event) {
    event.preventDefault();
    setStatus("sending");
    try {
      await apiPost("/api/subscribe", { email });
      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <footer className="footer" id="subscribe">
      <div className="container">
        <div className="footer__top">
          <div className="footer__signup">
            <h2>Get event updates</h2>
            <p>New workshops, talks and datathons, straight to your inbox.</p>
            <form className="signup" onSubmit={subscribe}>
              <label className="sr-only" htmlFor="subscribe-email">
                Email address
              </label>
              <input
                id="subscribe-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <button className="btn btn--primary" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Signing up…" : "Sign up"}
                <ArrowUpRight size={18} aria-hidden="true" />
              </button>
            </form>
            <p className="form__status" role="status" aria-live="polite">
              {status === "success" && "You're on the list."}
              {status === "error" && "That didn't work. Check your email address and try again."}
            </p>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`}>
                {link.label}
              </a>
            ))}
            <a href="#home">Back to top</a>
            {SOCIETY.socials.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} {SOCIETY.name}, {SOCIETY.university}.
          </p>
          <p>IBM and IBM Z are trademarks of International Business Machines Corporation.</p>
        </div>
      </div>
    </footer>
  );
}
