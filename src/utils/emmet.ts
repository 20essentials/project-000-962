import * as monaco from "monaco-editor";

import {
  emmetHTML,
  emmetCSS,
  emmetJSX,
  expandAbbreviation
} from "emmet-monaco-es";

export function useEmmet(
  Monaco: typeof monaco,
  htmlEditor: monaco.editor.IStandaloneCodeEditor
) {

  //When you click on tab, you will have autocomplete in HTML
  htmlEditor.addCommand(Monaco.KeyCode.Tab, () => {
    const model = htmlEditor.getModel();
    const selection = htmlEditor.getSelection();
    if (!model || !selection) return;
    const position = selection.getStartPosition();
    const lineContent = model.getLineContent(position.lineNumber);
    const prefix = lineContent.slice(0, position.column - 1).trim();
    if (!prefix || /\s/.test(prefix)) return;
    const expanded = expandAbbreviation(prefix, { syntax: "html" });
    if (!expanded) return;
    const range = new Monaco.Range(
      position.lineNumber,
      lineContent.lastIndexOf(prefix) + 1,
      position.lineNumber,
      position.column
    );

    htmlEditor.executeEdits("", [
      { range, text: expanded, forceMoveMarkers: true }
    ]);
  });

  emmetHTML(Monaco, ["html"]);
  emmetCSS(Monaco, ["css", "scss"]);
  emmetJSX(Monaco, ["javascript", "typescript"]);
}
