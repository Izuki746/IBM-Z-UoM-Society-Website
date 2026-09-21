import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks, SOCIETY } from "../data";
import "./Header.css";

export default function Header({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // add a background once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // mobile menu: lock scroll, close with Escape
  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = "hidden";
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
    <header className={`header ${scrolled || open ? "is-solid" : ""}`}>
      <div className="header__bar container">
        <a className="brand" href="#home" onClick={close} aria-label={`${SOCIETY.name}, back to top`}>
          <span className="brand__mark">IBM Z</span>
          <span className="brand__sub">Society</span>
        </a>

        <nav className="nav" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? "true" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a className="btn btn--primary btn--small header__cta" href="#join">
          Join the society
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>

        <button
          className="header__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>

    {/* Kept outside <header>: a blurred header would otherwise trap this full-screen menu */}
      <nav
        id="mobile-menu"
        className={`menu ${open ? "is-open" : ""}`}
        aria-label="Mobile"
      >
        {navLinks.map((link) => (
          <a key={link.id} href={`#${link.id}`} onClick={close}>
            {link.label}
          </a>
        ))}
        <a className="menu__join" href="#join" onClick={close}>
          Join the society
        </a>
      </nav>
    </>
  );
}
