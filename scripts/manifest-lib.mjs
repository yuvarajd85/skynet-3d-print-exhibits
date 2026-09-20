const PHOTO_EXT = /\.(jpe?g|png)$/i;
const VIDEO_EXT = /\.(mp4|mov)$/i;
const EXCLUDED = new Set(['temp.jpg']);

/**
 * Groups raw filenames (e.g. from resources/pics) into product entries by
 * shared basename. IMG_3196.JPG + IMG_3196.MP4 -> one product with both
 * photo and video. A lone COLLAGE.jpg or orphan .MOV becomes its own
 * photo-only or video-only product.
 */
export function groupProductFiles(filenames) {
  const groups = new Map();

  for (const filename of filenames) {
    if (EXCLUDED.has(filename)) continue;
    const ext = filename.slice(filename.lastIndexOf('.'));
    const id = filename.slice(0, -ext.length);
    if (!groups.has(id)) groups.set(id, []);
    groups.get(id).push(filename);
  }

  return [...groups.entries()]
    .map(([id, files]) => ({
      id,
      photo: files.find((f) => PHOTO_EXT.test(f)) ?? null,
      video: files.find((f) => VIDEO_EXT.test(f)) ?? null,
    }))
    .sort((a, b) => a.id.localeCompare(b.id));
}
