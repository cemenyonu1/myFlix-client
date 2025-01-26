import React from "react";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {

    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Transformers",
            image:
                "https://m.media-amazon.com/images/M/MV5BZjM3ZDA2YmItMzhiMi00ZGI3LTg3ZGQtOTk3Nzk0MDY0ZDZhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
            director: "Michael Bay"
        },
        {
            id: 2,
            title: "Ready Player One",
            image:
                "https://m.media-amazon.com/images/M/MV5BNzVkMTgzODQtMWIwZC00NzE4LTgzZjYtMzAwM2I5OGZhNjE4XkEyXkFqcGc@._V1_.jpg",
            director: "Steven Speilberg"
        },
        {
            id: 3,
            title: "Straight Outta Compton",
            image:
                "https://m.media-amazon.com/images/M/MV5BMTA5MzkyMzIxNjJeQTJeQWpwZ15BbWU4MDU0MDk0OTUx._V1_FMjpg_UX1000_.jpg",
            director: "F. Gary Gray"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>There are no movies!</div>
    }



    return (
        <React.Fragment>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie)
                }} />
            ))}
        </React.Fragment>
    );

};