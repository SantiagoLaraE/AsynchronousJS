// let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

 const API = 'https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,image_id,thumbnail';

 function fetchData(url_api, callback){
     let xhttp = new XMLHttpRequest();
     xhttp.open('GET', url_api, true);
     xhttp.onreadystatechange = function(event){
        if(xhttp.readyState === 4){
            if(xhttp.status === 200){
                callback(null, JSON.parse(xhttp.responseText))
            }else{
                const error = new Error('Error' + url_api);
                return callback(error, null)
            }
        }
     }
     xhttp.send();
 }

fetchData(API, function(error1, data1){
    if(error1) return console.error(error1);
    renderArtwork(data1.data, data1.config);
});
const divHTML = document.getElementById('app');
function renderArtwork(data, config) {
    let artworks = '';
    data.forEach(({id,title,artist_display,date_display,image_id,thumbnail}) => {
        artworks += `
        <div class="artwork">
        <div class="artwork__img">
            <span>${id}</span>
            <img src="https://www.artic.edu/iiif/2/${image_id}/full/200,/0/default.jpg" alt="${thumbnail.alt_text}">
        </div>
        <div class="artwork__caption">
            <h4>${title}</h4>
            <h3>${artist_display}</h3>
            <p>${date_display}</p>
        </div>
    </div>
        `;
    });
    console.log(config);
    divHTML.innerHTML += artworks;
}

fetch('https://rickandmortyapi.com/api/character/')
.then(response => response.json())
.then(json => console.log(json))
.catch(error => console.error(error))