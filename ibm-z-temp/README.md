# IBM Z Society UoM: front end

React + Vite. Frontend only: it runs without a backend and uses mock data.

**Full documentation: [DOCS.md](./DOCS.md)**

## Run it

```bash
npm install
npm run dev      # opens a live preview (usually http://localhost:5173)
npm run build    # makes the finished site in /dist
```

## Where to change things

| I want to change...                     | Edit this                          |
| --------------------------------------- | ---------------------------------- |
| Any text, events, projects, committee   | `src/data.js`                      |
| Membership link and social links        | `SOCIETY` at the top of `src/data.js` |
| Colours, fonts, spacing                 | the `:root` block in `src/index.css` |
| How a section looks                     | `src/sections/sections.css`        |
| The Z cursor                            | `src/assets/cursor.png` (dark version: `cursor-dark.png`) |
| The intro screen text                   | `STEPS` in `src/components/Loader.jsx` |
| Connect a backend                       | `src/api.js` (set `USE_BACKEND = true`) |

## Structure

```
src/
  data.js            all the content
  api.js             backend hooks (GET/POST helpers)
  App.jsx            puts the page together
  sections/          Hero, About, Explore, Events, Activities,
                     Projects, Committee, Contact, Footer
  components/        Header, Loader (intro), Modal, Cursor,
                     Waves (background), Marquee, Art (tile pictures)
```

## Notes

- The intro plays once per browser session. Click or press any key to skip.
  To see it again, open a new tab or clear session storage.
- Motion is turned down automatically for people who use "reduce motion".
- Design inspired by the structure of gustavobatista.dev. No content, branding
  or copy from that site is used.
