dev:
	node esbuild.config.mjs

release:
	tsc --noEmit --skipLibCheck
	node esbuild.config.mjs production

version:
	node version-bump.mjs
	git add manifest.json versions.json

clean:
	rm -rf main.js