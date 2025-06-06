import * as Monaco from 'monaco-editor';


export const INITIAL_HTML = `<main class="bg">
  <aside class="inner"></aside>
</main>`;

export const INITIAL_CSS = `*,
*::after,
*::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.bg {
  display: flex;
  min-height: 100dvh;
  background-color: black;
  background-image: url('https://20essentials.github.io/project-000-128/assets/n1.avif');
  background-position: center;
  background-size: cover;

  .inner {
    z-index: 9999;
    mix-blend-mode: overlay;
    inset: 0;
    position: absolute;
    animation: moveInner 10s ease infinite alternate;
  }
}

@keyframes moveInner {
  0% {
    background-color: #f0f;
  }

  25% {
    background-color: #0f0;
  }

  50% {
    background-color: #00f;
  }

  75% {
    background-color: #f00;
  }

  100% {
    background-color: #ff0;
  }
}`;

export const INITIAL_JS_ = `function generateStars() {
  stars = Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random() * MAX_DEPTH
  }));
}

function drawStars() {
  ctx.fillStyle = '#0001';
  ctx.fillRect(0, 0, width, height);

  for (const star of stars) {
    star.z -= SPEED;
    if (star.z <= 0) star.z = MAX_DEPTH;

    const scale = MAX_DEPTH / star.z;
    const x = (star.x - halfWidth) * scale + halfWidth;
    const y = (star.y - halfHeight) * scale + halfHeight;
    const dist = Math.hypot(x - halfWidth, y - halfHeight);

    ctx.beginPath();
    ctx.arc(x, y, scale, 0, Math.PI * 2);
    ctx.fillStyle = red;
    ctx.fill();
  }

  requestAnimationFrame(drawStars);
}`;

export const INITIAL_JS = `const message = "Keep calm and code on."`

export const COMMON_OPTIONS_EDITOR: Monaco.editor.IStandaloneEditorConstructionOptions =
  {
    fontSize: 16,
    automaticLayout: true,
    scrollBeyondLastLine: true,
    fontFamily: `'VictorMonoNerdFontRegular', 'Cascadia Code PL', 'Menlo', 'Monaco', 'Courier New', 'monospace'`,
    fontLigatures: 'on',
    tabSize: 2,
    minimap: {
      enabled: false
    },
    cursorBlinking: 'blink',
    cursorSmoothCaretAnimation: 'off',
    roundedSelection: true,
    readOnly: false,
    scrollbar: {
      useShadows: false,
      verticalHasArrows: false,
      horizontalHasArrows: false,
      vertical: 'visible',
      horizontal: 'auto',
      verticalScrollbarSize: 9,
      horizontalScrollbarSize: 9
    },
    insertSpaces: true,
    smoothScrolling: true,
    guides: {
      bracketPairs: false
    },
    matchBrackets: 'never',
    overviewRulerLanes: 0,
    stickyScroll: {
      enabled: false
    },
    wordWrap: 'wordWrapColumn',
    wordWrapColumn: 60,
    autoClosingQuotes: 'always',
    autoClosingBrackets: 'always',
    lineNumbers: 'on',
    lineNumbersMinChars: 4
  };

  export const htmlScaffold = (htmlValue: string) => `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Project</title>
      <meta name='viewport' content='width=device-width' />
      <link rel='icon' type='image/svg+xml' href="https://20essentials.github.io/project-000-962/assets/favicon.webp" />
      <link rel="stylesheet" href="styles.css">
    </head>
    <body>
      ${htmlValue}
    <script src="script.js"></script>
    </body>
  </html>
  `;
  