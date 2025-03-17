import { useLocation } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"


export const MovieList = ({ movies }) => {


    const location = useLocation();
    const list = location.pathname === "/" ? movies.map((m) => <MovieCard key={m._id} movie={m} />) : [];


    return (
        <Row>
            <Col className="mb-4 mt-2">
                {list}
            </Col>
        </Row>
    );
};