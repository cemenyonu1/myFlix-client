import { useState } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export const FavoriteList = ({ favoriteMovies }) => {

    const favList = (

        favoriteMovies.map((movie) => (
            <Col className='mb-4 mt-2' md={3} key={movie._id}>
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
            </Col>
        ))

    );

    return (
        <>
            <h2>Favorite Movies</h2>
            <Row>
                {favList}
            </Row>
        </>
    )
}