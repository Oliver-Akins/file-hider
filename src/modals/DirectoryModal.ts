import { Modal, Setting } from "obsidian";
import FileHider from "../main";

export class DirectoryModal extends Modal {
	private plugin: FileHider;

	constructor(plugin: FileHider) {
		super(plugin.app);
		this.plugin = plugin;
	}

	onOpen() {
		const {contentEl: content} = this;
		content.createEl(`h1`, { text: `Folder List` });
		content.createEl(`hr`);
		let body = content.createEl(`div`, { cls: `folder-list-modal-body` });
		this.plugin.settings.hiddenFolders.forEach(folder => {
			let c = body.createEl(`div`);
			new Setting(c)
			.setName(folder)
			.addButton(btn => {
				btn.setIcon(`cross`)
				.setTooltip(`Remove Folder`)
				.onClick((e) => {
					console.log(folder);
				});
			});
		});
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}