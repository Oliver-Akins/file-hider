import { Modal, Setting } from "obsidian";
import FileHider from "../main";

export class HiddenPathsModal extends Modal {
	private plugin: FileHider;

	constructor(plugin: FileHider) {
		super(plugin.app);
		this.plugin = plugin;
	}

	onOpen() {
		const {contentEl: content} = this;
		content.createEl(`h1`, { text: `Hidden Files and Folders` });
		content.createEl(`hr`);
		let body = content.createEl(`div`, { cls: `hidden-list-modal-body` });
		this.plugin.settings.hiddenList.forEach(path => {
			let c = body.createEl(`div`);
			new Setting(c)
				.setName(path)
				.addButton(btn => {
					btn
						.setIcon(`cross`)
						.setTooltip(`Remove`)
						.onClick(() => {
							this.plugin.unhidePath(path);
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
