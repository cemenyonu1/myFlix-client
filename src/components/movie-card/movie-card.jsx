import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card onClick={() => onMovieClick(movie)}>
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director.name}</Card.Text>
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
    onMovieClick: PropTypes.func.isRequired,
};
