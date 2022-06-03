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

function getOccurences(word) {
  let paragraphs = document.getElementsByTagName("p");


  let occurences = [];
  for (i in paragraphs) {
    let pText = paragraphs[i].textContent;
    if (pText == undefined) {
      continue;
    }

    let pWords = pText.replace(/[\,\.\!\?\(\)\[\]\"]/, "").toLowerCase().split(/\s+/);
    for (pWord in pWords) {
      if (pWords[pWord] === word) {
        occurences.push(paragraphs[i]);
        break;
      }
    }
  }
  return occurences;
}

function wordClicked(e) {
  console.log(e.target.parentNode.innerText);
  let word = e.target.parentNode.innerText.toLowerCase();
  let occurences = getOccurences(word);

  let keyWordInfo = document.getElementById("num-occurences");
  keyWordInfo.textContent = occurences.length + " occurences:";

  let occurenceList = document.getElementById("occurence-list");

  for (i in occurences) {
    let o = occurences[i];

    let li = document.createElement("li");
    let a = document.createElement("a");
    a.text = o.textContent.substring(0, 50) + "..."; 
    a.setAttribute("href", "#");
    a.onclick = () => {
      closeMetadata();
      o.scrollIntoView();
    }

    li.appendChild(a);
    occurenceList.appendChild(li);
  }
} 

$(document).on("click", "#list-button", async function() {
    var matches = await getKeywords();

    var keywordList = document.getElementById("keyword-list");

    matches.forEach(match => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.text = match;
        a.setAttribute("href", "#");
        a.onclick = wordClicked;
        li.appendChild(a);
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
        let li = document.createElement("li");
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

function openMetadata() {
  document.getElementById("metadata-sidebar").style.width = "800px";
}

function closeMetadata() {
  document.getElementById("metadata-sidebar").style.width = "0";
} 