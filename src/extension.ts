import * as fs from 'fs';
import * as vscode from 'vscode';
import { IndentationStyle, Options } from './options';

const EXT_ID = 'unity-code-snippets';
const PRIVATE_REGEX_KEY = 'PRIVATE';
const LINE_BREAK_REGEX_KEY = 'LINE_BREAK';
const TAB_REGEX_KEY = 'TAB';

const files = ['classes', 'methods', 'calls'];

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.workspace.onDidChangeConfiguration(e => onConfigurationChanged(context, e));
	context.subscriptions.push(disposable);
}

function onConfigurationChanged(context: vscode.ExtensionContext, e: vscode.ConfigurationChangeEvent) {
	if (!e.affectsConfiguration(EXT_ID)) { return; }
	const conf = vscode.workspace.getConfiguration(EXT_ID);

	const content = createSnippets(context, getOptions(conf));

	// if (!content) {
	// 	const error = `Invalid code style: ${style}`;
	// 	console.error(error);
	// 	vscode.window.showErrorMessage(error);
	// 	return;
	// }

	saveSnippets(context, content);

	vscode.window.showInformationMessage('Restart VSCode to apply the snippets', 'Restart')
		.then(result => { if (result === 'Restart') { vscode.commands.executeCommand('workbench.action.reloadWindow'); } });
}

function createSnippets(context: vscode.ExtensionContext, options: Options) {
	const replace = parseOptions(options);

	let result = {};
	files.forEach(file => {
		const content = replaceOnTemplate(context.asAbsolutePath(`styles/${file}.json`), replace);
		result = Object.assign(result, JSON.parse(content));
	});

	return JSON.stringify(result, null, '\t');
}

function getOptions(conf: vscode.WorkspaceConfiguration) {
	return {
		style: conf.get('style') as IndentationStyle,
		usePrivateKeyword: conf.get('usePrivateKeyword') as boolean
	};
}

function parseOptions(options: Options) {
	const result: Record<string, string> = {};

	// private keyword
	result[PRIVATE_REGEX_KEY] = options.usePrivateKeyword ? 'private ' : '';

	// indentation style
	if (options.style === 'allman') {
		result[LINE_BREAK_REGEX_KEY] = '",\n\t\t\t"';
		result[TAB_REGEX_KEY] = '\\t';
	} else {
		result[LINE_BREAK_REGEX_KEY] = ' ';
		result[TAB_REGEX_KEY] = '';
	}

	return result;
}

function replaceOnTemplate(filePath: string, replace: Record<string, string>) {
	const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
	return content.replace(/\%(\w+)\%/gm, (_match: string, p1: string) => replace[p1] ?? p1);
}

function saveSnippets(context: vscode.ExtensionContext, content: string) {
	const dest = context.asAbsolutePath(`snippets/snippets.json`);
	fs.writeFile(dest, content, { encoding: 'utf-8' }, () => { });
}

export function deactivate() { }
