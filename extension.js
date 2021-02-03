const vscode = require('vscode');
const cp = require('child_process');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const diagnosticCollection = vscode.languages.createDiagnosticCollection('ruby');
	console.log('Extension "dead-end-vscode" is now active!');

	vscode.workspace.onDidSaveTextDocument(function (document) {
		if(document.languageId == "ruby") {
			diagnosticCollection.clear();
			vscode.window.showInformationMessage('Saved file, running dead_end');

			cp.exec("dead_end --no-terminal " + document.fileName, (_err, _stdout, stderr) => {
				console.log(stderr);
				if (stderr == "Syntax OK") return;

				const lineRegex = /❯ (\d+)/g;
				const allLines = [];
				let m;

				while ((m = lineRegex.exec(stderr)) !== null) {
					if (m.index === lineRegex.lastIndex) {
        		lineRegex.lastIndex++;
    			}

					allLines.push(parseInt(m[1]));
				}

				// Probably should programatically get first and last column, the regex
				// could be improved to include the actual code after the line number,
				// so we can get the line lengths.
				//
				// We might need to change the data structure of the allLines var to be
				// a proper object instead, to store the first line number, its length,
				// and the last line number and its length.
				const range = new vscode.Range(
					allLines[0] - 1,
					0,
					allLines[allLines.length - 1],
					120
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
