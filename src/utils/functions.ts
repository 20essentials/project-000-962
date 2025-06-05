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
  const languageToUrl = [
    ['HTML', htmlValue],
    ['CSS', cssValue],
    ['JavaScript', jsValue]
  ];

  const languagesWithValue = languageToUrl.filter(([_, languageValue]) => {
    if (languageValue !== '') return true;
    if (languageValue.length > 1) return true;
    return false;
  });

  const url = new URL(window.location.href);
  const urlParams = url.searchParams;

  languagesWithValue.forEach(([languageName, languageValue]) => {
    urlParams.set(languageName, encode(languageValue));
  });
  const [, hashedCode] = url.href.split('/?');
  if (hashedCode) {
    window.history.pushState(null, '', `/?${hashedCode}`);
  }
}
