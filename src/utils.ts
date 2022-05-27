import { Notice } from "obsidian";

/**
 * Creates a CSS rule that is used to hide the file or folder from the file
 * explorer when it is enabled.
 *
 * @param type The type of file it is
 * @param path The full filepath of the file/folder from the root of the vault
 * @returns The CSS string that is used to target the file or folder
 */
export function createStyleLine(type: string, path: string) {
	return `.nav-${type} > [data-path="${path}"] { display: none; }`;
};


/**
 * Locates the File Hider stylesheet within Obsidian to allow us to modify it
 * dynamically, for enabling and disabling it in order to show/hide the files
 * and directories in the file explorer
 *
 * @returns The stylesheet if it was found
 */
export function findStyleSheet() {
	for (var i in document.styleSheets) {
		let style = document.styleSheets[i];
		//@ts-ignore
		let content = style?.ownerNode?.innerText;
		if (content && content.startsWith(`/* FILE HIDER */`)) {
			return style;
		};
	};
};