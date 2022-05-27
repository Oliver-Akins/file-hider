import { Modal, Setting } from "obsidian";
import FileHider from "../main";
import { createStyleLine } from "../utils";

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
					let i = this.plugin.settings.hiddenFiles.indexOf(file);
					this.plugin.settings.hiddenFiles.splice(i, 1);

					// Find and remove the CSS style from the system
					for (var j in this.plugin.style.cssRules) {
						try { parseInt(j) } catch (e) { console.log(`skipping`, j); continue; };

						let rule = this.plugin.style.cssRules[j];
						if (rule.cssText == createStyleLine(`file`, file)) {
							this.plugin.style.deleteRule(parseInt(j));
							break;
						};
					};

					c.hide();
				});
			});
		});
	};

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	};
};