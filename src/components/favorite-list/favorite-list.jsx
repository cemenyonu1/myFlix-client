import { useState } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export const FavoriteList = ({ favoriteMovies, removeMovie }) => {

    const favList = (

        favoriteMovies.length === 0 ? (
            <Col>
                <h4 style={{
                    color: 'white'
                }}>
                    No movies in your list
                </h4>
            </Col>
        ) :
            (favoriteMovies.map((movie) => (
                <Col className='mb-4 mt-2' md={3} key={movie._id}>
                    <Row>
                        <div className='d-flex justify-content-center'>
                            <Link to={`movies/${movie.title}`}>
                                <img
                                    src={movie.image}
                                    alt={movie.title}
                                    style={{
                                        maxWidth: '100%',
                                        height: '200px'
                                    }}
                                />
                            </Link>

                        </div>
                    </Row>
                    <Row>
                        <button onClick={() => {
                            removeMovie(movie._id)
                        }}>
                            Remove
                        </button>
                    </Row>
                </Col>

            )))

    );

    return (
        <>
            <h1 style={{
                color: 'white'
            }}>Favorite Movies</h1>
            <Row>
                {favList}
            </Row>
        </>
    )
}