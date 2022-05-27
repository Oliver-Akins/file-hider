import { Setting } from "obsidian";
import FileHider from "../main";
import { FileModal } from "../modals/FileModal";

export class ManageHiddenFiles {

	public static create(plugin: FileHider, container: HTMLElement) {
		return new Setting(container)
		.setName(`Hidden Files`)
		.setDesc(`Add or remove files from the list that are being hidden`)
		.addButton(b => {
			b.setButtonText(`Manage File List`)
			.onClick(event => {
				// sanity check to prevent other code from opening the modal
				if (!event.isTrusted) { return }

				new FileModal(plugin).open();
			});
		});
	};
};