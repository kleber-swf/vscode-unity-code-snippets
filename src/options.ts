import * as vscode from 'vscode';
import { IndentationStyle, Options, Replaces } from './model';

export function getReplaces(conf: vscode.WorkspaceConfiguration): Replaces {
	const options = getOptions(conf);
	return parseOptions(options);
}

function getOptions(conf: vscode.WorkspaceConfiguration) {
	return {
		style: conf.get('style') as IndentationStyle,
		usePrivateKeyword: conf.get('usePrivateKeyword') as boolean
	};
}

function parseOptions(options: Options): Replaces {
	const result: Replaces = {} as any;

	// private keyword
	result.PRIVATE = options.usePrivateKeyword ? 'private ' : '';

	// indentation style
	if (options.style === 'allman') {
		result.LINE_BREAK = '",\n\t\t\t"';
		result.TAB = '\\t';
	} else if (options.style === 'kr') {
		result.LINE_BREAK = ' ';
		result.TAB = '';
	} else {
		throw new Error(`Invalid style: ${options.style}`);
	}

	return result;
}