import { Setting } from "obsidian";
import FileHider from "../main";
import { HiddenPathsModal } from "../modals/HiddenList";


export class ManageHiddenPaths {

	public static create(plugin: FileHider, container: HTMLElement) {
		return new Setting(container)
		.setName(`Hidden Files and Folders`)
		.setDesc(`Add or remove files and folders from the list that are being hidden`)
		.addButton(b => {
			b.setButtonText(`Manage`)
			.onClick(event => {
				// sanity check to prevent other code from opening the modal
				if (!event.isTrusted) { return }

				new HiddenPathsModal(plugin).open()
			});
		});
	};
};