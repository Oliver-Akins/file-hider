import { Modal, Setting } from "obsidian";
import FileHider from "../main";

export class FileModal extends Modal {
	private plugin: FileHider;

	constructor(plugin: FileHider) {
		super(plugin.app);
		this.plugin = plugin;
	};

	onOpen() {
		const {contentEl: content} = this;
		content.createEl(`h1`, { text: `File List` });
		content.createEl(`hr`);
		let body = content.createEl(`div`, { cls: `file-list-modal-body` });
		this.plugin.settings.hiddenFiles.forEach(file => {
			let c = body.createEl(`div`);
			new Setting(c)
			.setName(file)
			.addButton(btn => {
				btn.setIcon(`cross`)
				.setTooltip(`Remove File`)
				.onClick((e) => {
					console.log(file);
				});
			});
		});
	};

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	};
};