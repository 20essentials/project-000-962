export const $ = (el: string) => document.querySelector(el);
export const $$ = (el: string) => document.querySelectorAll(el);
const numsKeys = ['1', '2', '3', '4'];
const languages = ['html', 'css', 'javascript', 'preview'];
import { encode } from 'js-base64';

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

export function closeOrOpenModal() {
  const $modalPreview = $('.modal-preview') as HTMLElement;
  $modalPreview.innerHTML = '';
  const $menuTooltip = $('.menu-tooltip');
  if ($modalPreview.classList.contains('open')) {
    $modalPreview.classList.remove('open');
    $menuTooltip?.classList.remove('menul-tooltip-open');
    return;
  }
  $modalPreview?.classList.add('open');
  $menuTooltip?.classList.add('menul-tooltip-open');
  const $iframe = $('.editor-preview')?.cloneNode(true) as HTMLIFrameElement;
  if ($iframe) {
    $modalPreview?.appendChild($iframe);
  }
}

export function addHandlersKeyDowns() {
  window.addEventListener('keydown', e => {
    const { ctrlKey, metaKey, altKey, key } = e;
    if ((ctrlKey || metaKey) && key.toLowerCase() === 'p') {
      e.preventDefault();
      closeOrOpenModal();
    }
    if (key == 'Escape') {
      const $modalPreview = $('.modal-preview') as HTMLElement;
      if ($modalPreview?.classList.contains('open')) {
        const $menuTooltip = $('.menu-tooltip');
        $modalPreview.classList.remove('open');
        $menuTooltip?.classList.remove('menul-tooltip-open');
        return;
      }
    }

    if ((altKey || ctrlKey) && numsKeys.includes(key)) {
      e.preventDefault();
      const numKey = Number(key);
      const editorName = languages[numKey - 1];
      const $editorTarget = $(`.editor-${editorName}`);
      $editorTarget?.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

