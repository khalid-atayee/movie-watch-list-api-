
const submitForm = document.getElementById('search-form');
let movieContainer= document.querySelector('.movie-container');
let values=[],titles,html;

submitForm.addEventListener('submit', (e)=>{
    count=0;
    movieContainer.innerHTML='';
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
            .then(data=>render(data))
        })
        document.getElementById('search-input').value='';



    })
})

function render(movie){
    let data = movie;
    data = JSON.stringify(data);
    // console.log(data)
    movieContainer.innerHTML += `<img src="${movie.Poster}" alt="">
    <div class="movie">
        <div class="movie-title">
            <p>${movie.Title}</p>
            <p class="star"><i class="fa-solid fa-star"></i> ${movie.imdbRating} </p>
        </div>
        <div class="movie-details">
            <p class="genre">${movie.Runtime}</p>
            <p class="genre">${movie.Genre}</p>
            <p data-check="${data}" data-id=movie${count++} class="genre addCart"><i class="fa-solid fa-circle-plus"></i> Watchlist</p>
        </div>
        <div class="movie-description">
            <p>${movie.Plot}</p>

        </div>

    </div>
    
    `
   
   
}


document.addEventListener('click',(e)=>{
    if(e.target.dataset.id==document.getElementsByName('p').dataset.id){
        console.log('ok')
    }
   

})
