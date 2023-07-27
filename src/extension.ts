import * as fs from 'fs';
import * as vscode from 'vscode';

const EXT_ID = 'unity-code-snippets';
type IndentationStyle = 'kr' | 'allman';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.workspace.onDidChangeConfiguration(e => onConfigurationChanged(context, e));
	context.subscriptions.push(disposable);
}

function onConfigurationChanged(context: vscode.ExtensionContext, e: vscode.ConfigurationChangeEvent) {
	if (!e.affectsConfiguration(EXT_ID)) { return; }

	const style = vscode.workspace.getConfiguration(EXT_ID).get('style') as IndentationStyle;
	if (!applySnippetsForStyle(context, style)) {
		const error = `Invalid code style: ${style}`;
		console.error(error);
		vscode.window.showErrorMessage(error);
		return;
	}

	vscode.window.showInformationMessage('Restart VSCode to apply the snippets', 'Restart')
		.then(result => { if (result === 'Restart') { vscode.commands.executeCommand('workbench.action.reloadWindow'); } });
}

function applySnippetsForStyle(context: vscode.ExtensionContext, style: IndentationStyle = 'kr') {
	const src = context.asAbsolutePath(`styles/${style}.json`);
	const dest = context.asAbsolutePath(`snippets/snippets.json`);
	if (!fs.existsSync(src)) { return false; }
	fs.copyFile(src, dest, () => { });
	return true;
}

export function deactivate() { }
