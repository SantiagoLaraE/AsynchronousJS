const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = "https://rickandmortyapi.com/api/character/";

const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", url_api, true);
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        xhttp.status === 200
          ? resolve(JSON.parse(xhttp.responseText))
          : reject(new Error("Error"));
      }
    };
    xhttp.send();
  });
};

//Llamado

fetchData(API)
  .then((data) => {
      console.log('primer', data)
      return fetchData(`${API}${data.results[0].id}`)
  })
  .then((data) => {
      console.log('segundo', data)
  })
  .catch((err) => console.error(err));

