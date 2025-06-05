export const $ = (el: string) => document.querySelector(el);
export const $$ = (el: string) => document.querySelectorAll(el);
import { encode } from "js-base64";

export function baseUrl(path: string) {
  return new URL(path.replace(/^\/+/, ''), import.meta.env.SITE).toString();
}

export function debounce(func: (...args: any[]) => void, msWait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), msWait);
  };
}

export function updateUrlQueries({
  htmlValue,
  cssValue,
  jsValue
}: {
  htmlValue: string;
  cssValue: string;
  jsValue: string;
}) {
  const url = new URL(window.location.href);
  const params = url.searchParams;

  const values: [string, string][] = [
    ['HTML', htmlValue],
    ['CSS', cssValue],
    ['JavaScript', jsValue]
  ];

  values.forEach(([key, value]) => {
    if (value && value.length > 0) {
      params.set(key, encode(value));
    }
  });

  // Actualizar solo la query, manteniendo el pathname actual
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, '', newUrl);
}

