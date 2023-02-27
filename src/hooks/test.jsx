// function changeStyle(elementType, className, style) {
//     if (!window.getSelection().getRangeAt(0).collapsed) {
//         surroundSelection(elementType, className, style);
//     }
// }

// function surroundSelection(elementType, className, style) {
//     function mergeSameElements(firstElement, secondElement) {
//         if (
//             !firstElement ||
//             !secondElement ||
//             firstElement.nodeName !== secondElement.nodeName
//         ) {
//             return false;
//         }

//         // 記錄已經合併的元素對
//         let mergedElements = [];

//         while (firstElement && secondElement) {
//             if (firstElement.nodeName !== secondElement.nodeName) {
//                 break;
//             }

//             // 保存合併的元素對
//             mergedElements.push([firstElement, secondElement]);

//             // 移動指針
//             firstElement =
//                 firstElement.childNodes[firstElement.childNodes.length - 1];
//             secondElement = secondElement.childNodes[0];
//         }

//         // 將已經合併的元素對逐一處理
//         for (const [first, second] of mergedElements) {
//             // 將第二個元素的子節點移動到第一個元素中
//             while (second.hasChildNodes()) {
//                 first.appendChild(second.firstChild);
//             }

//             // 刪除第二個元素
//             second.remove();
//         }
//     }

//     // 如果給定的 elementType 不存在，則中止。
//     if (!document.createElement(elementType).tagName) {
//         return false;
//     }

//     // 獲取當前游標
//     const selection = window.getSelection();

//     // 如果當前沒有選擇內容則中止
//     if (selection.rangeCount === 0) {
//         return;
//     }

//     // 獲取當前選擇的範圍
//     const range = selection.getRangeAt(0);

//     // 獲取範圍內的 HTML 元素
//     const rangeContents = range.extractContents();

//     // 創建一個文檔片段來保存範圍的內容
//     const block = document.createDocumentFragment();

//     // 將範圍內的內容添加到文檔片段中
//     for (const node of rangeContents.childNodes) {
//         if (node.nodeType === Node.TEXT_NODE) {
//             // 如果節點是文本節點，則直接添加到文檔片段中
//             block.appendChild(node);
//         } else {
//             // 如果節點是元素節點，則添加其子節點到文檔片段中
//             for (const child of node.childNodes) {
//                 if (child.nodeType === Node.TEXT_NODE) {
//                     block.appendChild(child);
//                 }
//             }
//         }
//     }

//     // 創建包裝元素並設置其類和樣式
//     const wrap = document.createElement(elementType);
//     wrap.className = className;
//     if (style) {
//         wrap.setAttribute("style", style);
//     }

//     // 如果有要換行的內容，將其添加到換行元素中並插入到範圍中
//     if (block.childNodes.length > 0) {
//         wrap.appendChild(block);
//         range.insertNode(wrap);

//         // 在包裝內容的兩側將拆分元素合併在一起
//         mergeSameElements(wrap.previousSibling, wrap.firstChild);
//         mergeSameElements(wrap.lastChild, wrap.nextSibling);
//     }
// }
//////////////////////////////////////////////////////
// function surroundSelection(elementType, className, style) {
//     // 如果给定的 elementType 不存在，則中止
//     if (!document.createElement(elementType).tagName) {
//         return false;
//     }

//     // 獲取當前游標所在位置
//     const selection = window.getSelection();

//     // 如果當前沒有選中任何文本，則提示用戶選擇文本
//     if (selection.isCollapsed) {
//         alert("请先选择文本。");
//         return;
//     }

//     // 獲取當前選中的範圍
//     const range = selection.getRangeAt(0);

//     // 獲取範圍內的 HTML 元素
//     const rangeContents = range.extractContents();

//     // 創建一個文檔片段來保存範圍的內容
//     const block = document.createDocumentFragment();

//     for (const node of rangeContents.childNodes) {
//         if (node.nodeType === Node.TEXT_NODE) {
//             block.appendChild(node);
//         } else {
//             for (const child of node.childNodes) {
//                 if (child.nodeType === Node.TEXT_NODE) {
//                     block.appendChild(child);
//                 }
//             }
//         }
//     }

//     // 創建包裝元素並設置其類和样式
//     const wrap = document.createElement(elementType);
//     wrap.className = className;
//     wrap.style.cssText = style;

//     // 如果有要換行的內容，將其添加到換行元素中並插入到範圍中
//     if (block.childNodes.length > 0) {
//         wrap.appendChild(block);
//         range.insertNode(wrap);

//         // 在包裝內容的兩側將拆分元素合併在一起
//         splitElements(wrap.previousSibling, wrap.firstChild);
//         splitElements(wrap.lastChild, wrap.nextSibling);
//     }

//     // 將包裝元素設置為選中狀態
//     const newRange = new Range();
//     newRange.selectNodeContents(wrap);
//     selection.removeAllRanges();
//     selection.addRange(newRange);
// }

// function splitElements(firstElement, secondElement) {
//     let result = [];
//     if (
//         !firstElement ||
//         !secondElement ||
//         firstElement.nodeName !== secondElement.nodeName
//     ) {
//         return false;
//     }

//     for (let i = 0, done = false; !done && firstElement && secondElement; i++) {
//         if (firstElement.nodeName !== secondElement.nodeName) {
//             done = true;
//         } else {
//             result.push([firstElement, secondElement]);
//             firstElement =
//                 firstElement.childNodes[firstElement.childNodes.length - 1];
//             secondElement = secondElement.childNodes[0];
//         }
//     }

//     for (const [firstElement, secondElement] of result) {
//         while (secondElement.hasChildNodes()) {
//             firstElement.appendChild(secondElement.firstChild);
//         }
//         secondElement.replaceWith(firstElement);
//     }
// }
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// function surroundSelection(elementType, className, style) {
//     function splitElements(firstElement, secondElement) {
//         let result = [];
//         if (
//             !firstElement ||
//             !secondElement ||
//             firstElement.nodeName !== secondElement.nodeName
//         ) {
//             return false;
//         }

//         for (
//             let i = 0, done = false;
//             !done && firstElement && secondElement;
//             i++
//         ) {
//             if (firstElement.nodeName !== secondElement.nodeName) {
//                 done = true;
//             } else {
//                 result.push([firstElement, secondElement]);
//                 firstElement =
//                     firstElement.childNodes[firstElement.childNodes.length - 1];
//                 secondElement = secondElement.childNodes[0];
//             }
//         }

//         for (const [firstElement, secondElement] of result) {
//             while (secondElement.hasChildNodes()) {
//                 firstElement.appendChild(secondElement.firstChild);
//             }
//             secondElement.replaceWith(firstElement);
//         }
//     }

//     // 如果給定的 elementType 不存在，則中止。
//     if (!document.createElement(elementType).tagName) {
//         return false;
//     }

//     // 獲取當前游標
//     const selection = window.getSelection();

//     // 如果當前沒有選擇內容則中止
//     if (selection.rangeCount === 0) {
//         return;
//     }

//     // 獲取當前選擇的範圍
//     const range = selection.getRangeAt(0);

//     // 獲取範圍內的 HTML 元素
//     const rangeContents = range.extractContents();

//     // 創建一個文檔片段來保存範圍的內容
//     const block = document.createDocumentFragment();

//     for (const node of rangeContents.childNodes) {
//         if (node.nodeType === Node.TEXT_NODE) {
//             block.appendChild(node);
//         } else {
//             for (const child of node.childNodes) {
//                 if (child.nodeType === Node.TEXT_NODE) {
//                     block.appendChild(child);
//                 }
//             }
//         }
//     }

//     // 創建包裝元素並設置其類和样式
//     const wrap = document.createElement(elementType);
//     wrap.className = className;
//     if (style) {
//         wrap.setAttribute("style", style);
//     }

//     // 如果有要換行的內容，將其添加到換行元素中並插入到範圍中
//     if (block.childNodes.length > 0) {
//         wrap.appendChild(block);
//         range.insertNode(wrap);

//         // 在包裝內容的兩側將拆分元素合併在一起
//         splitElements(wrap.previousSibling, wrap.firstChild);
//         splitElements(wrap.lastChild, wrap.nextSibling);
//     }
// }
