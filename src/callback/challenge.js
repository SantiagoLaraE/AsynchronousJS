// Traer dependecia installada
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest; 

const API = "https://rickandmortyapi.com/api/character/";

// Buscar/Traer información se pasa como parámetro la URL y la función que vamos a crear para hacer varias peticiones
function fetchData(url_api, callback) {
  //Creado por Microsoft iniciar función
  let xhttp = new XMLHttpRequest(); 
  // el método en el que la vamos a pasar GET y POST, la URL, Asynchronous o Synchronous
  xhttp.open("GET", url_api, true); 
  xhttp.onreadystatechange = function (event) {
    //Define una función que se va a llamar de acuerdo al estado de la petición 0,1,2,3 o 4
    if (xhttp.readyState === 4) {
      // readState estado en el que se encuentra | 4 = Finalizado y la respuesta está lista
      if (xhttp.status === 200) {
        // Estado que quedó después de finalizar | 200 = OK, 404 = Not Found
        callback(null, JSON.parse(xhttp.responseText)); // Toma el texto y lo convierte en objeto | Null == Error
      } else {
        const error = new Error("Error" + url_api);
        return callback(error, null);
      }
    }
  };
  xhttp.send();
}

fetchData(API, function (error1, data1) {
  if (error1) return console.log(error1);
    fetchData(API + data1.results[0].id, function(error2, data2){
        if (error2) return console.log(error2);
        fetchData(data2.origin.url, function(error3, data3){
            if (error3) return console.log(error3);
            console.log("data1",data1.info.count);
            console.log("data2",data2.name);
            console.log("data3",data3.dimension);
        })
    });
})
