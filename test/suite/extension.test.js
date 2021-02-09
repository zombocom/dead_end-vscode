const chai = require('chai');
const sinon = require('sinon');
const vscode = require('vscode');
const { activate } = require('../../extension');

chai.use(require('sinon-chai'));
const expect = chai.expect;

suite('Extension Test Suite', () => {
	const document = {
		languageId: 'ruby'
	};
	const context  = {
		subscriptions: [],
	};
	const sandbox = sinon.createSandbox();

	test('Extension activation', () => {
		const consoleLog = sandbox.stub(console, 'log');

		activate(context);

		expect(consoleLog).calledOnceWith('Extension "dead_end-vscode" is now active!');
	});

	test('Diagnostics creation', () => {
		const diagnosticCollection = sandbox.stub(vscode.languages, 'createDiagnosticCollection');

		activate(context);

		expect(diagnosticCollection).calledOnceWith('ruby');
	});
});
