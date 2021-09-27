import {debounce} from './node_modules/lodash-es/lodash.js'
function getSelectionAsHTML() {

	const selection = window.getSelection() || document.getSelection();
    console.log("selection",selection);
	if (selection.rangeCount === 0) {    // 没有返回内容时返回空字符串
		return '';
	}
	const selectionRange = selection.getRangeAt(0) || selection.createRange(); // 返回一个包含当前选区内容的Range对象。
    console.log('selectionRange',selectionRange);
    // 容器的标签名
	let containerTagName = '';
	const container = selectionRange.commonAncestorContainer; // 获得当前选中内容的共同祖先节点
    console.log('container',container);
	
    // 选中的内容是当前节点的全部内容
	if (selectionRange.toString().trim() === container.textContent.trim()) {
		// Handle plain text selections where parent is sometimes 'Node' or 'DocumentFragment'
		// Ideally, this should not happen, but text selection in browsers is unpredictable
        
        // 当选中的内容是纯文本，则containerTagName默认为p，否则为其父标签
		if (container instanceof Element) {
			containerTagName = container.tagName.toLowerCase();
		} else {
			containerTagName = container.parentNode.tagName.toLowerCase();
		}
	}else{

    }

    // Range.cloneContents() 返回一个 DocumentFragment，它是 Range 中所有的 Node 对象的副本。
	const fragment = selectionRange.cloneContents();
    console.log('fragment',fragment);
    // 创建一个包装元素
	const wrapper = document.createElement('div');
    // 将fragment加入包装元素中
	wrapper.append(fragment);
    console.log("wrapper",wrapper);

	// 将相对链接转换成绝对链接
	wrapper.querySelectorAll('a').forEach(link => link.setAttribute('href', link.href));

	// For tables, remove all immediate child nodes that are not required
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

	// For preformatted tags, content needs to be wrapped inside `<code>`
	// or it would not be considered as fenced code block
	if (containerTagName === 'pre') {
		// Classes of parent or container node can be used by GFM plugin to detect language
		const classes = (container.parentNode || container).classList.toString();

		return `
			<div class="${classes}">
				<pre><code>${wrapper.innerHTML}</code></pre>
			</div>
		`;
	}

	return `<${containerTagName}>${wrapper.innerHTML}</${containerTagName}>`
    // return '<' + containerTagName + '>' + wrapper.innerHTML + '</' + containerTagName + '>';
}

document.addEventListener("selectionchange",debounce(()=>{
    console.log(getSelectionAsHTML());
},500));