document.getElementById("color").onchange = function () {
    var replace = document.createElement("span");
    replace.style.color = this.value;
    replace.textContent = window.getSelection().toString();
    replaceSelection(replace.outerHTML, true);
};

document.getElementById("wysiwyg").onsubmit = function () {
    document.getElementById("result").textContent =
        document.getElementById("#input").innerHTML;
};

// @TimDown
function replaceSelection(html, selectInserted) {
    var sel, range, fragment;
    sel = window.getSelection();

    // Test that the Selection object contains at least one Range
    if (sel.getRangeAt && sel.rangeCount) {
        // Get the first Range (only Firefox supports more than one)
        range = window.getSelection().getRangeAt(0);
        range.deleteContents();

        // Create a DocumentFragment to insert and populate it with HTML
        // Need to test for the existence of range.createContextualFragment
        // because it's non-standard and IE 9 does not support it
        if (range.createContextualFragment) {
            fragment = range.createContextualFragment(html);
        } else {
            // In IE 9 we need to use innerHTML of a temporary element
            var div = document.createElement("div"),
                child;
            div.innerHTML = html;
            fragment = document.createDocumentFragment();
            while ((child = div.firstChild)) {
                fragment.appendChild(child);
            }
        }
        var firstInsertedNode = fragment.firstChild;
        var lastInsertedNode = fragment.lastChild;
        range.insertNode(fragment);
        if (selectInserted) {
            if (firstInsertedNode) {
                range.setStartBefore(firstInsertedNode);
                range.setEndAfter(lastInsertedNode);
            }
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
}
