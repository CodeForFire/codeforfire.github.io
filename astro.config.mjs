// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

// The org Pages site is served at the root, so no `base` is needed. When a
// custom domain arrives, change `site` and add a CNAME file — nothing else.
const site = 'https://codeforfire.github.io'

const ORG = 'https://github.com/CodeForFire'
const LAGEBUCH = `${ORG}/lagebuch`
const HELFER = `${ORG}/helfer`

/** Developer-facing and English: linked, never copied. */
const github = (items) => ({
  label: 'Auf GitHub',
  collapsed: true,
  items: items.map(([label, link]) => ({ label, link, attrs: { target: '_blank' } })),
})

export default defineConfig({
  site,
  // Lagebuch used to live at the root. Releases, the app's README and people's
  // bookmarks still point at the old addresses, so keep them working.
  redirects: {
    '/download/': '/lagebuch/download/',
    '/probefahrt/': '/lagebuch/probefahrt/',
    '/rundgang/': '/lagebuch/rundgang/',
    '/vergleich/': '/lagebuch/vergleich/',
    '/datenschutz/': '/lagebuch/datenschutz/',
  },
  integrations: [
    starlight({
      title: 'CodeForFire',
      description:
        'Offline-Werkzeuge für die Feuerwehr — Lagebuch für den ELW, FwAssist für die Hosentasche. Open Source, ohne Cloud, ohne Abo.',
      // Monolingual German: Starlight ships German UI strings, so search,
      // navigation and "Auf dieser Seite" need no further configuration.
      locales: {
        root: { label: 'Deutsch', lang: 'de' },
      },
      favicon: '/bilder/favicon.png',
      head: [
        { tag: 'meta', attrs: { property: 'og:image', content: `${site}/bilder/social-preview.png` } },
        { tag: 'meta', attrs: { property: 'og:image:alt', content: 'Lagebuch — Einsatzdokumentation für den ELW' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
      ],
      customCss: ['./src/styles/custom.css'],
      social: [{ icon: 'github', label: 'GitHub', href: ORG }],
      sidebar: [
        {
          label: 'Lagebuch',
          items: [
            { label: 'Start', slug: 'lagebuch' },
            { label: 'Probefahrt in 5 Minuten', slug: 'lagebuch/probefahrt' },
            { label: 'Rundgang durch einen Einsatz', slug: 'lagebuch/rundgang' },
            { label: 'Herunterladen und installieren', slug: 'lagebuch/download' },
            { label: 'Lagebuch im Vergleich', slug: 'lagebuch/vergleich' },
            { label: 'Datenschutz und Sicherheit', slug: 'lagebuch/datenschutz' },
            github([
              ['Quellcode', LAGEBUCH],
              ['Releases', `${LAGEBUCH}/releases`],
              ['Roadmap', `${LAGEBUCH}/blob/main/ROADMAP.md`],
              ['Changelog', `${LAGEBUCH}/blob/main/CHANGELOG.md`],
              ['Fragen & Antworten', `${LAGEBUCH}/discussions`],
              ['Mitmachen', `${LAGEBUCH}/blob/main/CONTRIBUTING.md`],
            ]),
          ],
        },
        {
          label: 'FwAssist',
          items: [
            { label: 'Start', slug: 'fwassist' },
            github([
              ['Quellcode', HELFER],
              ['Releases', `${HELFER}/releases`],
              ['Changelog', `${HELFER}/blob/main/CHANGELOG.md`],
              ['Ideen', `${HELFER}/discussions/categories/ideen`],
              ['Fragen & Antworten', `${HELFER}/discussions`],
            ]),
          ],
        },
      ],
      editLink: undefined,
      lastUpdated: false,
    }),
  ],
})
