const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "dead-end-vscode" is now active!');

	let disposable = vscode.commands.registerCommand('dead-end-vscode.helloWorld', function () {
		vscode.window.showInformationMessage('Hello World from dead_end!');
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
