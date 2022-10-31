
const submitForm = document.getElementById('search-form');
let searchContainer= document.getElementById('search-container');

let values=[],titles,html;

submitForm.addEventListener('submit', (e)=>{
    count=0;
    searchContainer.innerHTML='';
    e.preventDefault();
    let formdata = new FormData(submitForm)
    value = formdata.get('movie-search')
    fetch(`http://www.omdbapi.com/?s=${value}&apikey=2dc7cc4b`)
    .then(Response=>Response.json())
    .then((data)=>{
        values = data.Search;
        values.map((value)=>{
         
            fetch(`http://www.omdbapi.com/?i=${value.imdbID}&apikey=2dc7cc4b`)
            .then(Response=>Response.json())
            .then(data=>renderSearch(data))
        })
        document.getElementById('search-input').value='';



    })
})

function renderSearch(movie){
    // let data = movie;
   
    // console.log(data)
    searchContainer.innerHTML += `<img src="${movie.Poster}" alt="">
    <div class="movie">
        <div class="movie-title">
            <p>${movie.Title}</p>
            <p class="star"><i class="fa-solid fa-star"></i> ${movie.imdbRating} </p>
        </div>
        <div class="movie-details">
            <p class="genre">${movie.Runtime}</p>
            <p class="genre">${movie.Genre}</p>
            <p onclick="setToLocalStorage(${JSON.stringify(movie).replace(/"/g,'\&quot;')})" class="genre addCart"><i class="fa-solid fa-circle-plus"></i> Watchlist</p>
        </div>
        <div class="movie-description">
            <p>${movie.Plot}</p>

        </div>

    </div>
    
    `
}

function setToLocalStorage(data){
  
    let validJSON = JSON.parse(localStorage.getItem("movies") || "[]");
    validJSON.push(data)
    localStorage.setItem('movies',JSON.stringify(validJSON))
    // console.log(validJSON)
    // validJSON.map((data)=>{
    //     renderWatchlist(data)
    // })
 

}









