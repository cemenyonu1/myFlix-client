import { useLocation } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";


export const MovieList = ({ movies }) => {
    const location = useLocation();
    const userInfo = JSON.parse(localStorage.getItem('user')) || {};
    const favoriteMovies = userInfo.favoriteList || [];

    const isFavorite = movie => favoriteMovies.includes(movie);

    const list = location.pathname === "/" ? movies.map((m) => (
        <Col className="mb-4 mt-2" key={m.id} md={3}>
            <MovieCard key={m._id} movie={m} isFavorite={m.id} />
        </Col>)
    ) : [];



    return (
        <>
            {list}
        </>
    );
};