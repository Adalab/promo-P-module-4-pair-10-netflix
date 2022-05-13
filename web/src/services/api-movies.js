// login
//le paso value como parametro que viene de all movies donde estan los select de los filtros
const getMoviesFromApi = (value) => {
  console.loh(getMoviesFromApi);
  console.log('Se están pidiendo las películas de la app');
  //Incluyo la nueva ruta donde pediremos al servidor
  //le paso params gender
  // concateno y el filtro será un datio variable
  return fetch(`http://localhost:4000/movies?gender=${value.gender}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
