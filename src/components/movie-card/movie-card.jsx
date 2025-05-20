import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

export const MovieCard = ({ movie, favoriteMovies, handleFavoriteMovies }) => {
    const token = localStorage.getItem('token');

    const url = "https://charlese-movieapp-71f7e695f2c4.herokuapp.com";

    //const favoriteMovieList = JSON.parse(localStorage.getItem('user.favoriteMovies'));
    //const [favoriteMovies, setFavoriteMovies] = useState(() => {
    //    const stored = localStorage.getItem('user.favoriteMovies');
    //    return stored ? JSON.parse(stored) : [];
    // });
    //const [username, setUsername] = useState(localStorage.getItem('username'));

    const addToFav = (movie) => {
        handleFavoriteMovies((prev) => {
            const inListAlready = prev.find((m) => m._id === movie._id);
            if (inListAlready) return prev;

            const update = [movie, ...prev];
            localStorage.setItem('user.favoriteMovies', JSON.stringify(update));

            return update;
        });

    };

    const addLabel = favoriteMovies.find((m) => m._id === movie._id);

    return (
        <>
            <Card className="h-100">
                <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
                    <Card.Img variant="top" src={movie.image} />

                </Link>
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <button onClick={() => {
                        addToFav(movie);
                    }}>{addLabel ? 'Remove from list' : 'Add to Favorites'}</button>
                </Card.Body>
            </Card>

        </>

        //<div
        //  onClick={() => {
        //    onMovieClick(movie);
        //  }}
        // >
        //  {movie.title}
        // </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string.isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired,
        }),
    }).isRequired,
    //onMovieClick: PropTypes.func.isRequired,
};

//Taken from Card
// onClick={() => onMovieClick(movie)}
