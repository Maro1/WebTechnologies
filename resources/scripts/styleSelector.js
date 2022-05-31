function selectStyle(style) {
    var oldlink = document.getElementsByTagName("link").item(0);

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", style);

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}
$("#1700s").click(function() {
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
