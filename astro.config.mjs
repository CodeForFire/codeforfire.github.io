// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

// The org Pages site is served at the root, so no `base` is needed. When a
// custom domain arrives, change `site` and add a CNAME file — nothing else.
const site = 'https://codeforfire.github.io'

const REPO = 'https://github.com/CodeForFire/lagebuch'

export default defineConfig({
  site,
  integrations: [
    starlight({
      title: 'Lagebuch',
      description:
        'Das digitale Einsatztagebuch für den Einsatzleitwagen — offline, ohne Cloud, ohne Abo.',
      // Monolingual German: Starlight ships German UI strings, so search,
      // navigation and "Auf dieser Seite" need no further configuration.
      locales: {
        root: { label: 'Deutsch', lang: 'de' },
      },
      logo: {
        src: './src/assets/lagebuch-logo.png',
        alt: 'Lagebuch',
        replacesTitle: false,
      },
      favicon: '/bilder/favicon.png',
      head: [
        { tag: 'meta', attrs: { property: 'og:image', content: `${site}/bilder/social-preview.png` } },
        { tag: 'meta', attrs: { property: 'og:image:alt', content: 'Lagebuch — Einsatzdokumentation für den ELW' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
      ],
      customCss: ['./src/styles/custom.css'],
      social: [{ icon: 'github', label: 'GitHub', href: REPO }],
      sidebar: [
        {
          label: 'Lagebuch',
          items: [
            { label: 'Start', slug: '' },
            { label: 'Probefahrt in 5 Minuten', slug: 'probefahrt' },
            { label: 'Herunterladen und installieren', slug: 'download' },
            { label: 'Lagebuch im Vergleich', slug: 'vergleich' },
            { label: 'Datenschutz und Sicherheit', slug: 'datenschutz' },
          ],
        },
        {
          // Developer-facing and English: linked, never copied.
          label: 'Auf GitHub',
          items: [
            { label: 'Quellcode', link: REPO, attrs: { target: '_blank' } },
            { label: 'Releases', link: `${REPO}/releases`, attrs: { target: '_blank' } },
            { label: 'Roadmap', link: `${REPO}/blob/main/ROADMAP.md`, attrs: { target: '_blank' } },
            { label: 'Changelog', link: `${REPO}/blob/main/CHANGELOG.md`, attrs: { target: '_blank' } },
            { label: 'Fragen & Antworten', link: `${REPO}/discussions`, attrs: { target: '_blank' } },
            { label: 'Mitmachen', link: `${REPO}/blob/main/CONTRIBUTING.md`, attrs: { target: '_blank' } },
          ],
        },
      ],
      editLink: undefined,
      lastUpdated: false,
    }),
  ],
})
