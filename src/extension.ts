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
	const conf = vscode.workspace.getConfiguration(EXT_ID);

	const style = conf.get('style') as IndentationStyle;
	const usePrivateKeyword = conf.get('usePrivateKeyword') as boolean;

	const content = createSnippets(context, style, usePrivateKeyword);
	if (!content) {
		const error = `Invalid code style: ${style}`;
		console.error(error);
		vscode.window.showErrorMessage(error);
		return;
	}

	saveSnippets(context, content);

	vscode.window.showInformationMessage('Restart VSCode to apply the snippets', 'Restart')
		.then(result => { if (result === 'Restart') { vscode.commands.executeCommand('workbench.action.reloadWindow'); } });
}

function createSnippets(context: vscode.ExtensionContext, style: IndentationStyle = 'kr', usePrivateKeyword = true) {
	const src = context.asAbsolutePath(`styles/${style}.json`);
	if (!fs.existsSync(src)) { return null; }

	const privateReplace = usePrivateKeyword ? 'private ' : '';

	const content = fs.readFileSync(src, { encoding: 'utf-8' });
	return content.replace(/\%(\w+)\%/gm, (_match: string, p1: string) => {
		if (p1 === 'PRIVATE') { return privateReplace; }
		return p1;
	});
}

function saveSnippets(context: vscode.ExtensionContext, content: string) {
	const dest = context.asAbsolutePath(`snippets/snippets.json`);
	fs.writeFile(dest, content, { encoding: 'utf-8' }, () => { });
}

export function deactivate() { }
