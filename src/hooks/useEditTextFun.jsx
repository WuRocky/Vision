function changeStyle(className1, className2) {
    // 獲取當前頁面中的選擇範圍對象
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const commonAncestor = range.commonAncestorContainer;

    // 否存在選擇範圍
    if (selection.rangeCount <= 0) {
        return;
    }
    const isBoldSelected =
        commonAncestor.parentElement.classList.contains(className1);
    if (isBoldSelected) {
        const span = document.createElement("span");
        span.textContent = range.toString();

        span.classList.add(className2);
        replaceSelection(span.outerHTML, true);
    } else {
        const span = document.createElement("span");
        span.textContent = range.toString();

        span.classList.add(className1);
        replaceSelection(span.outerHTML, true);
    }
}

function changeFontSize(className1, className2) {
    // 獲取當前頁面中的選擇範圍對象
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const commonAncestor = range.commonAncestorContainer;

    // 否存在選擇範圍
    if (selection.rangeCount <= 0) {
        return;
    }
    const isBoldSelected =
        commonAncestor.parentElement.classList.contains(className1);
    if (isBoldSelected) {
        const div = document.createElement("div");
        const span = document.createElement("span");
        span.textContent = range.toString();

        span.classList.add(className2);
        div.appendChild(span);
        replaceSelection(div.outerHTML, true);
    } else {
        const div = document.createElement("div");
        const span = document.createElement("span");
        span.textContent = range.toString();

        span.classList.add(className1);
        div.appendChild(span);
        replaceSelection(div.outerHTML, true);
    }
}

// function changeFontSize(className) {
//     const selection = window.getSelection();
//     if (selection.rangeCount <= 0) {
//         return;
//     }

//     const range = selection.getRangeAt(0);
//     const div = document.createElement("div");

//     const span = document.createElement("span");
//     div.appendChild(span);
//     span.classList.add(className);
//     span.textContent = range.toString();

//     range.deleteContents();
//     range.insertNode(div);

//     // 以下為 Firefox 獨有的程式碼
//     const newRange = new Range();
//     newRange.setStartAfter(div);
//     newRange.setEndAfter(div);
//     selection.removeAllRanges();
//     selection.addRange(newRange);
// }
// function changeFontSize(style1, style2) {
//     const selection = window.getSelection();
//     if (selection.rangeCount <= 0) {
//         return;
//     }

//     const range = selection.getRangeAt(0);
//     const span = document.createElement("span");
//     span.textContent = range.toString();

//     // span.classList.add(className1);
//     span.style.lineHeight = "1.3";
//     span.style.fontWeight = style2;
//     span.style.fontSize = style1;

//     replaceSelection(span.outerHTML, true);
// }

function replaceSelection(html, selectInserted) {
    // 選擇範圍
    const selection = window.getSelection();
    // 是否有選取範圍
    if (selection.rangeCount <= 0) {
        return;
    }

    // 獲取第一個 Range 對象
    const range = selection.getRangeAt(0);
    // 刪除其內容
    range.deleteContents();

    const template = document.createElement("template");

    // 參數解析為片段，去除前後空格
    template.innerHTML = html.trim();
    // 創建一個新的文檔片段
    const fragment = document.importNode(template.content, true);
    const firstNode = fragment.firstChild;
    const lastNode = fragment.lastChild;

    // 新創建的文檔片段插入到範圍中
    range.insertNode(fragment);

    if (selectInserted) {
        // 新插入的內容
        const newRange = document.createRange();
        newRange.setStartBefore(firstNode);
        newRange.setEndAfter(lastNode);
        selection.addRange(newRange);
        selection.removeAllRanges();
    }
}

export { changeStyle, changeFontSize };
