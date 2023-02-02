/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");

const getCards = async () => {
  const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=17c8dffc0cbd61894a0460817bbba88e&language=en-US&page=1");
  const responseJson = await response.json();
  const movies = responseJson.results;
  console.log(movies);
  renderAllMovies(movies);
};
const getCast = movidcast => {
  fetch(`https://api.themoviedb.org/3/movie/${movidcast}/credits?api_key=17c8dffc0cbd61894a0460817bbba88e&language=en-US`).then(response => {
    return response.json();
  }).then(rescast => {
    const moviesCast = rescast.cast.slice(0, 4);
    console.log(moviesCast);
    renderAllCast(moviesCast);
  });
};
const getTrailer = movivid => {
  fetch(`https://api.themoviedb.org/3/movie/${movivid}/videos?api_key=17c8dffc0cbd61894a0460817bbba88e&language=en-US`).then(response => {
    return response.json();
  }).then(resvid => {
    const moviesTrailer = resvid.results.slice(0, 2);
    console.log(moviesTrailer);
    renderAllTrailer(moviesTrailer);
  });
};
function renderAllCast(moviesCast) {
  const listCast = document.createElement("div");
  listCast.innerHTML = "";
  moviesCast.forEach(cast => {
    listCast.innerHTML += `
            <div class="card-cast">
                <div class="cast-img">
                  <img src="https://www.themoviedb.org/t/p/original/${cast.profile_path}" alt="" />
                </div>
            <h5>${cast.name}</h5>
            </div>
        `;
  });
  listCast.classList.add("row-cast");
  document.querySelector(".caption").appendChild(listCast);
}
const renderAllTrailer = moviesTrailer => {
  const listTrailer = document.createElement("div");
  listTrailer.innerHTML = "";
  moviesTrailer.forEach((trailer, index) => {
    listTrailer.innerHTML += `
          <h2>Official Trailer #${index + 1}</h2>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/${trailer.key}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>

    `;
  });
  listTrailer.classList.add("trailer");
  document.querySelector("section .container").appendChild(listTrailer);
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
            
            <p>${resmovie.release_date.slice(0, 4)}</p>
            <div>${resmovie.genres.map(genre => `<span>${genre.name}</span>`).join(" - ")}</div>
            <p>${resmovie.overview}</p>
            <h4>Cast:</h4>
    
          </div>
        </div>
      </div>
    `;
}
const renderAllMovies = movies => {
  const listMovieElement = document.querySelector(".movie-list");
  listMovieElement.innerHTML = "";
  movies.forEach(movie => {
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
  detailMovie.forEach(img => {
    img.addEventListener("click", function () {
      const movieID = this.dataset.id;
      topFunction();
      // console.log(movieID);
      fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=17c8dffc0cbd61894a0460817bbba88e&language=en-US`).then(response => {
        return response.json();
      }).then(resmovie => {
        const secMovie = document.querySelector("section");
        const detailsMovies = showMovieDetail(resmovie);
        secMovie.innerHTML = detailsMovies;
      });
      getCast(movieID);
      getTrailer(movieID);
    });
  });
};
getCards();
const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
})();

/******/ })()
;