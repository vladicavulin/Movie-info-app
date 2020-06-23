$(document).ready(() => {
$('#searchForm').on('submit', (event) => {
let searchText = $('#searchText').val(); 
getMovie(searchText);   
event.preventDefault();
});
});

function getMovie(searchText) {
   axios.get('http://www.omdbapi.com?s='+ searchText +'&apikey=ffecf8fa')
.then((response) => {
console.log(response);
let movies = response.data.Search;
let output='';
$.each(movies, (index, data) => {
    output += `
    <div class="col-md-3">
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

$('movies').html(output);

})
.catch((error) => {
console.log(error);
})   
};