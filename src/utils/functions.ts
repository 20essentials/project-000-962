export const $ = (el: string) => document.querySelector(el);
export const $$ = (el: string) => document.querySelectorAll(el);

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
