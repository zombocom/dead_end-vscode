const vscode = require('vscode');
const cp = require('child_process');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const diagnosticCollection = vscode.languages.createDiagnosticCollection('ruby');
  console.log('Extension "dead_end-vscode" is now active!');

  vscode.workspace.onDidSaveTextDocument(function (document) {
    if(document.languageId == "ruby") {
      diagnosticCollection.clear();
      vscode.window.showInformationMessage('Saved file, running dead_end');

      cp.exec("dead_end --no-terminal " + document.fileName, (_err, _stdout, stderr) => {
        console.log(stderr);
        if (stderr == "Syntax OK") return;

        const lineRegex = /❯\s+(\d+)(.*)/g;
        const allLines = [];
        let result;

        while ((result = lineRegex.exec(stderr)) !== null) {
          if (result.index === lineRegex.lastIndex) {
            lineRegex.lastIndex++;
          }

          allLines.push({ lineNumber: parseInt(result[1]), lineLength: result[2].length });
        }

        // TODO: Probably should programatically get first and last column
        // (not yet done for first column), and the regex could be improved to
        // include the actual code after the line number, so we can get the line
        // lengths. (done)
        //
        // We might need to change the data structure of the allLines var to be
        // a proper object instead, to store the first line number, its length,
        // and the last line number and its length. (done)
        const range = new vscode.Range(
          allLines[0].lineNumber - 1,
          0,
          allLines[allLines.length - 1].lineNumber - 1,
          allLines[allLines.length - 1].lineLength
        );

        const diagnostic = new vscode.Diagnostic(range, stderr, vscode.DiagnosticSeverity.Error);
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
