const CONTAINER = document.getElementsByClassName("container");
const PAGINATION = document.getElementById("pagination");
const NUMPAGE = document.getElementById("numPage");
const URL_API = "https://rickandmortyapi.com/api/";

function getData(url_api) {
  return fetch(url_api)
    .then((response) => response.json())
    .then((data) => data);
}

const characters = async (url_api) => {
  try {
    const data = await getData(url_api);
    //CHARACTERS 
    const characters = data.results;
    let nodes = '';
    characters.forEach(character => {
      nodes += `
      <div class="character">
                <div class="character__img">
                    <img src="${character.image}" alt="${character.name}">
                </div>
                <div class="character__info">
                    <h2 class="character__info_name">${character.name}</h2>

                    <p class="character__info_status ${character.status.toLowerCase()}">${character.status}</p>

                    <p class="character__info_title-location">location:</p>
                    <a href="${character.location.url}" class="character__info_location">${character.location.name}</a>

                    <p class="character__info_title-origin">Origin:</p>
                    <a href="${character.origin.url}" class="character__info_origin">${character.origin.name}</a>
                </div>
            </div>
      `
    }
    );
    CONTAINER[0].innerHTML = nodes;
    //PAGINATION

    const pages = data.info;
    let nodes2 = '';
    if(pages.prev){
      nodes2 += `<div onclick="characters('${pages.prev}')">Previous</div>`
    }
    if(pages.next){
      nodes2 += `<div onclick="characters('${pages.next}')">Next</div>`
    }
    PAGINATION.innerHTML = nodes2;
    const actualPage = (next) => {
      if(typeof next === null){
        return 'if'
      }else{
        return next[next.length - 1] - 1
      }
    }
    NUMPAGE.innerHTML = actualPage('Page: ' + pages.next);


  } catch {
    console.error(error);
  }
};

characters(URL_API + 'character');

// 0: "id"
// 1: "name"
// 2: "status"
// 3: "species"
// 4: "type"
// 5: "gender"
// 6: "origin"
// 7: "location"
// 8: "image"
// 9: "episode"
// 10: "url"
// 11: "created"
