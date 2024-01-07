export function changePathVisibility(path: string, hide: boolean) {
	let escapedPath = CSS.escape(path);
	let n = document.querySelector(`[data-path="${escapedPath}"]`);
	if (!n) {
		return;
	};
	let p = n.parentElement
	if (hide) {
		p.style.display = `none`
	} else {
		p.style.display = ``;
	};
};