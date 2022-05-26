.PHONY: dev release clean

OUT_DIR=dist
ENTRYPOINT=main.js

RELEASE_SCRIPT=utils/release.py


dev:
	node esbuild.config.mjs

release:
	tsc --noEmit --skipLibCheck
	node esbuild.config.mjs production

version:
	node version-bump.mjs
	git add manifest.json versions.json

clean:
#	rm -f *.js
	rm -rf $(OUT_DIR)