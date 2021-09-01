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
    let container = document.querySelector('.js-result');
    let queries = document.querySelector('.query-size');
    container.innerHTML = "";
    queries.innerHTML = "";
    images.forEach(function (image) {
        let src = image.images.fixed_height_downsampled.url;
        container.innerHTML += "<img src='" + src + "' class='container-image' />";
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