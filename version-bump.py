import json

plugin_version = None
obsidian_version = None


# Load the versions from the manifest
with open("manifest.json", "r") as file:
	data = json.load(file)
	obsidian_version = data["minAppVersion"]
	plugin_version = data["version"]


# Update the package.json
with open("package.json", "r") as file:
	package = json.load(file)
	if plugin_version:
		package["version"] = plugin_version

with open("versions.json", "r") as file:
	versions = json.load(file)
	if plugin_version and obsidian_version:
		versions[plugin_version] = obsidian_version


with open("package.json", "w") as file:
	json.dump(package, file, indent=2)

with open("versions.json", "w") as file:
	json.dump(versions, file, indent=2)