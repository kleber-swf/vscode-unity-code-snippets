import * as vscode from 'vscode';
import { AutoCompletes, ClassAccessibilityLevel, IndentationStyle, Options, Replaces, TEMPLATES } from './model';

export function parseOptions(conf: vscode.WorkspaceConfiguration): Options {
	return {
		autoComplete: parseAutoCompletes(conf),
		replaces: parseReplaces(conf)
	};
}

function parseAutoCompletes(conf: vscode.WorkspaceConfiguration): AutoCompletes {
	const c = conf.get('autoComplete') as AutoCompletes;
	const autoCompletes = {} as unknown as AutoCompletes;
	TEMPLATES.forEach(template => autoCompletes[template] = c[template] || false);
	return autoCompletes;
}

function parseReplaces(conf: vscode.WorkspaceConfiguration): Replaces {
	const style = conf.get('style') as IndentationStyle;
	const usePrivateKeyword = conf.get('usePrivateKeyword') as boolean;
	const classAccessibilityLevelKeyword = conf.get('classAccessibilityLevel') as ClassAccessibilityLevel;
	const useSealedClassesKeyword = conf.get('useSealedClasses') as boolean;

	const replaces: Replaces = {} as any;

	// private keyword
	replaces.PRIVATE = usePrivateKeyword ? 'private ' : '';

	replaces.CLASS_DECLERATION =
		// class accessibility level
		(classAccessibilityLevelKeyword === 'none' ? '' : `${classAccessibilityLevelKeyword} `) +
		// sealed keyword
		(useSealedClassesKeyword ? 'sealed ' : '') +
		'class';

	// indentation style
	if (style === 'allman') {
		replaces.LINE_BREAK = '",\n\t\t\t"';
		replaces.TAB = '\\t';
	} else if (style === 'kr') {
		replaces.LINE_BREAK = ' ';
		replaces.TAB = '';
	} else {
		throw new Error(`Invalid style: ${style}`);
	}

	return replaces;
}