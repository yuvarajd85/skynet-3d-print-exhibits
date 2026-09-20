import test from 'node:test';
import assert from 'node:assert/strict';
import { buildOrderMailto, buildContactMailto, OWNER_EMAIL } from './mailto.ts';

test('builds an order mailto link with encoded subject and body', () => {
  const url = buildOrderMailto({
    modelId: 'IMG_3196',
    modelName: 'Model 3196',
    material: 'PETG',
    infill: 20,
    color: 'Black',
  });
  assert.ok(url.startsWith(`mailto:${OWNER_EMAIL}?subject=`));
  assert.ok(url.includes(encodeURIComponent('Order Request: Model 3196 (IMG_3196)')));
  assert.ok(url.includes(encodeURIComponent('Infill: 20%')));
});

test('builds a plain contact mailto link', () => {
  const url = buildContactMailto('Custom 3D Print Inquiry');
  assert.equal(url, `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent('Custom 3D Print Inquiry')}&body=`);
});
