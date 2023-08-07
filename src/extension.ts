import * as fs from 'fs';
import * as vscode from 'vscode';

const EXT_ID = 'unity-code-snippets';
const PRIVATE_REGEX_KEY = 'PRIVATE';
const LINE_BREAK_REGEX_KEY = 'LINE_BREAK';
const TAB_REGEX_KEY = 'TAB';

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
	const src = context.asAbsolutePath(`styles/template.json`);
	if (!fs.existsSync(src)) { return null; }

	const replace: Record<string, string> = {};

	// private keyword
	replace[PRIVATE_REGEX_KEY] = usePrivateKeyword ? 'private ' : '';

	// indentation style
	if (style === 'allman') {
		replace[LINE_BREAK_REGEX_KEY] = '",\n\t\t\t"';
		replace[TAB_REGEX_KEY] = '\\t';
	} else {
		replace[LINE_BREAK_REGEX_KEY] = ' ';
		replace[TAB_REGEX_KEY] = '';
	}


	const content = fs.readFileSync(src, { encoding: 'utf-8' });
	return content.replace(/\%(\w+)\%/gm, (_match: string, p1: string) => replace[p1] ?? p1);
}

function saveSnippets(context: vscode.ExtensionContext, content: string) {
	const dest = context.asAbsolutePath(`snippets/snippets.json`);
	fs.writeFile(dest, content, { encoding: 'utf-8' }, () => { });
}

export function deactivate() { }
