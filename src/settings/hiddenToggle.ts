import { Setting } from "obsidian";
import FileHider from "../main";

export class VisibilityToggleSetting {

	public static create(plugin: FileHider, container: HTMLElement) {
		return new Setting(container)
			.setName(`Hidden File Visibility`)
			.setDesc(`Toggle whether or not files and folders that are told to be hidden will be hidden or not.`)
			.addToggle(toggle => {
				toggle
					.setValue(!plugin.settings.hidden)
					.onChange(() => {
						plugin.toggleVisibility();
				});
			});
	};
}
