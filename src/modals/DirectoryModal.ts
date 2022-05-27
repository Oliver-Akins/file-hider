import { Modal, Setting } from "obsidian";
import FileHider from "../main";
import { createStyleLine } from "../utils";

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
					let i = this.plugin.settings.hiddenFolders.indexOf(folder);
					this.plugin.settings.hiddenFolders.splice(i, 1);

					// Find and remove the CSS style from the system
					for (var j in this.plugin.style.cssRules) {
						let rule = this.plugin.style.cssRules[j];
						if (rule.cssText == createStyleLine(`folder`, folder)) {
							this.plugin.style.deleteRule(parseInt(j));
						};
					};

					c.hide();
				});
			});
		});
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}