import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { createHash } from 'node:crypto';

// Both client-supplied PNGs are stored as transport-safe base64 fragments.
// Reassemble the EXACT original bytes at build/dev time; never re-encode.
const originals = [
  {
    source: 'IMG_3391.PNG',
    prefix: 'IMG_3391.PNG',
    dest: 'IMG_3391.PNG',
    parts: 9,
    size: 3764869,
    sha256: '8037fbc54acbd61cb39016dc90dc16e43bc06fef518094a77290623eff1119c2',
  },
  {
    source: 'IMG_3667(1).PNG',
    prefix: 'IMG_3667-1.PNG',
    dest: 'IMG_3667-1.PNG',
    parts: 7,
    size: 3112029,
    sha256: 'f8abb3f04d43a6cde53d1dbf455785477f830e257ab7ee8031f376ff21cc56e0',
  },
];
for (const photo of originals) {
  const segments = await Promise.all(Array.from({length: photo.parts}, (_, i) =>
    readFile(join('media-source', 'exos-hair-brows',
      photo.prefix + '.part-' + String(i + 1).padStart(3, '0') + '.b64'), 'utf8')
  ));
  const data = Buffer.from(segments.join('').replace(/\s+/g, ''), 'base64');
  const digest = createHash('sha256').update(data).digest('hex');
  if (data.length !== photo.size || digest !== photo.sha256) {
    throw new Error(photo.source + ': original photo failed byte-for-byte SHA-256 verification');
  }
  const output = join('public', 'assets', 'bella', 'exos-hair-brows', photo.dest);
  await mkdir(dirname(output), {recursive: true});
  await writeFile(output, data);
  console.log('Restored original Exos Hair Brows media ' + photo.source +
    ' (' + data.length + ' bytes; SHA-256 verified; no alterations)');
}
