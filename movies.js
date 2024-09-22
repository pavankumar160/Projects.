// Fetch movies from external JSON file
async function fetchMovies() {
    try {
        const response = await fetch('movies.json'); // Path to your JSON file
        const movies = await response.json();
        return movies;
    } catch (error) {
        console.error('Error loading movie data:', error);
    }
}

function displayMovies(filteredMovies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';

    if (filteredMovies.length === 0) {
        const noResultMessage = document.createElement('div');
        noResultMessage.classList.add('no-result');
        noResultMessage.innerText = 'Result Not Found';
        movieList.appendChild(noResultMessage);
        return;
    }

    filteredMovies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.year} • ${movie.duration} • ${movie.language}</p>
        `;
        movieList.appendChild(movieItem);
    });
}

document.getElementById('filterButton').addEventListener('click', async () => {
    const movies = await fetchMovies();
    
    const selectedGenre = document.getElementById('genre').value;
    const selectedCountry = document.getElementById('country').value;
    const selectedYear = document.getElementById('year').value;
    const selectedLanguage = document.getElementById('language').value;

    const filteredMovies = movies.filter(movie => {
        const genreMatch = selectedGenre === 'all' || movie.genre === selectedGenre;
        const countryMatch = selectedCountry === 'all' || movie.country === selectedCountry;
        const yearMatch = selectedYear === 'all' || movie.year == selectedYear;
        const languageMatch = selectedLanguage === 'all' || movie.language === selectedLanguage;
        return genreMatch && countryMatch && yearMatch && languageMatch;
    });

    displayMovies(filteredMovies);
        
});

// Initially display all movies when page loads
fetchMovies().then(displayMovies);
