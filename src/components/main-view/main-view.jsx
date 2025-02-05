import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const url = "https://charlese-movieapp-71f7e695f2c4.herokuapp.com";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = JSON.parse(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch(url + "/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
                    return {
                        id: movie.key,
                        title: movie.title,
                        image: movie.imagePath,
                        director: movie.director,
                        description: movie.description,
                    };
                });
                setMovies(moviesFromApi);
            });
    }, [token]);

    //if (!user) {
    //  return (
    //    <>
    //      <LoginView
    //        onLoggedIn={(user, token) => {
    //          setUser(user);
    //          setToken(token);
    //        }}
    //      />
    //      or
    //      <SignupView />
    //    </>
    //  );
    //}

    //if (selectedMovie) {
    //  return (
    //    <MovieView
    //      movie={selectedMovie}
    //      onBackClick={() => setSelectedMovie(null)}
    //    />
    //  );
    //}

    //if (movies.length === 0) {
    //  return <div>There are no movies!</div>;
    //}

    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5}>
                    <LoginView
                        onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                        }}
                    />
                    or
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={8} style={{ border: "1px solid black" }}>
                    <MovieView
                        style={{ border: "1px solid green" }}
                        movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)}
                    />
                </Col>
            ) : movies.length === 0 ? (
                <div>The list is empty!</div>
            ) : (
                <>
                    {movies.map((movie) => (
                        <Col key={movie.id} md={3} className="mb-5 mt-5">
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))}
                </>
            )}
        </Row>
        //   <React.Fragment>

        //     <button
        //       onClick={() => {
        //         setUser(null);
        //         setToken(null);
        //         localStorage.clear();
        //       }}
        //    >
        //      Logout
        //    </button>
        //  </React.Fragment>
    );
};
