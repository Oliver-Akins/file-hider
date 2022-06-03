import FileHider from "../main";

// The command used to toggle the visibility.
export class VisibilityToggleCommand {
	constructor(plugin: FileHider) {
		plugin.addCommand({
			id: 'oa-fh-toggle-visibility',
			name: 'Toggle Visibility',
			callback: () => {
				plugin.toggleVisibility();
			}
		});
	};
}