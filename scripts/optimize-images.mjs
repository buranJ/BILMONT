import sharp from 'sharp'
import { readdir, mkdir, copyFile, stat } from 'node:fs/promises'
import path from 'node:path'

const DIR = '/Users/a99699/Desktop/IT-DOS/Projects/BILMONT/public/assets/images'
const BACKUP = path.join(DIR, '_original')

// [glob-ish name, max width, quality]  — max width ≈ 2× the largest on-screen size
const JOBS = [
  // FeatureGrid portrait: rendered at max 520px (desktop) / 420px (mobile)
  { files: ['m.png'], width: 1040, quality: 82, out: 'webp' },
  // Stem gallery cards
  { files: ['a-1.jpg', 'a-2.jpg', 'a-3.jpg', 'a-4.jpg', 'a-5.jpg'], width: 1400, quality: 80, out: 'webp' },
  // Director portrait
  { files: ['dir.jpg'], width: 900, quality: 82, out: 'webp' },
  // Interior mosaic: largest cell ≈ 800px wide
  {
    files: ['d-1.jpg', 'd-2.jpg', 'd-3.jpg', 'd-4.jpg', 'd-5.jpg', 'd-6.jpg', 'd-7.jpg', 'd-8.jpg', 'd-9.jpg', 'd-10.png'],
    width: 1200,
    quality: 78,
    out: 'webp',
  },
]

// Carousel cards render at 168px wide — 2048×2048 originals are absurd overkill.
const KIDS = { dir: path.join(DIR, 'kids'), width: 420, quality: 80 }

const kb = (n) => (n / 1024).toFixed(0) + ' KB'

async function sizeOf(p) {
  try {
    return (await stat(p)).size
  } catch {
    return 0
  }
}

let before = 0
let after = 0

await mkdir(BACKUP, { recursive: true })
await mkdir(path.join(BACKUP, 'kids'), { recursive: true })

for (const job of JOBS) {
  for (const file of job.files) {
    const src = path.join(DIR, file)
    const srcSize = await sizeOf(src)
    if (!srcSize) {
      console.log(`skip (missing): ${file}`)
      continue
    }

    await copyFile(src, path.join(BACKUP, file))

    const outName = file.replace(/\.(png|jpg|jpeg)$/i, '.webp')
    const dest = path.join(DIR, outName)

    try {
      // `failOn: none` tolerates slightly truncated JPEGs that still decode.
      await sharp(src, { failOn: 'none' })
        .resize({ width: job.width, withoutEnlargement: true })
        .webp({ quality: job.quality })
        .toFile(dest + '.tmp')
    } catch (err) {
      console.log(`FAIL ${file}: ${err.message.split('\n')[0]} — оригинал оставлен`)
      continue
    }

    const { rename, unlink } = await import('node:fs/promises')
    await rename(dest + '.tmp', dest)
    // Remove the now-unused original (it lives in _original/)
    if (outName !== file) await unlink(src)

    const outSize = await sizeOf(dest)
    before += srcSize
    after += outSize
    console.log(`${file.padEnd(12)} ${kb(srcSize).padStart(9)} → ${outName.padEnd(12)} ${kb(outSize).padStart(8)}`)
  }
}

// kids/*.webp — recompress in place (same names, so no code changes needed)
const kidFiles = (await readdir(KIDS.dir)).filter((f) => f.endsWith('.webp'))
for (const file of kidFiles) {
  const src = path.join(KIDS.dir, file)
  const srcSize = await sizeOf(src)
  await copyFile(src, path.join(BACKUP, 'kids', file))

  const tmp = src + '.tmp'
  try {
    await sharp(src, { failOn: 'none' })
      .resize({ width: KIDS.width, withoutEnlargement: true })
      .webp({ quality: KIDS.quality })
      .toFile(tmp)
  } catch (err) {
    console.log(`FAIL kids/${file}: ${err.message.split('\n')[0]}`)
    continue
  }
  const { rename } = await import('node:fs/promises')
  await rename(tmp, src)

  const outSize = await sizeOf(src)
  before += srcSize
  after += outSize
  console.log(`kids/${file.padEnd(7)} ${kb(srcSize).padStart(9)} → ${kb(outSize).padStart(21)}`)
}

console.log('\n──────────────────────────────')
console.log(`Итого: ${(before / 1048576).toFixed(1)} MB → ${(after / 1048576).toFixed(2)} MB`)
console.log(`Экономия: ${(100 - (after / before) * 100).toFixed(1)}%`)
