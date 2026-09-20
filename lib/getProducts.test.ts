import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeProducts } from './getProducts.ts';

test('fills in fallback metadata for manifest entries missing hand-authored data', () => {
  const [product] = mergeProducts(
    [{ id: 'IMG_9999', photo: '/pics/IMG_9999.JPG', video: null, blurDataURL: null }],
    {}
  );
  assert.equal(product.id, 'IMG_9999');
  assert.equal(product.category, 'Prototypes');
  assert.equal(product.photo, '/pics/IMG_9999.JPG');
});

test('prefers hand-authored metadata when present', () => {
  const [product] = mergeProducts(
    [{ id: 'IMG_1', photo: null, video: '/pics/IMG_1.MP4', blurDataURL: null }],
    { IMG_1: { name: 'Dragon', category: 'Art', materials: ['Resin'], turnaround: '3 days', blurb: 'x' } }
  );
  assert.equal(product.name, 'Dragon');
  assert.equal(product.category, 'Art');
});
