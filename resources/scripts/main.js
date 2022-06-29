$(function(){
  $("#custom-navbar").load("/resources/html/navbar.html");
});

$(function(){
  $("#custom-foot").load("/resources/html/footer.html");
});

function selectStyle(style) {
    var oldlink = document.getElementsByTagName("link").item(0);

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", style);

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}

$("#medieval").click(function() {
    selectStyle("/css/1500-1800.css");
})
$("#victorian").click(function() {
    selectStyle("/css/1500-1800.css");
})
$("#1920s").click(function() {
    selectStyle("/css/1920s.css");
})
$("#1980s").click(function() {
    selectStyle("/css/1980s.css");
})
$("#modern").click(function() {
    selectStyle("/css/modern.css");
})
$("#future").click(function() {
    selectStyle("/css/future.css");
})

const showOnPx = 100;
const backToTopButton = document.querySelector(".back-to-top")

const scrollContainer = () => {
  return document.documentElement || document.body;
};

document.addEventListener("scroll", () => {
  if (scrollContainer().scrollTop > showOnPx) {
    backToTopButton.classList.remove("hidden")
  } else {
    backToTopButton.classList.add("hidden")
  }
})

const goToTop = () => {
  document.body.scrollIntoView();
};

backToTopButton.addEventListener("click", goToTop)
