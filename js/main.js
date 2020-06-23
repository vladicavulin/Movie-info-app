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
})
.catch((error) => {
console.log(error);
})   
};