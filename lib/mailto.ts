export const OWNER_EMAIL = 'dharani.natarajan@gmail.com';
export const OWNER_NAME = 'Dharani Natarajan';

export interface OrderSpec {
  modelId: string;
  modelName: string;
  material: string;
  infill: number;
  color: string;
}

export function buildOrderMailto(order: OrderSpec, to: string = OWNER_EMAIL): string {
  const subject = `Order Request: ${order.modelName} (${order.modelId})`;
  const body = [
    `Model: ${order.modelName}`,
    `Reference code: ${order.modelId}`,
    `Material: ${order.material}`,
    `Infill: ${order.infill}%`,
    `Color: ${order.color}`,
    '',
    'Shipping address:',
    '(please fill in)',
    '',
    'Please attach any reference images or CAD files to this email.',
  ].join('\n');
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildContactMailto(subject: string, body = '', to: string = OWNER_EMAIL): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
