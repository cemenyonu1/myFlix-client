import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movieTitle } = useParams();

    const movie = movies.find((m) => m.title === movieTitle);

    if (!movie) {
        return <div>Movie is not found</div>;
    }

    return (
        <div>
            <div>
                <img className="w-100" src={movie.image} />
            </div>
            <div>
                <span>
                    Title: <div>{movie.title}</div>
                </span>
            </div>
            <div>
                <span>
                    Director: <div>{movie.director.name}</div>
                </span>
            </div>
            <Link to={"/"}>
                <button className="back-button" style={{ cursor: "pointer" }}>
                    Back
                </button>
            </Link>
        </div>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string.isRequired,
        director: PropTypes.string,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
};

// Removed from back button
// onClick={onBackClick}
