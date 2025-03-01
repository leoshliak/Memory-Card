const TMDB_API_KEY =  "68212d6c081e1b9520fc8f85cc34565f"  //import.meta.env.VITE_TMDB_API;
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500'; // w500 is medium size

 export async function fetchRandomPosters() {
  try {
    // Fetch popular movies (random page)
    const randomPage = Math.floor(Math.random() * 100) + 1;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&page=${randomPage}`
    );
    
    const data = await response.json();
    const movies = data.results;
    //console.log(movies)

      const moviePairs = movies
      .filter(movie => movie.poster_path && movie.original_title)
      .slice(0, 16)
      .flatMap(movie => [
        { image: `${BASE_IMAGE_URL}${movie.poster_path}`, title: movie.title, clicks: 0 }
      ]);

    return moviePairs;
  } catch (error) {
    console.error( error);
    return [];
  }
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/*fetchRandomPosters().then(moviePairs => {
  console.log('Shuffled poster URLs:', moviePairs   );
});*/

