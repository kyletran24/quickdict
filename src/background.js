
// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {

  const parent = chrome.contextMenus.create({"title": "QuickDict",
    "contexts": ["selection"], "id": "parent-selection"});

  const jisho = chrome.contextMenus.create({
    "title": "Jisho",
    contexts: ["selection"],
    "parentId": parent,
    "id": "jisho"
  });

  const goo = chrome.contextMenus.create({
    "title": "Goo",
    contexts:["selection"],
    "parentId": parent,
    "id": "goo"
  });

  const takoboto = chrome.contextMenus.create({
    "title": "Takoboto",
    contexts:["selection"],
    "parentId": parent,
    "id": "takoboto"
  });

  const deepL = chrome.contextMenus.create({
    "title": "DeepL",
    contexts:["selection"],
    "parentId": parent,
    "id": "deepL"
  });

  const save = chrome.contextMenus.create({
    "title": "Save this selection",
    contexts:["selection"],
    "parentId": parent,
    "id": "save"
  });



});

// Add Right click event
chrome.contextMenus.onClicked.addListener(onClickHandler);


function onClickHandler(info, tab) {

  const sText = info.selectionText;
  let url = "";

  if (info.menuItemId === "jisho") {
    url = "https://jisho.org/search/" + encodeURIComponent(sText);

  }
  else if (info.menuItemId === "goo") {
    url = "https://dictionary.goo.ne.jp/srch/all/" + encodeURIComponent(sText) + "/m0u";
  }
  else if (info.menuItemId === "takoboto") {
    url = "http://takoboto.jp/?q=" + encodeURIComponent(sText);
  }
  else if (info.menuItemId === "deepL") {
    url = "https://www.deepl.com/en/translator#ja/en/" + encodeURIComponent(sText);
  }

  if (info.menuItemId === "save") {
    if (localStorage.getItem("vocabList") === null) {
      let emptyArr = [];
      localStorage.setItem("vocabList", JSON.stringify(emptyArr));
    }

    let updateArr = JSON.parse(localStorage.getItem("vocabList"));
    updateArr.push(sText);
    localStorage.setItem("vocabList", JSON.stringify(updateArr));

    // localStorage.setItem(sText, '');
  }
  else {
    // window.open(url, '_blank',"width=750, height=750, left=35, top=35");
    chrome.windows.create({left: 35, top: 35, height: 750, width: 750, url: url})
  }
}


// Rule for Extension Popup
chrome.runtime.onInstalled.addListener(function() {

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: '*'},
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});