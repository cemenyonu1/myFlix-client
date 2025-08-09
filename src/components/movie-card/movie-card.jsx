import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

export const MovieCard = ({ movie, favoriteMovies, handleFavoriteMovies, removeMovie }) => {
    const token = localStorage.getItem('token');

    const url = "https://charlese-movieapp-71f7e695f2c4.herokuapp.com";

    const [isHover, setIsHover] = useState(false);

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
                <div
                    className='image-container'
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    <Link
                        to={`/movies/${encodeURIComponent(movie.title)}`}
                    >
                        <Card.Img
                            variant="top"
                            src={movie.image}
                            style={{
                                maxWidth: '100%',
                                height: '400px'
                            }}
                        />
                        {isHover && <div style={{
                            position: 'absolute',
                            bottom: '0',
                            backgroundColor: 'rgba(0, 0, 0, 0.75)',
                            color: 'white',
                            width: '100%',
                            textAlign: 'center',
                            padding: '8px',
                            fontWeight: 'bold',
                            opacity: '1',
                            transition: 'opacity 0.3s ease-in-out',
                            zIndex: '1'
                        }}>
                            {movie.title}<br />
                            <button
                                style={{
                                    backgroundColor: "rgb(141, 118, 5)",
                                    padding: "5%",
                                    border: "0",
                                    marginTop: "10px"
                                }}
                                onClick={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    addLabel ? removeMovie(movie._id) : addToFav(movie);
                                }}>{addLabel ? 'Remove From My List' : 'Add To My List'}</button>
                        </div>}

                    </Link>
                </div>
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
