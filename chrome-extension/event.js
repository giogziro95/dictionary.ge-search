function doSearch(selectedText) {
	var url = "https://dictionary.ge/ka/search/?q=" + selectedText;
	chrome.tabs.query({
		active: true,
		lastFocusedWindow: true
	}, function(tabArray) {
		var tab = tabArray[0];
		chrome.tabs.create({
			url: url,
			index: tab.index + 1
		});
	});
}

chrome.contextMenus.create({
	id: "doSearch",
	title: "Search Dictionary.ge for \"%s\"",
	contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(eventData){
	if (eventData.menuItemId == "doSearch" && eventData.selectionText) {
		doSearch(eventData.selectionText.toString());
	}
});