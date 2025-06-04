export const $ = (el: string) => document.querySelector(el);
export const $$ = (el: string) => document.querySelectorAll(el);

export function baseUrl(path: string) {
  return new URL(path.replace(/^\/+/, ""), import.meta.env.SITE).toString();
}