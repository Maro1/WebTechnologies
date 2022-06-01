$(function(){
  $("#metadata-viewer").load("/resources/html/metadata_viewer.html");
});

async function getKeywords() {
    let articleWords = document.getElementsByClassName("articles").item(0).textContent.replace(/[\,\.\!\?\(\)\[\]\"]/, "").toLowerCase().split(/\s+/);

    let matched = new Set();
    await fetch("/resources/keywords.txt").then(response => response.text()).then(function(text) {
        articleWords.forEach(function(word) {
            let keywords = text.split(/\s+/); 
            if (keywords.find(keyword => keyword.toLowerCase() === word.toLowerCase())) {
                matched.add(word);
            }
    });
    });
    return matched;
}

$(document).on("click", "#list-button", async function() {
    var matches = await getKeywords();

    var keywordList = document.getElementById("keyword-list");

    matches.forEach(match => {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(match));
        keywordList.appendChild(li);
    });
  });

$(document).on("click", "#order-button", async function() {
    var keywordList = document.getElementById("keyword-list");

    var cloned = keywordList.cloneNode(false);

    var list = [];
    console.log(keywordList.childNodes.length);
    for (var i = 0; i < keywordList.childNodes.length; i++) {
            list.push(keywordList.childNodes[i].textContent);
    }

    console.log(list);
    list.sort((a, b) => a.localeCompare(b));

    console.log(list);

    for (var i = 0; i < keywordList.childNodes.length; i++) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(list[i]));
        cloned.appendChild(li);
    }
    keywordList.parentNode.replaceChild(cloned, keywordList);
});

$(document).on("keyup", "#search-text", function() {

    console.log("iii");
    var value = $(this).val().toLowerCase();
    $("#keyword-list li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
