import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

export const MovieCard = ({ movie }) => {
    token = localStorage.getItem('token');

    const url = "https://charlese-movieapp-71f7e695f2c4.herokuapp.com";

    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [username, setUsername] = useState(localStorage.getItem('username'));

    const addToFav = (movieId) => {
        fetch(url + `/users/${username}/${movieId}`, {

        })
    }
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
                    <Button variant="link">See More</Button>
                </Link>
            </Card.Body>
        </Card>

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
