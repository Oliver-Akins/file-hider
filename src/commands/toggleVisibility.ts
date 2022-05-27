import FileHider from "../main";
import { findStyleSheet } from "../utils";

// The command used to toggle the visibility.
export class VisibilityToggleCommand {
	constructor(plugin: FileHider) {
		plugin.addCommand({
			id: 'oa-fh-toggle-visibility',
			name: 'Toggle Visibility',
			callback: () => {
				if (!plugin.style) {
					plugin.style = findStyleSheet();
				};
				plugin.toggleVisibility();
			}
		});
	};
}