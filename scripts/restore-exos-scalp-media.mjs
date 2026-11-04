import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { createHash } from 'node:crypto';

// The user-supplied PNG is split solely to meet the GitHub upload limit.
// Reconstruct exactly; never crop, rotate, filter or re-encode image pixels.
const original = {
  name: 'IMG_3674.PNG',
  count: 13,
  size: 3862643,
  sha256: 'fc2a7a9f1735798aa74cdf9f4e7b3cfa5135dfc7221a1390a54767ec74784240',
};
const fragments = await Promise.all(Array.from({length: original.count}, (_, i) =>
  readFile(join('media-source', 'exos-hair-scalp',
    original.name + '.part-' + String(i + 1).padStart(3, '0') + '.b64'), 'utf8')
));
const bytes = Buffer.from(fragments.join('').replace(/\s+/g, ''), 'base64');
const hash = createHash('sha256').update(bytes).digest('hex');
if (bytes.length !== original.size || hash !== original.sha256) {
  throw new Error('Exos Hair Scalp original PNG failed byte-for-byte SHA-256 verification');
}
const output = join('public', 'assets', 'bella', 'exos-hair-scalp', original.name);
await mkdir(dirname(output), { recursive: true });
await writeFile(output, bytes);
console.log('Restored untouched Exos Hair Scalp image (' + bytes.length + ' bytes; SHA-256 verified)');
