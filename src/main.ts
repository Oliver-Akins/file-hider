import { ManageHiddenDirectories } from './settings/manageHiddenFolders';
import { VisibilityToggleCommand } from './commands/toggleVisibility';
import { VisibilityToggleSetting } from './settings/hiddenToggle';
import { App, Plugin, PluginSettingTab, TFolder } from 'obsidian';
import { ManageHiddenFiles } from './settings/manageHiddenFiles';
import { createStyleLine, findStyleSheet } from './utils';

interface FileHiderSettings {
	ribbonIcon: boolean;
	hidden: boolean;
	hiddenFiles: string[];
	hiddenFolders: string[];
};


export default class FileHider extends Plugin {
	settings: FileHiderSettings = {
		ribbonIcon: true,
		hidden: true,
		hiddenFiles: [],
		hiddenFolders: [],
	};

	style: CSSStyleSheet|null = null;

	hasRibbon: boolean = false;

	async onload() {
		await this.loadSettings();

		this.registerEvent(
			this.app.workspace.on(`file-menu`, (menu, file) => {
				if (!this.style) {
					this.style = findStyleSheet();
				};
				if (file instanceof TFolder) {
					menu.addItem((i) => {
						if (this.settings.hiddenFolders.includes(file.path)) {
							i.setTitle(`Unhide Folder`)
							.setIcon(`eye`)
							.onClick(() => {
								this.unhideFolder(file.path);
							});
						} else {
							i.setTitle(`Hide Folder`)
							.setIcon(`eye-off`)
							.onClick(() => {
								let rule = createStyleLine(`folder`, file.path);
								this.style.insertRule(rule);
								this.settings.hiddenFolders.push(file.path);
								this.saveSettings();
							});
						};
					});
				} else {
					menu.addItem((i) => {
						if (this.settings.hiddenFiles.includes(file.path)) {
							i.setTitle(`Unhide File`)
							.setIcon(`eye`)
							.onClick((e) => {
								this.unhideFile(file.path);
							});
						} else {
							i.setTitle(`Hide File`)
							.setIcon(`eye-off`)
							.onClick((e) => {
								let rule = createStyleLine(`file`, file.path);
								this.style.insertRule(rule);
								this.settings.hiddenFiles.push(file.path);
								this.saveSettings();
							});
						};
					});
				};
			})
		);

		new VisibilityToggleCommand(this);
		this.initialLoadStyle();
		this.addSettingTab(new FileHiderSettingsTab(this.app, this));
	}

	onunload() {
		this.saveSettings();
	};

	/*
	This is the method that handles re-hiding files when Obsidian starts, or
	when the plugin is reloaded after being unloaded/disabled.
	*/
	async initialLoadStyle() {
		console.log(`attempting to get the stylesheet`)
		this.style = findStyleSheet();
		if (this.style) {
			for (var file of this.settings.hiddenFiles) {
				let r = createStyleLine(`file`, file);
				this.style.insertRule(r);
			};
			for (var folder of this.settings.hiddenFolders) {
				let r = createStyleLine(`folder`, folder);
				this.style.insertRule(r);
			};
			return
		};
		setTimeout(() => this.initialLoadStyle(), 1_000);
	};

	/*
	Loads the config settings, with defaults created where needed.
	*/
	async loadSettings() {
		this.settings = Object.assign({}, this.settings, await this.loadData());
	};

	/* Saves the setting data */
	async saveSettings() {
		await this.saveData(this.settings);
	};

	/*
	Enables/Disables the file visibility based. (gets the stylesheet if needed)
	*/
	toggleVisibility() {
		if (!this.style) {
			this.style = findStyleSheet();
		};
		if (this.settings.hidden) {
			this.style.disabled = true;
		} else {
			this.style.disabled = false;
		};
		this.settings.hidden = !this.settings.hidden;
		this.saveSettings();
	};

	unhideFolder(folder: string) {
		let i = this.settings.hiddenFolders.indexOf(folder);
		this.settings.hiddenFolders.splice(i, 1);

		// Find and remove the CSS style from the system
		for (var j in this.style.cssRules) {
			let rule = this.style.cssRules[j];
			if (rule.cssText == createStyleLine(`folder`, folder)) {
				this.style.deleteRule(parseInt(j));
			};
		};
		this.saveSettings();
	};

	unhideFile(file: string) {
		let i = this.settings.hiddenFiles.indexOf(file);
		this.settings.hiddenFiles.splice(i, 1);

		// Find and remove the CSS style from the system
		for (var j in this.style.cssRules) {
			try { parseInt(j) } catch (e) { console.log(`skipping`, j); continue; };

			let rule = this.style.cssRules[j];
			if (rule.cssText == createStyleLine(`file`, file)) {
				this.style.deleteRule(parseInt(j));
				break;
			};
		};
		this.saveSettings();
	}
};


/**
 * All of the settings for the FileHider
 */
class FileHiderSettingsTab extends PluginSettingTab {
	plugin: FileHider;

	constructor(app: App, plugin: FileHider) {
		super(app, plugin);
		this.plugin = plugin;
	};

	display(): void {
		const { containerEl: container } = this;

		container.empty();
		VisibilityToggleSetting.create(this.plugin, container);
		ManageHiddenFiles.create(this.plugin, container);
		ManageHiddenDirectories.create(this.plugin, container);
	};
}
