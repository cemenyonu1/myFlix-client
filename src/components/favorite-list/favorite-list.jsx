import { useState } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Card } from "react-bootstrap";
import { FavoriteCard } from "../favorite-card/favorite-card"


export const FavoriteList = ({ favoriteMovies, removeMovie }) => {
    //const [isHover, setIsHover] = useState(false);


    const favList = (


        (favoriteMovies.map((movie) => {

            return <FavoriteCard
                key={movie._id}
                movie={movie}
                removeMovie={removeMovie}
            />
        }))

    );

    return (
        <>
            <h1 style={{
                color: 'white'
            }}>Favorite Movies</h1>
            <Row>
                {favList ? favList : 'No Saved Titles'}
            </Row>
        </>
    )
}