const vscode = require('vscode');
const cp = require('child_process');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const diagnosticCollection = vscode.languages.createDiagnosticCollection('ruby');

  vscode.workspace.onDidSaveTextDocument(function (document) {
    if(document.languageId == "ruby") {
      diagnosticCollection.clear();

      cp.exec("dead_end --no-terminal " + document.fileName, (_err, stdout, stderr) => {
        let deadEndOutput;
        if (stderr == '') {
          deadEndOutput = stdout;
        } else {
          deadEndOutput = stderr;
        }

        const syntaxOkOutputRegex = /Syntax OK\s*/;
        console.log(deadEndOutput);

        if (syntaxOkOutputRegex.test(deadEndOutput)) return;

        const lineRegex = /❯\s+(\d+)(.*)/g;
        const allLines = [];
        let result;

        while ((result = lineRegex.exec(deadEndOutput)) !== null) {
          if (result.index === lineRegex.lastIndex) {
            lineRegex.lastIndex++;
          }

          allLines.push(
            {
              lineNumber: parseInt(result[1]),
              lineLength: result[2].length,
              startColumn: result[2].search(/\S|$/)
            }
          );
        }

        const range = new vscode.Range(
          allLines[0].lineNumber - 1,
          allLines[0].startColumn - 2,
          allLines[allLines.length - 1].lineNumber - 1,
          allLines[allLines.length - 1].lineLength
        );

        const diagnostic = new vscode.Diagnostic(range, deadEndOutput, vscode.DiagnosticSeverity.Error);
        diagnosticCollection.set(document.uri, [diagnostic]);
      });
    }
  });

  context.subscriptions.push(diagnosticCollection);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
}
