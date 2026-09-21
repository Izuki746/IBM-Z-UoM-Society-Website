# IBM Z Society UoM: project documentation

Everything you need to run, edit, extend and deploy the site.
If you only read one section, read **[2. Quick start](#2-quick-start)** and **[5. Editing content](#5-editing-content)**.

## Contents

1. [What this is](#1-what-this-is)
2. [Quick start](#2-quick-start)
3. [Project structure](#3-project-structure)
4. [How the page works](#4-how-the-page-works)
5. [Editing content](#5-editing-content)
6. [Design system](#6-design-system)
7. [Sections reference](#7-sections-reference)
8. [Components reference](#8-components-reference)
9. [Hooks and helpers](#9-hooks-and-helpers)
10. [Connecting a backend](#10-connecting-a-backend)
11. [Accessibility and motion](#11-accessibility-and-motion)
12. [Performance notes](#12-performance-notes)
13. [Recipes: common changes](#13-recipes-common-changes)
14. [Deployment](#14-deployment)
15. [Troubleshooting](#15-troubleshooting)
16. [Known gaps and next steps](#16-known-gaps-and-next-steps)

---

## 1. What this is

The front end of the IBM Z Society website at the University of Manchester. It is a single-page site: one long page with sections, a fixed header that scrolls you to each one, and pop-up windows for event and project details.

| | |
|---|---|
| **Framework** | React 19 |
| **Build tool** | Vite 8 |
| **Icons** | `lucide-react` |
| **Fonts** | Big Shoulders Display (headlines), IBM Plex Sans (text), IBM Plex Mono (intro screen only), installed through `@fontsource` so they are bundled with the site |
| **Styling** | Plain CSS with CSS variables. No CSS framework. |
| **Backend** | None yet. The site uses mock data and pretends forms send. See [section 10](#10-connecting-a-backend). |

The design takes its structure and feel from gustavobatista.dev (start screen, huge name lockup, moving name band, grouped skills, service cards, projects that open in a pop-up, contact form, glow cursor). It uses none of that site's content, branding or copy.

---

## 2. Quick start

You need [Node.js](https://nodejs.org). The project was built and tested with Node 22. If `npm install` complains about your Node version, update Node.

```bash
cd IBM-Z-UoM-Society-Website/ibm-z-temp
npm install        # once, downloads dependencies
npm run dev        # live preview, usually http://localhost:5173
```

| Command | What it does |
|---|---|
| `npm run dev` | Starts a live preview. Saving a file updates the browser instantly. |
| `npm run build` | Makes the finished site in the `dist/` folder. |
| `npm run preview` | Serves the `dist/` folder locally so you can test the real build. |
| `npm run lint` | Checks the code for mistakes. Run it before you commit. |

**Tip:** the intro screen only plays once per browser session. To see it again, open a new tab or a private window.

---

## 3. Project structure

```
IBM-Z-UoM-Society-Website/
├── LICENSE
└── ibm-z-temp/                  ← the app. Run npm commands here.
    ├── index.html               page shell: title, description, favicon
    ├── package.json             dependencies and npm scripts
    ├── vite.config.js           Vite settings
    ├── eslint.config.js         lint rules
    ├── DOCS.md                  this file
    ├── README.md                short version of this file
    ├── public/
    │   └── favicon.svg          browser tab icon
    └── src/
        ├── main.jsx             entry point: loads fonts + CSS, mounts <App />
        ├── App.jsx              puts the whole page together, holds shared state
        ├── data.js              ALL the site's content (mock data)
        ├── api.js               backend switch and GET/POST helpers
        ├── index.css            design tokens + global styles
        ├── assets/
        │   ├── cursor.png       your Z cursor (white)
        │   └── cursor-dark.png  the same Z in dark purple, for the light section
        ├── sections/            one file per page section
        │   ├── Hero.jsx  About.jsx  Explore.jsx  Events.jsx
        │   ├── Activities.jsx  Projects.jsx  Committee.jsx
        │   ├── Contact.jsx  Footer.jsx
        │   └── sections.css     styles for ALL sections
        ├── components/          reusable pieces
        │   ├── Header.jsx/.css      fixed nav + mobile menu
        │   ├── Loader.jsx/.css      the IPL intro screen
        │   ├── Modal.jsx/.css       pop-up window
        │   ├── Details.jsx          pop-up content for events/projects
        │   ├── Cursor.jsx/.css      Z cursor, glow and ring
        │   ├── Waves.jsx/.css       animated line background
        │   ├── Marquee.jsx/.css     moving band of big text
        │   └── Art.jsx              generated pictures for project tiles
        ├── hooks/
        │   ├── useContent.js        loads content (mock now, API later)
        │   └── useActiveSection.js  highlights the current nav link
        └── lib/
            └── boot.js              remembers the intro has played
```

---

## 4. How the page works

### The big picture

`App.jsx` is the conductor. It does four things:

1. **Loads content** with `useContent(endpoint, fallback)`. Right now that returns the mock data from `data.js`.
2. **Holds the shared state**: whether the intro is showing, which pop-up is open, and any message to pre-fill in the contact form.
3. **Draws the layers** in this order: skip link, intro, animated background, cursor, header, `<main>` with all the sections, footer, pop-up.
4. **Passes data and click handlers down** to each section as props.

### Data flow

```
data.js  ──►  useContent()  ──►  App.jsx  ──►  section components  ──►  what you see
(mock)        (or your API)       (props)       (Events, Projects…)
```

Sections never import data themselves (except small labels). They receive it as props, which is why swapping mock data for an API needs no section changes.

### Page order

`Hero` → `Marquee` (moving text band) → `About` → `Explore` → `Events` → `Activities` (the light section) → `Projects` → `Committee` (includes the Join banner) → `Contact` → `Footer`.

### Layers (z-index)

| Layer | z-index |
|---|---|
| Animated background (`.scene`) | 0 |
| Page content (`main`, marquee, footer) | 2 |
| Cursor glow | 40 |
| Mobile menu | 49 |
| Header | 50 |
| Pop-up (modal) | 80 |
| Intro screen (loader) | 100 |
| Cursor ring | 150 |
| Skip link | 200 |

### The intro screen

`Loader.jsx` shows a fake mainframe boot: `IPL`, four `LOAD` lines, then `READY`. Then the screen slides up and the hero letters rise into place.

- Plays **once per browser session** (`sessionStorage` key `ibmz-booted`, see `lib/boot.js`).
- Skipped automatically for people with "reduce motion" turned on.
- Click anywhere, press any key or use "Skip intro" to skip.
- Timing lives at the top of `Loader.jsx` (`STEP_MS`) and in the timeouts inside it.

### "Ask about this event"

The button in an event pop-up closes the pop-up, scrolls to Contact and starts the form with a message already typed. `App.jsx` stores the message in `prefill` and gives `<Contact>` a new `key`, which re-creates the form with that message. Side effect: anything already typed in the form is cleared in that moment.

---

## 5. Editing content

**Almost all text lives in `src/data.js`.** Edit it, save, and the page updates. Every array there is mock data and will later be replaced by your API (same field names).

### `SOCIETY`

```js
export const SOCIETY = {
  name: "IBM Z Society",
  university: "University of Manchester",
  founded: "2026",
  joinUrl: "#contact",   // TODO: your Students' Union membership page
  socials: [],           // TODO: add links, see below
};
```

`socials` takes items like `{ label: "LinkedIn", href: "https://…" }`. They appear in the Contact section and the footer. While the list is empty, nothing is shown.

### `navLinks`

The header and footer links. `id` must match a section's `id` in the page (for example `events` matches `<section id="events">`).

### `events`

| Field | Meaning |
|---|---|
| `id` | Unique, no spaces. |
| `day` | `"17"`. Use `""` if the date isn't confirmed: it shows **TBC**. |
| `month`, `year` | `"Oct"`, `"2026"`. |
| `category` | Small label: `Datathon`, `Workshop`, `Talk`… |
| `title` | Event name. |
| `description` | One line, shown in the list. |
| `details` | Longer text, shown in the pop-up. |
| `location` | Shown in the list and pop-up. |

The **Next event** card in the hero uses the first event that has a `day`. If none has one, it uses the first event.

### `explore`

Three groups, each `{ group, note, items: [...] }`. `items` are the small pill labels.

### `activities`

`{ icon, title, description }`. `icon` must be one of: `terminal`, `mic`, `trophy`, `users`, `briefcase`, `git`. To add another icon, see [recipes](#add-a-new-activity-icon).

### `projects` and `knowledge`

Both use the same shape and appear together in the Projects section. Projects get the filter **Projects**, knowledge items get **Resources**.

| Field | Meaning |
|---|---|
| `id` | Unique. |
| `tag` | Small label on the tile (`Event`, `Recordings`…). |
| `title`, `blurb` | Tile text. |
| `details` | Longer text in the pop-up. |
| `link` | URL for the "Open" button. `""` shows "More details coming soon." |
| `art` | Picture style: `grid`, `bars`, `arcs`, `rack` or `lines`. |
| `seed` | Any number. Changes the pattern, so each tile looks different. |

Tile accent colour is set by **position in the grid** (cyan, blue, magenta, repeat), not by data.

### `committee`

`{ role, focus, name }`. `name` is optional. When filled in it shows under the focus text.

---

## 6. Design system

All design decisions are variables at the top of `src/index.css`. Change a value and it changes everywhere.

### Colours

| Variable | Value | Used for |
|---|---|---|
| `--void` | `#0c0916` | Page background |
| `--plum` | `#1d0f33` | Cards, pop-ups, surfaces |
| `--plum-lift` | `#2a1749` | Slightly lighter surfaces |
| `--ivory` | `#f6f3e6` | Main text |
| `--paper` | `#efeadb` | The one light section (Activities) |
| `--paper-ink`, `--paper-mute` | `#1a1030`, `#4a4160` | Text on the light section |
| `--mist` | `#b0aac2` | Secondary text |
| `--cyan` | `#47dbd9` | Buttons, links, "live" things |
| `--blue` | `#78a9ff` | Tile accents |
| `--magenta` | `#e801a0` | Used sparingly: selection colour, tile accents, intro cursor |

Text/background pairs were checked for contrast: `--mist` on `--void` is 8.8:1, `--void` on `--cyan` is 11.6:1, `--paper-mute` on `--paper` is 7.9:1.

### Typography

| Variable | Font | Used for |
|---|---|---|
| `--display` | Big Shoulders Display | All big headlines, dates, wordmark. Always uppercase. |
| `--sans` | IBM Plex Sans | Body text, buttons, forms |
| `--mono` | IBM Plex Mono | The intro screen only |

IBM Plex is IBM's own typeface family, which suits the subject.

### Layout and spacing

- `.container` is centred, max width `1240px`, with side gutters that grow from 20px to 48px.
- `--header-h` is the header height (72px).
- Sections use `padding-block: clamp(88px, 13vw, 168px)` so spacing scales with the screen.
- Section titles use the `.head` layout: giant headline left, short intro right, stacking on small screens.

### Shape

- Buttons: fully rounded pills.
- Tiles and small cards: `14px` radius.
- Big panels (Join banner, pop-ups): `20px` radius.
- Lists (events, committee): no radius, just thin lines.

### Breakpoints

There is no single breakpoint. Each layout switches where it needs to. The main ones:

| Width | What changes |
|---|---|
| `1100px` | Hero footer becomes two columns |
| `1040px` | Header switches to the menu button |
| `960px` | Activities and Projects go to 2 columns |
| `900px` | Explore stacks, events use a compact layout |
| `860px` | Section titles, About, Contact and footer stack |
| `760px`, `640px`, `600px`, `560px` | Smaller tweaks (committee, hero, grids, pop-up) |

### The background

`.scene` is a fixed layer behind everything: the `Waves` canvas plus a soft coloured glow. Sections after the hero have a 66% dark background, so the waves show faintly through. The Activities section has a solid light background and hides them.

---

## 7. Sections reference

| File | `id` | What it shows | Props |
|---|---|---|---|
| `Hero.jsx` | `home` | Giant "IBM Z SOCIETY" lockup, intro line, two buttons, Next event card | `ready`, `nextEvent`, `onOpenEvent` |
| `About.jsx` | `about` | LEARN. BUILD. CONNECT., description, "New to IBM Z?" box | none |
| `Explore.jsx` | `explore` | Three groups of technology pills | `groups` |
| `Events.jsx` | `events` | Clickable list of events | `items`, `onOpen` |
| `Activities.jsx` | `activities` | 6 activity cells with icons (light section) | `items` |
| `Projects.jsx` | `projects` | Filter buttons + tile grid | `projects`, `resources`, `onOpen` |
| `Committee.jsx` | `committee`, `join` | Role list + Join banner | `members` |
| `Contact.jsx` | `contact` | Intro + contact form | `prefill` |
| `Footer.jsx` | `subscribe` | Email signup, links, legal line | none |

Notes:

- **Hero:** the giant letters are split into `<span class="char">` elements so they can rise in one by one. The stagger comes from the `--i` CSS variable on each letter. `ready` turns the animation on once the intro screen lifts.
- **About:** the text in the "New to IBM Z?" box is a plain description. Edit it directly in `About.jsx`.
- **Explore, About, Hero text** that isn't in `data.js` (headings, intro sentences) lives in the section's own file.
- **Contact form:** three "who are you" options (student, company, speaker). The Organisation field only appears for company and speaker.
- **Footer:** the signup form posts to `/api/subscribe`. The "Get updates by email" link in Events jumps here.

---

## 8. Components reference

### `Header`

Fixed bar with the wordmark, nav links, a "Join the society" button and (on small screens) a menu button that opens a full-screen menu.

- Prop `active`: the id of the current section, used to highlight the link.
- Gets a solid background after you scroll 24px.
- The mobile menu is rendered **outside** the `<header>` on purpose. A header with a blur effect would otherwise trap a full-screen child.
- Escape closes the menu.

### `Loader`

The intro. Props: `onLeave` (called as the screen starts lifting) and `onDone` (called when it can be removed). Lines live in the `STEPS` array at the top.

### `Modal`

A pop-up shell. Props: `labelId` (the id of the heading inside, for screen readers), `onClose`, `children`.

- Closes with the X, the Escape key, or a click outside.
- Traps keyboard focus inside while open.
- Locks page scroll while open.
- Returns focus to the button that opened it when closed.
- **`onClose` must be a stable function** (wrap it in `useCallback`, as `App.jsx` does), otherwise the pop-up re-focuses itself on every render.

### `Details.jsx`

Exports `EventDetail` (title, text, when/where, "Ask about this event" button) and `ProjectDetail` (picture, title, text, "Open" button). Both use the id `modal-title` so the `Modal` can label itself.

### `Cursor`

Only active on devices with a real mouse (`hover: hover` and `pointer: fine`). It adds the class `has-cursor` to `<html>`, and `Cursor.css` uses that class to swap the pointer for your Z.

- **The Z:** `cursor.png` everywhere, `cursor-dark.png` on the light Activities section. The `12 15` after each `url()` is the click point (the middle of the Z).
- **Glow:** a soft cyan/magenta light that trails the mouse slowly.
- **Ring:** a thin cyan ring that appears around clickable things.
- Text fields keep the normal text cursor so typing is clear.
- With "reduce motion", the glow and ring stop lagging and follow instantly.

### `Waves`

The animated background: lines that wave and react to the mouse (Perlin noise drawn on a `<canvas>`). Props (all optional, passed from `App.jsx`):

| Prop | Effect |
|---|---|
| `lineColor` | Colour of the lines |
| `backgroundColor` | Canvas fill (transparent here) |
| `waveSpeedX`, `waveSpeedY` | How fast it moves |
| `waveAmpX`, `waveAmpY` | How tall the waves are |
| `xGap`, `yGap` | Spacing between points/lines (bigger = fewer lines, faster) |
| `friction`, `tension`, `maxCursorMove` | How the mouse pushes the lines |

With "reduce motion" it draws one still frame.

### `Marquee`

The moving band. Prop `words`: an array of strings. It alternates solid and outlined words, separated by small magenta squares. Stops moving with "reduce motion".

### `Art`

Draws a small SVG picture. Props: `variant` (`grid`, `bars`, `arcs`, `rack`, `lines`), `seed` (number), `className`. Colour comes from CSS (`currentColor`). The same seed always makes the same picture.

---

## 9. Hooks and helpers

| File | What it does |
|---|---|
| `hooks/useContent.js` | `useContent(endpoint, fallback)` returns the fallback (mock data) immediately. If the backend is switched on, it fetches the endpoint and swaps the result in. If the fetch fails, the mock data stays. |
| `hooks/useActiveSection.js` | Watches which section is in the middle of the screen and returns its `id` (used to highlight the nav link). Note: the Explore section isn't in the nav, so About stays highlighted while you're in it. |
| `lib/boot.js` | `hasBooted()` says whether to skip the intro (already played this session, or reduce-motion is on). `markBooted()` records that it played. |

---

## 10. Connecting a backend

Open `src/api.js`. It has two switches:

```js
export const API_BASE_URL = "";   // e.g. "https://api.example.com", or "" for the same domain
export const USE_BACKEND = false; // set to true when your API is ready
```

While `USE_BACKEND` is `false`:
- Content comes from `data.js`.
- Forms wait about 0.6 seconds and report success. The data is only logged to the browser console. **No message is really sent.**

### Endpoints the site expects

| Method | Endpoint | Returns / receives |
|---|---|---|
| GET | `/api/events` | Array of events (fields in [section 5](#events)) |
| GET | `/api/projects` | Array of projects |
| GET | `/api/knowledge` | Array of resources (same shape as projects) |
| GET | `/api/committee` | Array of `{ role, focus, name }` |
| POST | `/api/contact` | `{ topic, name, email, message }` (used when the person picks "I'm a student") |
| POST | `/api/partnerships` | `{ topic, name, email, organisation, message }` (company or speaker) |
| POST | `/api/subscribe` | `{ email }` |

`topic` is one of `student`, `company`, `speaker`.

- For the GET endpoints, return JSON. If a request fails, the site quietly keeps showing the mock data.
- For the POST endpoints, return any successful status (200 or 201) with JSON. A failed status makes the form show its error message.

### Same-domain or different domain?

- **Different domain** (API on its own address): set `API_BASE_URL`, and make sure your server allows the website's address with **CORS**.
- **Same domain during development:** tell Vite to forward `/api` to your server in `vite.config.js`:

```js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { '/api': 'http://localhost:3000' },   // your backend's address
  },
})
```

### Before you go live

The forms have no spam protection, rate limiting or validation beyond "required" and email format. Do this on the server (or add a CAPTCHA) before the API is public.

---

## 11. Accessibility and motion

Built in:

- **Skip link** ("Skip to content") appears when you press Tab first.
- **Keyboard:** everything is reachable by keyboard, with a clear cyan focus outline.
- **Pop-ups:** labelled, keep focus inside, close with Escape, return focus afterwards.
- **Forms:** every input has a real `<label>`. Success and error messages are announced to screen readers (`role="status"`).
- **Mobile menu:** button has `aria-expanded` and a clear label; the closed menu is hidden from keyboard and screen readers.
- **Contrast:** text colours were checked (see [design system](#6-design-system)).
- **Reduce motion:** if a visitor's device asks for reduced motion, the intro is skipped, the hero letters appear instantly, the waves and marquee stop, the cursor effects stop lagging, and smooth scrolling is off.

Worth checking yourself before launch: test with the keyboard only, and with a screen reader (VoiceOver on Mac, NVDA on Windows).

---

## 12. Performance notes

- The `Waves` background redraws every frame. It is the heaviest part of the page. If the site feels slow on an older laptop, raise `xGap` and `yGap` in `App.jsx` (fewer lines) or lower the amplitude.
- Blur effects (`backdrop-filter`) and blend modes were **deliberately removed** from the header, pop-up, cards and cursor glow. Stacked on top of an animating full-screen canvas they made the page very slow in testing. If you add them back, test on a low-end machine.
- Fonts are bundled and only the Latin character set is loaded.
- Project pictures are generated SVG, so there are no image files to download.
- Run `npm run build` and check the output sizes when you add anything large.

---

## 13. Recipes: common changes

### Add an event
Add an object to the `events` array in `data.js`. Copy an existing one.

### Change the colours
Edit the variables at the top of `src/index.css`. A few places write cyan as an `rgba(71, 219, 217, …)` value instead of using the variable, so if you change `--cyan`, search the project for `71, 219, 217` and update those too (the Waves `lineColor` in `App.jsx`, the cursor glow, the Join banner and the form focus glow). Magenta is the same: search for `232, 1, 160`.

### Change a font
1. `npm install @fontsource/your-font-name`
2. Import its CSS in `src/main.jsx`.
3. Change the matching variable (`--display`, `--sans`) in `src/index.css`.

### Add a nav link or a new section
1. Create `src/sections/MySection.jsx` with `<section id="my-section" className="section">…</section>`.
2. Import it in `App.jsx` and place it inside `<main>`.
3. Add `{ id: "my-section", label: "My section" }` to `navLinks` in `data.js`.
4. Add styles to `sections/sections.css`. Reuse the `.head` block for a matching title.

### Add a new activity icon
In `src/sections/Activities.jsx`, import an icon from `lucide-react` (browse names at lucide.dev), add it to `ACTIVITY_ICONS` with a short key, then use that key as `icon` in `data.js`.

### Add a new picture style for project tiles
In `src/components/Art.jsx`, write a function that returns SVG shapes (copy `bars`), then add it to the `VARIANTS` object.

### Change the intro screen text
Edit the `STEPS` array at the top of `src/components/Loader.jsx`.

### Turn the intro off
In `App.jsx`, change `useState(() => !hasBooted())` (the `showLoader` line) to `useState(false)`, and the `heroReady` line to `useState(true)`.

### Change the cursor
Replace `src/assets/cursor.png`. Keep it small (around 25×31px). If it's light-coloured, also replace `cursor-dark.png` with a dark version for the light section. To move the click point, edit the two numbers after `url()` in `Cursor.css`.

### Change the background waves
Edit the props on `<Waves … />` in `App.jsx` (see [Waves](#waves)).

### Remove the moving band
Delete the `<Marquee … />` line (and its import) in `App.jsx`.

### Add real links to Join and social media
Edit `SOCIETY.joinUrl` and `SOCIETY.socials` at the top of `data.js`.

---

## 14. Deployment

Run `npm run build`. The finished site is the `dist/` folder: plain static files that any static host can serve.

Because the app is inside the `ibm-z-temp` folder of your repo, tell the host:

| Setting | Value |
|---|---|
| Root / base directory | `ibm-z-temp` |
| Build command | `npm run build` |
| Output directory | `dist` |

- **Vercel / Netlify / Cloudflare Pages:** connect the GitHub repo and enter the three settings above. Free for a project like this.
- **GitHub Pages:** the site is served from `/repo-name/`, so set `base` in `vite.config.js`:

  ```js
  export default defineConfig({
    plugins: [react()],
    base: '/your-repo-name/',
  })
  ```

  Then upload `dist/` (for example with a GitHub Action).
- **Custom domain:** set it in the host's dashboard and follow their DNS instructions.

Before publishing, check `index.html` (title and description) and replace the placeholder content in `data.js`.

---

## 15. Troubleshooting

| Problem | Fix |
|---|---|
| `npm install` fails | Update Node.js, delete `node_modules` and `package-lock.json`, run `npm install` again. |
| Blank page | Open the browser console (F12). Read the first red error. It usually names the file and line. |
| I don't see the intro screen | It plays once per session. Open a new tab or private window. It is also skipped when "reduce motion" is on. |
| Changes don't appear | Make sure `npm run dev` is running and you saved the file. Try a hard refresh (Ctrl/Cmd + Shift + R). |
| Fonts look wrong | Check the imports in `src/main.jsx` and that `npm install` finished without errors. |
| A nav link doesn't scroll | Its `id` in `navLinks` must match the section's `id` exactly. |
| Cursor is not the Z | It only shows on devices with a mouse. Check `src/assets/cursor.png` exists. Some browsers ignore custom cursors over their own interface (address bar, etc.). |
| The page is slow | See [performance notes](#12-performance-notes). |
| Form says "didn't send" | With `USE_BACKEND = true`, check the Network tab in the browser tools. The request is probably failing (wrong URL, CORS or server error). |
| `npm run lint` errors | Read the message. It names the file and line. |

---

## 16. Known gaps and next steps

**Placeholders to replace before launch**
- `SOCIETY.joinUrl` and `SOCIETY.socials`.
- Event, project, resource and committee content (all mock). Several event dates are TBC.
- Committee names (the `name` field is empty).
- The Join banner says membership is open to every course and level of experience. Check that this is true.
- The legal line in the footer says IBM and IBM Z are trademarks of International Business Machines Corporation. Check whether the society needs extra wording for its IBM relationship.

**Not built yet**
- A real backend (see [section 10](#10-connecting-a-backend)) and spam protection for the forms.
- Individual pages per event or project. Everything is one page with pop-ups, so events have no shareable link of their own.
- Social sharing preview (Open Graph image) and a sitemap, if you want better link previews and search results.
- Automated tests. The site was checked with a browser script (pop-ups, filters, form, prefill, mobile overflow), but nothing is kept in the repo.
- Photos (committee, events). The tile pictures are generated patterns.

**Good next upgrades**
- Connect the backend, then set `USE_BACKEND = true`.
- Add committee photos and real event images.
- Add a "past events" list.
- Deploy to Vercel or Netlify and add your own domain.

---

*Licence: MIT (see the `LICENSE` file at the top of the repo).*
