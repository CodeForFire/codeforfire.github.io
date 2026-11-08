# codeforfire.github.io

The CodeForFire website, home of both apps:
[Lagebuch](https://github.com/CodeForFire/lagebuch) (offline incident
documentation for the command vehicle, at `/lagebuch/`) and
[FwAssist](https://github.com/CodeForFire/helfer) (small offline helpers for
the phone, at `/fwassist/`). The landing page at `/` presents both equally.
Built with
[Astro Starlight](https://starlight.astro.build/), deployed to GitHub Pages at
**<https://codeforfire.github.io/>**.

The site content is German, because its readers are German fire brigades. This
README and the code comments are English, matching the split used in the app
repository.

## Where the content comes from

Most pages are written here, in `src/content/docs/`. Some content is owned by
the app repositories and copied in at build time by `scripts/sync-docs.mjs`:

| On this site | Source |
|---|---|
| `lagebuch/datenschutz` | `CodeForFire/lagebuch` `docs/datenschutz-und-sicherheit.md` |
| Lagebuch logo, favicon, og:image | `CodeForFire/lagebuch` `docs/logo/` |
| demo animation | `CodeForFire/lagebuch` `docs/demo/einsatz-flow.gif` |
| screenshots on `lagebuch/rundgang` | `CodeForFire/lagebuch` `docs/screenshots/` |
| FwAssist icon | `CodeForFire/helfer` `docs/play/icon-512.png` |
| screenshots on `fwassist` | `CodeForFire/helfer` `docs/screenshots/` |

Lagebuch used to live at the root; `astro.config.mjs` redirects the old
addresses (`/download/`, `/rundgang/`, …) to `/lagebuch/…`.

The hotspot positions on `rundgang` (`src/data/rundgang.ts`) are percentages
of the 1920×1032 frame `make screenshots` renders. The build fails if a
screenshot is missing or changes size, and warns about a new screenshot that is
not part of the tour yet. After a visual change in the app, re-check the
positions with `npm run dev`.

Everything the script writes is gitignored — never edit those files here, edit
them in the app repositories. The script fails the build if a source file has
moved, rather than quietly dropping a page.

Because an automatic cross-repo trigger would need a token with write access to
this repository, the site rebuilds **nightly** (and on demand via *Actions →
Pages → Run workflow*). A change to the Datenschutz page or a fresh
`make screenshots` in either app therefore appears here within a day.

## Developing

Needs Node 22.19 or newer (see `.nvmrc`) and checkouts of
`CodeForFire/lagebuch` and `CodeForFire/helfer`. The sync script looks for
each in `$LAGEBUCH_PATH` / `$HELFER_PATH`, then `.lagebuch/` / `.helfer/`,
`../<name>` and `../../<name>`.

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
