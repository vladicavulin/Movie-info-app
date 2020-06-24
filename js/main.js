$(document).ready(() => {
$('#searchForm').on('submit', (event) => {
let searchText = $('#searchText').val(); 
getMovies(searchText);   
event.preventDefault();
});
});

function getMovies(searchText) {
   axios.get('http://www.omdbapi.com?s='+ searchText +'&apikey=ffecf8fa')
.then((response) => {
console.log(response);
let movies = response.data.Search;
let output='';
$.each(movies, (index, data) => {
    output += `
    <div class="col-md-3 fire">
    <div class="well text-center">
    <img src="${data.Poster}">
    <h5>${data.Title}</h5>
    <a onclick="movieSelected('${data.imdbID}')"
       class="btn btn-primary"
       href="#"> Movie Details <a/>
    </div>
    </div>
    `;
});

$('#movies').html(output);

})
.catch((error) => {
console.log(error);
});
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com?i='+ movieId +'&apikey=ffecf8fa')
    .then((response) => {
    console.log(response);
    let movie = response.data;

    let output = `
    <div class="row"> 
    <div class="col-md-4">
    <img src="${movie.Poster}" class="thumbnail">
    </div>
    <div class="col-md-8">
    <h2>${movie.Title}</h2>
    <ul class="list-group">
    <li class="list-group-item"> <strong> Genre: </strong> ${movie.Genre}<li>
    <li class="list-group-item"> <strong> Released: </strong> ${movie.Released}<li>
    <li class="list-group-item"> <strong> Rated: </strong> ${movie.Rated}<li>
    <li class="list-group-item"> <strong> IMDB Rating: </strong> ${movie.imdbRating}<li>
    <li class="list-group-item"> <strong> Director: </strong> ${movie.Director}<li>
    <li class="list-group-item"> <strong> Writer: </strong> ${movie.Writer}<li>
    <li class="list-group-item"> <strong>Actors: </strong> ${movie.Actors}<li>
    </ul>
    </div>
    </div>
    <div class="row">
    <div class="well">
    <h3>Plot</h3>
    ${movie.Plot}
    <hr>
    <a href="http://imdb.com/title/${movie.imdbId}" target="_blank" class="btn btn-primary">View IMDB</a>
    <a href="index.html" class="btn btn-default"> Go back to search </a>
    </div>
    </div>

    `
$('#movie').html(output);

})
.catch((error) => {
console.log(error);
});
}
