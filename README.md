# codeforfire.github.io

The website for [Lagebuch](https://github.com/CodeForFire/lagebuch) — offline
incident documentation for fire brigades. Built with
[Astro Starlight](https://starlight.astro.build/), deployed to GitHub Pages at
**<https://codeforfire.github.io/>**.

The site content is German, because its readers are German fire brigades. This
README and the code comments are English, matching the split used in the app
repository.

## Where the content comes from

Most pages are written here, in `src/content/docs/`. Some content is owned by
the app repository and copied in at build time by `scripts/sync-docs.mjs`:

| On this site | Source in `CodeForFire/lagebuch` |
|---|---|
| `datenschutz` | `docs/datenschutz-und-sicherheit.md` |
| logo, favicon, og:image | `docs/logo/` |
| demo animation | `docs/demo/einsatz-flow.gif` |
| screenshots on `rundgang` | `docs/screenshots/` |

The hotspot positions on `rundgang` (`src/data/rundgang.ts`) are percentages
of the 1920×1032 frame `make screenshots` renders. The build fails if a
screenshot is missing or changes size, and warns about a new screenshot that is
not part of the tour yet. After a visual change in the app, re-check the
positions with `npm run dev`.

Everything the script writes is gitignored — never edit those files here, edit
them in the app repository. The script fails the build if a source file has
moved, rather than quietly dropping a page.

Because an automatic cross-repo trigger would need a token with write access to
this repository, the site rebuilds **nightly** (and on demand via *Actions →
Pages → Run workflow*). A change to the Datenschutz page or a fresh
`make screenshots` therefore appears here within a day.

## Developing

Needs Node 22.19 or newer (see `.nvmrc`) and a checkout of
`CodeForFire/lagebuch`. The sync script looks for it in `$LAGEBUCH_PATH`, then
`.lagebuch/`, `../lagebuch` and `../../lagebuch`.

```bash
npm install
npm run dev       # syncs, then serves on http://localhost:4321/
npm run build     # syncs, then builds into dist/
npm run preview   # serve the built site
```

`npm run sync` on its own refreshes the imported content. It prints the commit
it read from, so a stale checkout is visible rather than silently shipped.

## Contributing

Issues and pull requests are welcome. Community guidelines, the code of conduct
and the security policy live in the
[CodeForFire org defaults](https://github.com/CodeForFire/.github).

Commits must be [DCO signed off](https://developercertificate.org/)
(`git commit -s`) and cryptographically signed (`git commit -S`); `main`
rejects anything else.
