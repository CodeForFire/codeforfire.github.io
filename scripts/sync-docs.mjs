// Copies the user-facing content that lives in CodeForFire/lagebuch into this
// site. docs/ over there is the single source of truth: nothing this script
// writes is hand-edited here, and every target is gitignored.
//
// Run it before `astro build` / `astro dev` (npm run sync).

import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const BLOB = 'https://github.com/CodeForFire/lagebuch/blob/main'

/** Where a checkout of CodeForFire/lagebuch might be, most specific first. */
const CANDIDATES = [
  process.env.LAGEBUCH_PATH,
  join(siteRoot, '.lagebuch'), // the CI checkout
  join(siteRoot, '..', 'lagebuch'),
  join(siteRoot, '..', '..', 'lagebuch'), // the local dev layout
].filter(Boolean)

function findLagebuch() {
  for (const candidate of CANDIDATES) {
    if (existsSync(join(candidate, 'docs'))) return resolve(candidate)
  }
  throw new Error(
    'No checkout of CodeForFire/lagebuch found. Looked for a docs/ directory in:\n' +
      CANDIDATES.map((c) => `  - ${c}`).join('\n') +
      '\n\nClone it next to this repo, or set LAGEBUCH_PATH.',
  )
}

/** Read a required file, failing with the path rather than an ENOENT stack. */
async function required(path, why) {
  try {
    return await readFile(path, 'utf8')
  } catch {
    throw new Error(`Missing in the lagebuch checkout: ${path}\n  (needed for ${why})`)
  }
}

/**
 * docs/datenschutz-und-sicherheit.md is written for github.com, so its links
 * are repo-relative. Point them at github.com — except the download anchor,
 * which has a better home on this site.
 */
const LINK_REWRITES = [
  ['](../README.md#downloads-prüfen)', '](/download/#downloads-prüfen)'],
  ['](master-data.md)', `](${BLOB}/docs/master-data.md)`],
  ['](../ROADMAP.md)', `](${BLOB}/ROADMAP.md)`],
  ['](../SECURITY.md)', `](${BLOB}/SECURITY.md)`],
]

function frontmatter(fields) {
  const escape = (v) => `'${String(v).replaceAll("'", "''")}'`
  return ['---', ...Object.entries(fields).map(([k, v]) => `${k}: ${escape(v)}`), '---', ''].join('\n')
}

async function syncDatenschutz(lagebuch) {
  const source = join(lagebuch, 'docs', 'datenschutz-und-sicherheit.md')
  let body = await required(source, 'the Datenschutz page')

  // Starlight renders the frontmatter title as the <h1>; drop the file's own.
  body = body.replace(/^#\s+.*\n+/, '')

  for (const [from, to] of LINK_REWRITES) {
    if (!body.includes(from)) {
      throw new Error(
        `Link rewrite no longer matches in ${source}:\n  ${from}\n` +
          'The source document changed — update LINK_REWRITES in scripts/sync-docs.mjs.',
      )
    }
    body = body.replaceAll(from, to)
  }

  const target = join(siteRoot, 'src', 'content', 'docs', 'datenschutz.md')
  await writeFile(
    target,
    frontmatter({
      title: 'Datenschutz und Sicherheit',
      description:
        'Welche Daten Lagebuch verarbeitet, wo sie liegen, was das Gerät verlässt ' +
        'und wie ihr alles wieder löscht — die Seite für Kreisbrandinspektion und ' +
        'Datenschutzbeauftragte.',
    }) + body,
  )
  return target
}

async function syncImages(lagebuch) {
  const written = []

  const logoSource = join(lagebuch, 'docs', 'logo', 'lagebuch-logo.png')
  await required(logoSource, 'the hero logo')
  const logoTarget = join(siteRoot, 'src', 'assets', 'lagebuch-logo.png')
  await mkdir(dirname(logoTarget), { recursive: true })
  await cp(logoSource, logoTarget)
  written.push(logoTarget)

  const bilder = join(siteRoot, 'public', 'bilder')
  await rm(bilder, { recursive: true, force: true })
  await mkdir(bilder, { recursive: true })

  const gifSource = join(lagebuch, 'docs', 'demo', 'einsatz-flow.gif')
  await required(gifSource, 'the demo animation on the landing page')
  await cp(gifSource, join(bilder, 'einsatz-flow.gif'))
  written.push(join(bilder, 'einsatz-flow.gif'))

  const shotsDir = join(lagebuch, 'docs', 'screenshots')
  let shots
  try {
    shots = (await readdir(shotsDir)).filter((f) => f.endsWith('.png'))
  } catch {
    throw new Error(`Missing in the lagebuch checkout: ${shotsDir}\n  (needed for the screenshots)`)
  }
  if (shots.length === 0) throw new Error(`No screenshots found in ${shotsDir}`)
  // Into src/assets, not public/: the Rundgang page renders them through
  // astro:assets, which needs them as imports to emit WebP and srcsets.
  const screenshots = join(siteRoot, 'src', 'assets', 'screenshots')
  await rm(screenshots, { recursive: true, force: true })
  await mkdir(screenshots, { recursive: true })
  for (const shot of shots) {
    await cp(join(shotsDir, shot), join(screenshots, shot))
    written.push(join(screenshots, shot))
  }

  await cp(logoSource, join(bilder, 'favicon.png'))
  written.push(join(bilder, 'favicon.png'))

  // The social-preview image is the og:image for every page.
  const socialSource = join(lagebuch, 'docs', 'logo', 'lagebuch-social-preview.png')
  await required(socialSource, 'the og:image link preview')
  await cp(socialSource, join(bilder, 'social-preview.png'))
  written.push(join(bilder, 'social-preview.png'))

  return written
}

/** Report which commit the content came from — a stale checkout is otherwise invisible. */
function describe(repo) {
  try {
    const git = (...args) => execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8' }).trim()
    return `${git('rev-parse', '--short', 'HEAD')} (${git('rev-parse', '--abbrev-ref', 'HEAD')})`
  } catch {
    return 'not a git checkout'
  }
}

const lagebuch = findLagebuch()
console.log(`sync-docs: reading from ${lagebuch} @ ${describe(lagebuch)}`)
const written = [await syncDatenschutz(lagebuch), ...(await syncImages(lagebuch))]
console.log(`sync-docs: wrote ${written.length} files`)
