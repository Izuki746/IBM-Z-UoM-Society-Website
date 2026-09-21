/*
  ============================================================
  ALL THE WORDS ON THE SITE LIVE IN THIS FILE
  ============================================================
  Change text, dates, events, committee roles etc. here and the
  page updates. You don't need to touch the React files for that.

  Everything below is MOCK DATA. When your backend exists, the
  site will fetch it instead (see src/api.js), and this file
  becomes the fallback.
*/

export const SOCIETY = {
  name: "IBM Z Society",
  university: "University of Manchester",
  founded: "2026",

  // TODO: replace "#contact" with your Students' Union membership page.
  joinUrl: "#contact",

  // TODO: add your links. They show up in the Contact section and
  // the footer automatically. Leave the list empty to hide them.
  // Example: { label: "LinkedIn", href: "https://www.linkedin.com/..." }
  socials: [],
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "events", label: "Events" },
  { id: "activities", label: "Activities" },
  { id: "projects", label: "Projects" },
  { id: "committee", label: "Committee" },
  { id: "contact", label: "Contact" },
];

/* ---------- EVENTS ----------
   GET /api/events should return an array of:
   { id, day, month, year, category, title, description, details, location }
   `day` can be "" if the date isn't confirmed yet (shows "TBC"). */
export const events = [
  {
    id: "datathon-2026",
    day: "17",
    month: "Oct",
    year: "2026",
    category: "Datathon",
    title: "IBM Z Datathon 2026",
    description:
      "A student challenge bringing enterprise computing, AI and problem solving together.",
    details:
      "Work in a team on a real-world data problem using enterprise computing and AI tools. Format, prizes and sign-up details will be announced here.",
    location: "Manchester and online",
  },
  {
    id: "xplore",
    day: "",
    month: "Oct",
    year: "2026",
    category: "Workshop",
    title: "IBM Z Xplore",
    description:
      "A hands-on introduction to IBM Z and the technologies running modern enterprise systems.",
    details:
      "A beginner-friendly workshop where you get hands-on with IBM Z. No previous mainframe experience needed. The exact date and room will be announced here.",
    location: "University of Manchester",
  },
  {
    id: "mainframe-security",
    day: "",
    month: "Nov",
    year: "2026",
    category: "Talk",
    title: "Mainframe security",
    description:
      "A look at the security principles protecting some of the world's most critical systems.",
    details:
      "A talk on how security is designed into enterprise systems, and what it looks like in practice. Speaker and date will be announced here.",
    location: "University of Manchester",
  },
];

/* ---------- EXPLORE ---------- */
export const explore = [
  {
    group: "IBM Z",
    note: "The platform and the ideas behind it.",
    items: ["IBM Z", "z/OS", "Linux on Z", "Mainframes", "Enterprise computing"],
  },
  {
    group: "Development",
    note: "The tools we use to build things.",
    items: ["Python", "Java", "C", "JavaScript", "Git", "Open source"],
  },
  {
    group: "Systems & AI",
    note: "Where enterprise computing is heading.",
    items: ["AI", "Cybersecurity", "Cloud", "Systems", "Networking", "Automation"],
  },
];

/* ---------- ACTIVITIES ----------
   `icon` must match a name in ACTIVITY_ICONS (src/sections/Activities.jsx). */
export const activities = [
  {
    icon: "terminal",
    title: "Technical workshops",
    description:
      "Hands-on sessions that make enterprise technology accessible to students.",
  },
  {
    icon: "mic",
    title: "Industry talks",
    description:
      "Meet engineers, researchers and professionals who work with IBM Z.",
  },
  {
    icon: "trophy",
    title: "Hackathons and datathons",
    description:
      "Build practical projects around enterprise computing, AI and real-world problems.",
  },
  {
    icon: "users",
    title: "Community",
    description:
      "A space for students interested in mainframes, systems, security and the future of computing.",
  },
  {
    icon: "briefcase",
    title: "Career development",
    description:
      "Find pathways into enterprise technology and meet people already working in it.",
  },
  {
    icon: "git",
    title: "Open source",
    description:
      "Explore modern development workflows and open-source projects across enterprise systems.",
  },
];

/* ---------- PROJECTS ----------
   GET /api/projects should return an array of:
   { id, tag, title, blurb, details, link, art, seed }
   `art` is one of: grid, bars, arcs, rack, lines. `seed` is any number
   (it changes the pattern). `link` can be "" until you have one. */
export const projects = [
  {
    id: "datathon",
    tag: "Event",
    title: "IBM Z Datathon",
    blurb:
      "Our flagship student challenge combining enterprise computing, AI and collaborative problem solving.",
    details:
      "The datathon is the biggest event of our year. Teams tackle a data challenge together and present what they find. Full details will be announced here.",
    link: "",
    art: "grid",
    seed: 3,
  },
  {
    id: "student-z-lab",
    tag: "Community",
    title: "Student Z Lab",
    blurb:
      "An environment for students to experiment with IBM Z technologies and build projects.",
    details:
      "A place to try things out. Members can experiment with IBM Z technologies, work on their own ideas and get help from the technical team.",
    link: "",
    art: "rack",
    seed: 7,
  },
  {
    id: "open-source-on-z",
    tag: "Technical",
    title: "Open Source on Z",
    blurb:
      "Exploring how modern open-source development fits into the enterprise computing world.",
    details:
      "We look at how open-source tools and workflows run on IBM Z, and contribute to projects where we can.",
    link: "",
    art: "arcs",
    seed: 5,
  },
];

/* ---------- KNOWLEDGE / RESOURCES ----------
   GET /api/knowledge should return the same shape as projects. */
export const knowledge = [
  {
    id: "talks",
    tag: "Recordings",
    title: "Talks and recordings",
    blurb:
      "Catch up on technical talks from IBM Z engineers, security specialists and industry guests.",
    details:
      "Missed a talk? Recordings from our speakers will be collected here so you can watch them any time.",
    link: "",
    art: "bars",
    seed: 11,
  },
  {
    id: "xplore-resources",
    tag: "Resource",
    title: "IBM Z Xplore",
    blurb:
      "Start learning mainframe technologies through practical challenges and guided resources.",
    details:
      "Practical challenges and guided resources for learning mainframe technologies at your own pace.",
    link: "",
    art: "lines",
    seed: 2,
  },
  {
    id: "enterprise-computing",
    tag: "Guide",
    title: "Enterprise computing",
    blurb:
      "Explore the concepts behind the systems that power banks, airlines, governments and businesses.",
    details:
      "A plain-language guide to the ideas behind enterprise computing: reliability, security and handling huge volumes of work.",
    link: "",
    art: "grid",
    seed: 9,
  },
];

/* ---------- COMMITTEE ----------
   GET /api/committee should return an array of { role, focus, name }.
   `name` is optional. */
export const committee = [
  { role: "Technical Lead", focus: "Technology and workshops", name: "" },
  { role: "Society Chair", focus: "Strategy and community", name: "" },
  { role: "Events", focus: "Events and speakers", name: "" },
  { role: "Partnerships", focus: "Industry and collaboration", name: "" },
];
