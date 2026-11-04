import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { createHash } from 'node:crypto';

// Original client-supplied MP4s, stored as content-addressed base64 chunks to
// respect the repository upload transport limit. Files are reconstructed
// byte-for-byte at build/dev time, never transcoded, cropped or modified.
const jobs = [
  {
    source: 'IMG_3664.MP4',
    category: 'classic',
    parts: 13,
    name: 'classic-eyelashes-original.mp4',
    size: 9890298,
    sha256: '7893ffd24d7cdeefc558db2fb98f115d3e25f6e8818a7983bf3b7cb4834cff1b',
  },
  {
    source: 'IMG_3665.MP4',
    category: 'hybrid',
    parts: 7,
    name: 'hybrid-eyelashes-original.mp4',
    size: 5059738,
    sha256: '0ad5d96b68161e28cb2494b0815f2ce9d303a845731df07d409cfc9764d52657',
  },
];
for (const job of jobs) {
  const fragments = await Promise.all(
    Array.from({ length: job.parts }, (_, i) =>
      readFile(
        join('media-originals', 'eyelash-extensions-2026-11',
          job.category, 'part-' + String(i + 1).padStart(2, '0') + '.b64'),
        'utf8'
      )
    )
  );
  const data = Buffer.from(fragments.join(''), 'base64');
  const sha256 = createHash('sha256').update(data).digest('hex');
  if (data.length !== job.size || sha256 !== job.sha256) {
    throw new Error('Original ' + job.source + ' failed byte-integrity check');
  }
  const output = join('public', 'assets', 'bella', 'eyelash-extensions-originals', job.name);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, data);
  console.log('Restored untouched original ' + job.source + ' (' + data.length + ' bytes, SHA-256 OK)');
}


// Classic lash-extension PNGs are large. Their binary Git blobs are kept in
// two raw fragments each solely to comply with the upload transport limit.
// The published PNG is reconstructed exactly; no re-encoding or image editing.
const originalClassicPhotos = [
  {
    name: 'IMG_3668.PNG',
    size: 3295329,
    sha256: '4a13b784a50134eecca26d887a79b0ef531a73a4dc51f018350075b8e5f1039c',
  },
  {
    name: 'IMG_3669.PNG',
    size: 3222631,
    sha256: '6dd8f6b129fd1ff1f27fdaad4b69765bd9f4195cda953209c45604e048eb6d07',
  },
];
for (const photo of originalClassicPhotos) {
  const folder = join('media-originals', 'eyelash-extensions-2026-11', 'classic', 'photos');
  const parts = await Promise.all([
    readFile(join(folder, photo.name + '.part-01')),
    readFile(join(folder, photo.name + '.part-02')),
  ]);
  const data = Buffer.concat(parts);
  if (data.length !== photo.size ||
      createHash('sha256').update(data).digest('hex') !== photo.sha256) {
    throw new Error('Classic photo ' + photo.name + ' failed original byte-integrity verification');
  }
  const output = join('public', 'assets', 'bella', 'classic-eyelash-extensions', photo.name);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, data);
  console.log('Restored original Classic photo ' + photo.name + ' (SHA-256 OK, no edits)');
}
