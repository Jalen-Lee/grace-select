function getSelectionAsHTML() {
	const selection = window.getSelection() || document.getSelection();
    console.log("selection",selection);
	if (selection.rangeCount === 0) {    
		return '';
	}
	const selectionRange = selection.getRangeAt(0) || selection.createRange(); 
	let containerTagName = '';
	const container = selectionRange.commonAncestorContainer; 
	if (selectionRange.toString().trim() === container.textContent.trim()) {
		if (container instanceof Element) {
			containerTagName = container.tagName.toLowerCase();
		} else {
			containerTagName = container.parentNode.tagName.toLowerCase();
		}
	}
	const fragment = selectionRange.cloneContents();
	const wrapper = document.createElement('div');
	wrapper.append(fragment);
	wrapper.querySelectorAll('a').forEach(link => link.setAttribute('href', link.href));
	const tables = wrapper.querySelectorAll('table');
	for (const table of tables) {
		const floaters = Array.from(table.children).filter(node => !['THEAD', 'TBODY', 'TR', 'TFOOT'].includes(node.tagName));
		for (const floater of floaters) {
			floater.remove();
		}
	}
	if (containerTagName === '') {
		return wrapper.innerHTML;
	}
	if (containerTagName === 'pre') {
		const classes = (container.parentNode || container).classList.toString();

		return `
			<div class="${classes}">
				<pre><code>${wrapper.innerHTML}</code></pre>
			</div>
		`;
	}
	return `<${containerTagName}>${wrapper.innerHTML}</${containerTagName}>`
}

export default getSelectionAsHTML