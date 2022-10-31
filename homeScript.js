document.addEventListener('DOMContentLoaded', bringData);
let watchlistContainer = document.getElementById('watchlist-container');
function bringData(){
    watchlistContainer.innerHTML=''
    render()

}



function render() {
    let datas = JSON.parse(localStorage.getItem('movies'))
    datas.map((movie) => {
        watchlistContainer.innerHTML += `<img src="${movie.Poster}" alt="">
            <div class="movie">
                <div class="movie-title">
                    <p>${movie.Title}</p>
                    <p class="star"><i class="fa-solid fa-star"></i> ${movie.imdbRating} </p>
                </div>
                <div class="movie-details">
                    <p class="genre">${movie.Runtime}</p>
                    <p class="genre">${movie.Genre}</p>
                    <p onclick="remove(${JSON.stringify(movie).replace(/"/g,'\&quot;')})" class="genre addCart"><i class="fa-solid fa-circle-plus"></i> remove</p>
                </div>
                <div class="movie-description">
                    <p>${movie.Plot}</p>

                </div>

            </div>
            
            `
    })

}

function remove(data){
    datas =JSON.parse(localStorage.getItem('movies'))

    let finalData = datas.filter((singleData)=>{
        return JSON.stringify(singleData)!==JSON.stringify(data);
    })

    localStorage.removeItem('movies')
    localStorage.setItem('movies',JSON.stringify(finalData))
    bringData();
}



