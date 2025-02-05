import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.image} />
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
            <button
                className="back-button"
                onClick={onBackClick}
                style={{ cursor: "pointer" }}
            >
                Back
            </button>
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
