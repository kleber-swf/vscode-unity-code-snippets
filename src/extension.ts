import * as fs from 'fs/promises';
import * as vscode from 'vscode';
import { DEST_PATH, EXT_ID, ISSUES_URL, IndentationStyle, Options, TEMPLATES_BASEPATH } from './model';

const TAG_REGEX = /\%(\w+)\%/gm;
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

	createSnippets(context, getOptions(conf))
		.then(content => saveSnippets(context, content))
		.then(() => {
			vscode.window.showInformationMessage('Restart VSCode to apply the snippets', 'Restart')
				.then(result => { if (result === 'Restart') { vscode.commands.executeCommand('workbench.action.reloadWindow'); } });
		})
		.catch(showError);
}

async function createSnippets(context: vscode.ExtensionContext, options: Options) {
	const replace = parseOptions(options);

	const contents: string[] = await Promise.all(files.map(file =>
		replaceOnTemplate(context.asAbsolutePath(`${TEMPLATES_BASEPATH}/${file}.json`), replace)
	));

	let result = {};
	contents.forEach(content => result = Object.assign(result, JSON.parse(content)));
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
	} else if (options.style === 'kr') {
		result[LINE_BREAK_REGEX_KEY] = ' ';
		result[TAB_REGEX_KEY] = '';
	} else {
		throw new Error(`Invalid style: ${options.style}`);
	}

	return result;
}

async function replaceOnTemplate(filePath: string, replace: Record<string, string>) {
	const content = await fs.readFile(filePath, { encoding: 'utf-8' });
	return content.replace(TAG_REGEX, (_match: string, p1: string) => replace[p1] ?? p1);
}

async function saveSnippets(context: vscode.ExtensionContext, content: string) {
	const dest = context.asAbsolutePath(DEST_PATH);
	return fs.writeFile(dest, content, { encoding: 'utf-8' });
}

function showError(e: any) {
	console.error(e);
	vscode.window.showErrorMessage(`Oh, no! An error has happened!\nPlease try to reinstall the extension and if this does not solve the issue, please report it on github: ${e.toString()}`, 'Open Extension', 'Report')
		.then(res => {
			if (res === 'Open Extension') { vscode.commands.executeCommand('extension.open', `kleber-swf.${EXT_ID}`); }
			else if (res === 'Report') { vscode.env.openExternal(vscode.Uri.parse(ISSUES_URL)); }
		});
}

export function deactivate() { }
