/**
 * Rebuilds the site photos from full-size originals.
 *
 *   1. Drop the original into .image-originals/ (or .image-originals/kids/)
 *      using the same base name as on the site, e.g. d-3.jpg or kids/2.png.
 *   2. Run `npm run images`.
 *
 * Every photo is re-encoded from its original (never from an already
 * compressed WebP), so running it again does not degrade quality.
 * Files starting with "_" are ignored.
 */
import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(ROOT, '.image-originals')
const OUT = path.join(ROOT, 'public/assets/images')

// [name test, outputs as [suffix, max width]..., quality]
// Max width ≈ 2× the largest on-screen size.
const RULES = [
  { test: /^kids\//, sizes: [['', 420]], quality: 80 }, // hero carousel, 168px cards
  { test: /^a-/, sizes: [['', 800]], quality: 78 }, // STEM cards, ~330px wide
  { test: /^d-10$/, sizes: [['', 1200]], quality: 78 }, // interior lead image, 8/12 cols
  { test: /^d-/, sizes: [['', 800]], quality: 76 }, // interior mosaic, 4/12 cols
  { test: /^dir$/, sizes: [['', 900]], quality: 82 }, // director portrait
  { test: /^m$/, sizes: [['', 1040], ['-640', 640]], quality: 82 }, // features portrait
]

const kb = (n) => (n / 1024).toFixed(0) + ' KB'

async function list(dir, prefix = '') {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name.startsWith('_') || e.name.startsWith('.')) continue
    if (e.isDirectory()) out.push(...(await list(path.join(dir, e.name), `${prefix}${e.name}/`)))
    else if (/\.(jpe?g|png|webp|heic)$/i.test(e.name)) out.push(prefix + e.name)
  }
  return out
}

for (const file of await list(SRC)) {
  const name = file.replace(/\.[^.]+$/, '')
  const rule = RULES.find((r) => r.test.test(name))
  if (!rule) {
    console.log(`skip (no rule): ${file}`)
    continue
  }
  for (const [suffix, width] of rule.sizes) {
    const dest = path.join(OUT, `${name}${suffix}.webp`)
    const info = await sharp(path.join(SRC, file), { failOn: 'none' })
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: rule.quality })
      .toFile(dest)
    console.log(`${file.padEnd(16)} → ${path.relative(OUT, dest).padEnd(16)} ${info.width}×${info.height}  ${kb(info.size)}`)
  }
}
