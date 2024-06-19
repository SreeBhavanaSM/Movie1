import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'https://www.omdbapi.com/?apikey=3aff002a';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovie = async (title) => {
        try {
            const response = await fetch(`${API_URL}&s=${title}`);
            const data = await response.json();
            if (data.Search) {
                setMovies(data.Search);
            } else {
                setMovies([]);
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
            setMovies([]);
        }
    }

    useEffect(() => {
        if (searchTerm) {
            searchMovie(searchTerm);
        } else {
            searchMovie('spiderman');
        }
    }, [searchTerm]);

    return (
        <div className="app">
            <h1>Movie Land</h1>
            <div className="search">
                <input 
                    type="text" 
                    placeholder="Search for movies" 
                    value={searchTerm}  
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon} 
                    alt="search"  
                    onClick={() => searchMovie(searchTerm)}
                />
            </div>
            {
                movies?.length > 0  
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard key={movie.imdbID} movie={movie} />
                        ))}
                    </div> 
                ) : (
                    <div className="noMovies">
                        <h2>No movies found......</h2>
                    </div>
                )
            }
        </div>
    );
}

export default App;
