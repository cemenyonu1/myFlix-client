import { useState } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Card } from "react-bootstrap";

export const FavoriteCard = ({ movie, removeMovie }) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <Col className='mb-4 mt-2' xs={12} sm={6} md={4} lg={3} key={movie._id}>

            <Card>
                <div className='d-flex justify-content-center position-relative'
                    onMouseEnter={() => { setIsHover(true) }}
                    onMouseLeave={() => { setIsHover(false) }}
                >
                    <Link
                        to={`movies/${movie.title}`}

                    >
                        <img
                            src={movie.image}
                            alt={movie.title}
                            style={{
                                maxWidth: '100%',
                                aspectRatio: '2 / 3',
                                //minHeight: '400px',
                                //objectFit: 'cover',
                                //display: 'block'
                            }}

                        />
                        {isHover && <div style={{
                            position: 'absolute',
                            bottom: '0',
                            backgroundColor: 'rgba(0, 0, 0, 0.75)',
                            color: 'white',
                            width: '100%',
                            textAlign: 'center',
                            padding: '8px',
                            fontWeight: 'bold',
                            opacity: '1',
                            transition: 'opacity 0.3s ease-in-out',
                            zIndex: '1'
                        }}>
                            <button
                                style={{
                                    backgroundColor: "rgb(141, 118, 5)",
                                    padding: "5%",
                                    border: "0"
                                }}
                                onClick={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    removeMovie(movie._id);
                                }}>Remove
                            </button>
                        </div>
                        }
                    </Link>

                </div>
            </Card>

        </Col>
    )
}