
/**
 * @description 返回selection，兼容不同浏览器
 * @returns {selection}
 */
export function getUserSelection(){
    let selection
    if (window.getSelection) { //现代浏览器
        selection = window.getSelection()
    } else if (document.selection) { //IE浏览器 考虑到Opera，应该放在后面
        selection = document.selection.createRange()
    }
    return selection
}
/**
 * @description 返回选中内容的文本值
 * @returns {String}
 */
function getSelectionAsText(){
    let selection = getUserSelection()
    if(selection.text) return selection.text
    else return selection.toString()
}

/**
 * @description 返回选中内容Range对象
 * @returns {Range}
 */
function getSelectionRange(){
    let selection = getUserSelection()
    if (selection.getRangeAt) return selection.getRangeAt(0);
    else { // 兼容较老版本Safari!
        let range = document.createRange();
        range.setStart(selection.anchorNode,selection.anchorOffset);
        range.setEnd(selection.focusNode,selection.focusOffset);
        return range;
    }
}