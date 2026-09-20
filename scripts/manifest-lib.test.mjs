import test from 'node:test';
import assert from 'node:assert/strict';
import { groupProductFiles } from './manifest-lib.mjs';

test('groups photo+video pairs by shared basename', () => {
  const result = groupProductFiles(['IMG_3196.JPG', 'IMG_3196.MP4']);
  assert.deepEqual(result, [
    { id: 'IMG_3196', photo: 'IMG_3196.JPG', video: 'IMG_3196.MP4' },
  ]);
});

test('handles orphan video-only and photo-only files', () => {
  const result = groupProductFiles(['IMG_3195.MOV', 'IMG_4364.JPG']);
  assert.deepEqual(result, [
    { id: 'IMG_3195', photo: null, video: 'IMG_3195.MOV' },
    { id: 'IMG_4364', photo: 'IMG_4364.JPG', video: null },
  ]);
});

test('excludes temp.jpg', () => {
  const result = groupProductFiles(['temp.jpg', 'IMG_5827.JPG']);
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'IMG_5827');
});

test('standalone COLLAGE files each become their own product', () => {
  const result = groupProductFiles([
    '1593200B-983F-435E-88E7-99AD7DE15AB6-COLLAGE.jpg',
    'BEDD7737-1AD0-47A5-90AA-AC82C459CCB4.jpg',
  ]);
  assert.equal(result.length, 2);
  assert.ok(result.every((r) => r.photo && !r.video));
});
