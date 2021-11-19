let UI = {};
let GiphyAPI = {};
GiphyAPI.inVal = function () {
    return document.querySelector('.js-user-input').value;
}
GiphyAPI.init = function (searchQuery) {
    let url = "https://api.giphy.com/v1/gifs/search?api_key=SDEsWMHoj4DO7LFMxWFHlVJVkElcDm8h&q=" + searchQuery;
    let GiphyAJAXCall = new XMLHttpRequest();
    GiphyAJAXCall.open('GET', url);
    GiphyAJAXCall.send();
    GiphyAJAXCall.addEventListener('load', function (event) {
        GiphyAPI.getGif(event.target.response);
    });
}
GiphyAPI.getGif = function (response) {
    response = JSON.parse(response);
    let images = response.data;
    let container = document.querySelector('.queries');
    let links = document.querySelector('.links-wrap');
    container.innerHTML = "";
    console.log(images[0]);
    images.forEach(function (image) {
        let src = image.images.fixed_height_downsampled.url;
        let link = image.source_post_url;
        container.innerHTML += "<li class='container-image'>" +
            "<div class='links-wrap'><ul class='link-list'>" +
            "<li class='link'><div class='link-holder'><a href='" + image.url + "' target='_blank'>Open Giphy</a></div></li>" +
            "<li class='link'><div class='link-holder'><a href='" + link + "' target='_blank'>Open Source</a></div></li></ul></div>" +
            "<a href='" + image.embed_url + "' target='_blank'><img src='" + src + "' class='image' /></a></li>";
    });
}
UI.handleEnterKey = function () {
    document.querySelector(".js-go").addEventListener('click', function () {
        GiphyAPI.init(GiphyAPI.inVal());
    });
}
UI.handleSubmitButton = function () {
    document.querySelector('.js-user-input').addEventListener('keyup', function (event) {
        if (event.which === 13) {
            console.log(event.which);
            GiphyAPI.init(GiphyAPI.inVal());
        }
    });
}

UI.handleEnterKey();
UI.handleSubmitButton();
