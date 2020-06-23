$(document).ready(() => {
$('#searchForm').on('submit', (event) => {
console.log($('#searchText').val());    
event.preventDefault();
});
});