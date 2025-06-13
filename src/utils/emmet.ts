import * as monaco from 'monaco-editor';
import {
  emmetHTML,
  emmetCSS,
  emmetJSX,
  expandAbbreviation
} from 'emmet-monaco-es';

export function useEmmet(
  Monaco: typeof monaco,
  htmlEditor: monaco.editor.IStandaloneCodeEditor
) {
  //Html autoclosing Tag and autocomplete 😎
  htmlEditor.addCommand(Monaco.KeyCode.Tab, () => {
    const model = htmlEditor.getModel();
    const selection = htmlEditor.getSelection();
    if (!model || !selection) return;

    const position = selection.getStartPosition();
    const lineContent = model.getLineContent(position.lineNumber);
    const prefix = lineContent.slice(0, position.column - 1).trim();

    // Si no hay nada antes del cursor → insertar 2 espacios
    if (!prefix) {
      htmlEditor.executeEdits('', [
        {
          range: new Monaco.Range(
            position.lineNumber,
            position.column,
            position.lineNumber,
            position.column
          ),
          text: '  ',
          forceMoveMarkers: true
        }
      ]);
      htmlEditor.setPosition({
        lineNumber: position.lineNumber,
        column: position.column + 2
      });
      return;
    }

    if (/\s/.test(prefix)) return;

    const expanded = expandAbbreviation(prefix, { syntax: 'html' });
    if (!expanded) return;

    const startCol = lineContent.lastIndexOf(prefix) + 1;
    const range = new Monaco.Range(
      position.lineNumber,
      startCol,
      position.lineNumber,
      position.column
    );

    htmlEditor.executeEdits('', [
      { range, text: expanded, forceMoveMarkers: true }
    ]);

    const tagOpenEnd = expanded.indexOf('>') + 1;
    const cursorColumn = startCol + tagOpenEnd;

    htmlEditor.setPosition({
      lineNumber: position.lineNumber,
      column: cursorColumn
    });
  });

  emmetHTML(Monaco, ['html']);
  emmetCSS(Monaco, ['css', 'scss']);
  emmetJSX(Monaco, ['javascript', 'typescript']);
}
