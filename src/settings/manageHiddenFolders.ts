import { DirectoryModal } from "../modals/DirectoryModal";
import { Setting } from "obsidian";
import FileHider from "../main";

export class ManageHiddenDirectories {

	public static create(plugin: FileHider, container: HTMLElement) {
		return new Setting(container)
		.setName(`Hidden Folders`)
		.setDesc(`Add or remove folders from the list that are being hidden`)
		.addButton(b => {
			b.setButtonText(`Manage Folder List`)
			.onClick(event => {
				// sanity check to prevent other code from opening the modal
				if (!event.isTrusted) { return }

				new DirectoryModal(plugin).open();
			});
		});
	};
};