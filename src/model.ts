export const EXT_ID = 'unity-code-snippets';
export const TEMPLATES_BASEPATH = 'templates/';
export const DEST_PATH = 'snippets/snippets.json';
export const ISSUES_URL = 'https://github.com/kleber-swf/vscode-unity-code-snippets/issues';

export type IndentationStyle = 'kr' | 'allman';

export type ReplaceType = 'PRIVATE' | 'LINE_BREAK' | 'TAB';
export type Replaces = Record<ReplaceType, string>;

export const TEMPLATES = ['classes', 'methods', 'calls', 'attributes', 'experimentalAttributes'] as const;
export type TemplateTypes = typeof TEMPLATES[number];
export type AutoCompletes = Record<TemplateTypes, boolean>;

export interface Options {
	autoComplete: AutoCompletes;
	replaces: Replaces;
}
