const getCards = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=17c8dffc0cbd61894a0460817bbba88e&language=en-US&page=1"
  );

  const responseJson = await response.json();
  const movies = responseJson.results;
  console.log(movies);
  renderAllMovies(movies);
};

function showMovieDetail(resmovie) {
  return `
      <div class="backdrop">
        <img src="https://www.themoviedb.org/t/p/original/${resmovie.backdrop_path}"" alt="${resmovie.title}" />
      </div>
      <div class="container">
        <div class="hero">
          <div class="card-img">
            <img src="https://www.themoviedb.org/t/p/original/${resmovie.poster_path}"" alt="${resmovie.title}" />
          </div>
          <div class="caption">
            <h2>${resmovie.title}</h2>
            <span>Adventure - Comedy - Romantic</span>
            <p>${resmovie.overview}
            </p>
            <h4>Cast:</h4>
            <div class="row-cast">
              <div class="card-cast">
                <div class="cast-img">
                  <img src="images/cast1.jpg" alt="" />
                </div>
                <h5>Tom Holland</h5>
              </div>
              <div class="card-cast">
                <div class="cast-img">
                  <img src="images/cast1.jpg" alt="" />
                </div>
                <h5>Tom Holland</h5>
              </div>
              <div class="card-cast">
                <div class="cast-img">
                  <img src="images/cast1.jpg" alt="" />
                </div>
                <h5>Tom Holland</h5>
              </div>
              <div class="card-cast">
                <div class="cast-img">
                  <img src="images/cast1.jpg" alt="" />
                </div>
                <h5>Tom Holland</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="trailer">
          <h2>Official Trailer #1</h2>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/JfVOs4VSpmA"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <h2>Official Trailer #2</h2>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/JfVOs4VSpmA"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    `;
}

const renderAllMovies = (movies) => {
  const listMovieElement = document.querySelector(".movie-list");
  listMovieElement.innerHTML = "";

  movies.forEach((movie) => {
    listMovieElement.innerHTML += `
        <div class="card-movie">
            <div class="card-movie-img">
              <img src="https://www.themoviedb.org/t/p/original/${movie.poster_path}" alt="${movie.title}" data-id="${movie.id}" />
            </div>
            <h5 class="movie-title">${movie.title}</h5>
        </div>
    
    `;
  });

  const detailMovie = document.querySelectorAll(".card-movie-img img");
  detailMovie.forEach((img) => {
    img.addEventListener("click", function () {
      const movieID = this.dataset.id;
      console.log(movieID);
      fetch(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=17c8dffc0cbd61894a0460817bbba88e&language=en-US`
      )
        .then((response) => {
          return response.json();
        })
        .then((resmovie) => {
          const secMovie = document.querySelector("section");
          const detailsMovies = showMovieDetail(resmovie);

          secMovie.innerHTML = detailsMovies;
        });
    });
  });
};

getCards();
