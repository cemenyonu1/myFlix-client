import { useState, useEffect } from "react";
import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { AccountView } from "../account-view/account-view";
import { MovieList } from "../movie-list/movie-list";
import "./main-view.css";

const url = "https://charlese-movieapp-71f7e695f2c4.herokuapp.com";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = JSON.parse(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

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
                        id: movie._id,
                        title: movie.title,
                        image: movie.imagePath,
                        director: movie.director,
                        description: movie.description,
                    };
                });
                setMovies(moviesFromApi);
            });
    }, [token]);

    //Toggle Favorite
    const toggleFavorite = async (movieId, isFavorite) => {
        const endpoint = `${url}/users/${username}/${movieId}`;
        const method = isFavorite ? 'DELETE' : "PUT";

        try {
            const response = await fetch(endpoint, {
                "Method": { method },
                headers: {
                    "Content-type": "appleication/json",
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error(`Failed to update favorites list. ${response.status}`);
            };
            const updatedFavorites = await response.json();

            //Update the user's favorite movie list
            setFavoriteMovies();
        } catch {

        }
    };

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
        <BrowserRouter>

            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (

                                    <SignupView />

                                )}
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (

                                    <LoginView
                                        onLoggedIn={(user, token) => {
                                            setUser(user);
                                            setToken(token);
                                        }}
                                    />

                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieTitle"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>There are no movies available.</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>There are no movies available</Col>
                                ) : (
                                    <Col md={12}>
                                        <MovieList movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col md={8}>
                                        <AccountView

                                        />
                                    </Col>

                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>

        </BrowserRouter>

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

        // {movies.map((movie) => (
        //    <Col className="mb-4 mt-2" key={movie.id} md={3}>
        //        <MovieCard movie={movie} />
        //     </Col>
        //  ))}
    );
};
