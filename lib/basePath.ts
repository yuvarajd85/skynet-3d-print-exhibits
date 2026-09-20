export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** next/image with `unoptimized: true` doesn't prefix basePath onto raw `src` itself — do it manually for anything served from `public/`. */
export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}
