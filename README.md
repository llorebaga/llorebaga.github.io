# llorebaga.github.io

Personal academic website of **Llorenç Balada Gaggioli**, served by GitHub Pages at <https://llorebaga.github.io>.

It is a plain static site (HTML + CSS + vanilla JS) with no build step: push to `main` and GitHub Pages publishes it.

## Updating content

Everything you'd want to edit lives in **[`assets/js/data.js`](assets/js/data.js)**:

| What | Where in `data.js` |
| --- | --- |
| Name, role, links, email, address | `person` (`links.cv` points to `assets/docs/`, `cvUpdated` sets the date next to the CV button) |
| News items on the front page | `news` (link one to a paper with `paper: "ID"`) |
| About / research text | `about`, `research` |
| Papers | `publications` (newest first; published ones also get a `cite` block for BibTeX) |
| "Research, explained" texts | `explainers` (the simulations themselves are in `assets/js/explain.js`) |
| Featured projects (QOC) | `projects` |
| Talks, conferences, schools, visits | `activities` |
| CV timeline | `cv` |

### Adding a paper

Add an object to `publications`:

```js
{
  id: "NEWID",                      // short acronym shown in the badge and on the map
  title: "…",
  authors: ["Llorenç Balada Gaggioli", "…"],
  venue: "arXiv preprint",          // or "Physical Review A 112, 062612"
  date: "2026-10-01",
  status: "preprint",               // or "published" (green on the map)
  firstAuthor: true,                // thick ring on the map
  topics: ["qc", "lr"],             // qc = Quantum Control, po = Polynomial Optimization, lr = Low-rank Structure, qcomp = Quantum Computing
  map: [760, 300],                  // bubble position in the research map (omit to keep it off the map)
  links: { arxiv: "…", journal: "…", code: "…" },
  cite: { journal: "Physical Review A", volume: "112", number: "062612", doi: "…" }, // published papers only
  abstract: "…"
}
```

Map coordinates use the SVG viewBox `140 40 840 680`. The overlap clusters are centred at
Quantum Control + Polynomial Optimization `(350, 330)`, Quantum Control + Low-rank `(770, 330)`,
and Polynomial Optimization + Low-rank `(560, 610)`, each with radius 90. Keep bubbles (radius 34)
inside their cluster circle and at least ~70 units apart. Single-topic papers sit just outside their
topic and get a short connector (e.g. RSE and RCS around Quantum Control, MSD below Quantum Computing).
A new topic needs `at: [x, y]` and `r` in `data.js`; Quantum Computing is at `(228, 150)` with `r: 80`.

### Activities

Dates are `"YYYY-MM"`. Anything dated after the current month is automatically tagged **Upcoming**,
so there is no need to move entries between "future" and "past" by hand. Set `role` to `"talk"`,
`"poster"` or `""`.

## Preview locally

Any static file server works, for example:

```bash
python -m http.server 8000
```

then open <http://localhost:8000>.

## Structure

```
index.html            page shell and section layout
assets/css/style.css  styles (light + dark theme)
assets/js/i18n.js     language detection and interface labels (en, ca)
assets/js/data.js     all content
assets/js/main.js     rendering, research map, filters
assets/js/explain.js  the three interactive "Research, explained" simulations
assets/img/           photo and favicon
404.html              "page not found" page
```

After changing CSS or JS, bump the `?v=` number on the asset links in `index.html` (and the
stylesheet link in `404.html`) so browsers fetch the new files instead of a cached copy.

## Languages (English / Català)

The site is bilingual. The language comes from `?lang=en` / `?lang=ca`, then the visitor's saved
choice, then their browser language.

- **Content** in `assets/js/data.js`: any text can be a plain string (same in both languages) or
  `{ en: "…", ca: "…" }`. A missing `ca` falls back to English. Paper titles and abstracts stay in English.
- **Interface labels** (menus, buttons, filters, the experiments' messages) are in
  `assets/js/i18n.js`, one dictionary per language. To add a language, add a dictionary there, add
  translations in `data.js`, and add a link to the `.lang-switch` in `index.html`.

## Updating the CV

Replace `assets/docs/CV_Llorenc_Balada_Gaggioli.pdf` with the new PDF (same file name) and set
`person.cvUpdated` in `data.js` to the current month, e.g. `"2026-10"`.
