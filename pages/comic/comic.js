function selectStyle(style) {
    var oldlink = document.getElementsByTagName("link").item(0);

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", style);

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}

$("#future").click(function() {
    selectStyle("/css/future.css");
    console.log("Future");
})

$("#late-20th").click(function() {
    selectStyle("/css/20th_century.css");
    console.log("Late 20th");
})

$("#dadaism").click(function() {
    selectStyle("/css/1920s.css");
    console.log("Dadaism");
})
selectStyle("/css/1920s.css");

