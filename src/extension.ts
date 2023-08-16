import * as fs from 'fs/promises';
import * as vscode from 'vscode';
import { DEST_PATH, EXT_ID, ISSUES_URL, Options, Replaces, TEMPLATES, TEMPLATES_BASEPATH } from './model';
import { parseOptions } from './options';

const TAG_REGEX = /\%(\w+)\%/gm;

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.workspace.onDidChangeConfiguration(e => onConfigurationChanged(context, e));
	context.subscriptions.push(disposable);
}

function onConfigurationChanged(context: vscode.ExtensionContext, e: vscode.ConfigurationChangeEvent) {
	if (!e.affectsConfiguration(EXT_ID)) { return; }
	const conf = vscode.workspace.getConfiguration(EXT_ID);

	createSnippets(context, parseOptions(conf))
		.then(content => saveSnippets(context, content))
		.then(() => {
			vscode.window.showInformationMessage('Restart VSCode to apply the snippets', 'Restart')
				.then(result => { if (result === 'Restart') { vscode.commands.executeCommand('workbench.action.reloadWindow'); } });
		})
		.catch(showError);
}

async function createSnippets(context: vscode.ExtensionContext, options: Options) {
	const contents: string[] = await Promise.all(
		TEMPLATES
			.map(file =>
				options.autoComplete[file]
					? replaceOnTemplate(context.asAbsolutePath(`${TEMPLATES_BASEPATH}/${file}.json`), options.replaces)
					: null)
			.filter(e => e) as Promise<string>[]
	);

	let result = {};
	contents.forEach(content => result = Object.assign(result, JSON.parse(content)));
	return JSON.stringify(result, null, '\t');
}

async function replaceOnTemplate(filePath: string, replaces: Replaces) {
	const content = await fs.readFile(filePath, { encoding: 'utf-8' });
	return content.replace(TAG_REGEX, (_match: string, p1: string) => replaces[p1 as keyof Replaces] ?? p1);
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
