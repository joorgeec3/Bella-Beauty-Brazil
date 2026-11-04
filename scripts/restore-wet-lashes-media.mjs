import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { createHash } from 'node:crypto';

// Restore the exact original client-supplied PNG from transport-only chunks.
// No image editing, cropping, rotation, recompression or re-encoding occurs.
const name = 'IMG_3675.PNG';
const size = 3368833;
const sha256 = '39928e8a56030a8cd7c0f85893831d279b3137900de1a9de9f244231e005c2ef';
const fragments = await Promise.all(Array.from({length:9}, (_,i) =>
  readFile(join('media-source','wet-look-lashes',
    name + '.part-' + String(i+1).padStart(3,'0') + '.b64'), 'utf8')
));
const bytes = Buffer.from(fragments.join('').replace(/\s+/g,''), 'base64');
if (bytes.length !== size || createHash('sha256').update(bytes).digest('hex') !== sha256) {
  throw new Error('Original Wet Look PNG failed byte-for-byte SHA-256 verification');
}
const target = join('public','assets','bella','wet-eyelash-extensions',name);
await mkdir(dirname(target), {recursive:true});
await writeFile(target, bytes);
console.log('Restored untouched Wet Look IMG_3675.PNG ('+bytes.length+' bytes; SHA-256 verified)');
