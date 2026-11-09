// Copies the user-facing content that lives in the app repositories
// (CodeForFire/lagebuch and CodeForFire/FwAssist) into this site. docs/ over
// there is the single source of truth: nothing this script writes is
// hand-edited here, and every target is gitignored.
//
// Run it before `astro build` / `astro dev` (npm run sync).

import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const BLOB = 'https://github.com/CodeForFire/lagebuch/blob/main'

/** Where a checkout of CodeForFire/<name> might be, most specific first. */
function candidates(name, envVar) {
  return [
    process.env[envVar],
    join(siteRoot, `.${name}`), // the CI checkout
    join(siteRoot, '..', name),
    join(siteRoot, '..', '..', name), // the local dev layout
  ].filter(Boolean)
}

function findRepo(name, envVar) {
  const looked = candidates(name, envVar)
  for (const candidate of looked) {
    if (existsSync(join(candidate, 'docs'))) return resolve(candidate)
  }
  throw new Error(
    `No checkout of CodeForFire/${name} found. Looked for a docs/ directory in:\n` +
      looked.map((c) => `  - ${c}`).join('\n') +
      `\n\nClone it next to this repo, or set ${envVar}.`,
  )
}

/** Read a required file, failing with the path rather than an ENOENT stack. */
async function required(path, why) {
  try {
    return await readFile(path, 'utf8')
  } catch {
    throw new Error(`Missing in the app checkout: ${path}\n  (needed for ${why})`)
  }
}

/** Copy every PNG in `from` into a freshly emptied `to`; fail if there are none. */
async function copyScreenshots(from, to) {
  let shots
  try {
    shots = (await readdir(from)).filter((f) => f.endsWith('.png'))
  } catch {
    throw new Error(`Missing in the app checkout: ${from}\n  (needed for the screenshots)`)
  }
  if (shots.length === 0) throw new Error(`No screenshots found in ${from}`)
  await rm(to, { recursive: true, force: true })
  await mkdir(to, { recursive: true })
  for (const shot of shots) await cp(join(from, shot), join(to, shot))
  return shots.map((shot) => join(to, shot))
}

/**
 * docs/datenschutz-und-sicherheit.md is written for github.com, so its links
 * are repo-relative. Point them at github.com — except the download anchor,
 * which has a better home on this site.
 */
const LINK_REWRITES = [
  ['](../README.md#downloads-prüfen)', '](/lagebuch/download/#downloads-prüfen)'],
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

  const target = join(siteRoot, 'src', 'content', 'docs', 'lagebuch', 'datenschutz.md')
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

async function syncLagebuchImages(lagebuch) {
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
  await required(gifSource, 'the demo animation on the Lagebuch start page')
  await cp(gifSource, join(bilder, 'einsatz-flow.gif'))
  written.push(join(bilder, 'einsatz-flow.gif'))

  // Into src/assets, not public/: the Rundgang page renders them through
  // astro:assets, which needs them as imports to emit WebP and srcsets.
  written.push(
    ...(await copyScreenshots(
      join(lagebuch, 'docs', 'screenshots'),
      join(siteRoot, 'src', 'assets', 'screenshots'),
    )),
  )

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

/** The FwAssist start page: the launcher icon and the phone screenshots. */
async function syncFwAssist(fwassist) {
  const iconSource = join(fwassist, 'docs', 'play', 'icon-512.png')
  await required(iconSource, 'the FwAssist hero icon')
  const iconTarget = join(siteRoot, 'src', 'assets', 'fwassist-icon.png')
  await cp(iconSource, iconTarget)

  const shots = await copyScreenshots(
    join(fwassist, 'docs', 'screenshots'),
    join(siteRoot, 'src', 'assets', 'fwassist', 'screenshots'),
  )
  return [iconTarget, ...shots]
}

const lagebuch = findRepo('lagebuch', 'LAGEBUCH_PATH')
console.log(`sync-docs: reading Lagebuch from ${lagebuch} @ ${describe(lagebuch)}`)
const fwassist = findRepo('FwAssist', 'FWASSIST_PATH')
console.log(`sync-docs: reading FwAssist from ${fwassist} @ ${describe(fwassist)}`)
const written = [
  await syncDatenschutz(lagebuch),
  ...(await syncLagebuchImages(lagebuch)),
  ...(await syncFwAssist(fwassist)),
]
console.log(`sync-docs: wrote ${written.length} files`)
