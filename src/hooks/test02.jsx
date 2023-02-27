function toggleBold() {
    const selection = window.getSelection();
    if (selection.rangeCount <= 0) {
        return;
    }

    const range = selection.getRangeAt(0);
    const className = "bold";

    const commonAncestor = range.commonAncestorContainer;

    // Check if there are any bold elements within the selection
    const isBoldSelected =
        commonAncestor.parentElement.classList.contains(className);

    if (isBoldSelected) {
        // If the selection contains any bold elements, set their style to normal
        const boldElements = document.querySelectorAll("." + className);
        boldElements.forEach((element) => {
            if (range.intersectsNode(element)) {
                const elementRange = document.createRange();
                elementRange.selectNodeContents(element);
                const content = elementRange.extractContents();
                element.parentElement.insertBefore(content, element);
                element.parentElement.removeChild(element);
            }
        });
    } else {
        // Otherwise, add the bold style to the selected text
        const content = range.extractContents();
        const span = document.createElement("span");
        span.classList.add(className);
        span.appendChild(content);
        range.insertNode(span);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function changeStyle(className) {
    // 獲取當前頁面中的選擇範圍對象
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const commonAncestor = range.commonAncestorContainer;

    // 否存在選擇範圍
    if (selection.rangeCount <= 0) {
        return;
    }
    console.log(selection);
    if (commonAncestor.parentElement.className == className) {
        const startOffset = range.startOffset;
        const endOffset = range.endOffset;

        // 取的選取的文字並且提取出來
        const content = range.extractContents();

        // 建立新的 span 元素
        const span = document.createElement("span");
        span.appendChild(content);

        // 新 span 不帶有 class 屬性
        span.setAttribute("class", "unbold");

        // 將新建的節點插入到原節點中
        range.insertNode(span);

        // 新選取範圍設定為新 span 元素中的內容
        const newRange = document.createRange();
        newRange.setStart(span.firstChild, startOffset);
        newRange.setEnd(span.lastChild, endOffset - startOffset);
        selection.addRange(newRange);
        selection.removeAllRanges();

        return;
    }

    const span = document.createElement("span");
    span.textContent = range.toString();

    span.classList.add(className);
    replaceSelection(span.outerHTML, true);
}
