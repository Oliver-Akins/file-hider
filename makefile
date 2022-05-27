dev:
	node esbuild.config.mjs

release:
	tsc --noEmit --skipLibCheck
	node esbuild.config.mjs production
	python3 version-bump.py

clean:
	rm -rf main.js