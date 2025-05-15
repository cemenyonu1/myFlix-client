import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./signup-view.css";
import { Container, Card, Row, Col, CardGroup } from "react-bootstrap";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const url = "https://charlese-movieapp-71f7e695f2c4.herokuapp.com";

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password,
            email: email,
            birthday: birthday,
        };

        fetch(url + "/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.ok) {
                alert("Signup Successful!");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <>
            <Container className="signup-container" fluid>
                <Row className="justify-content-md-center">
                    <Col md={12}>
                        <CardGroup>
                            <Card id="signup-card">
                                <Card.Title id="title">Sign Up</Card.Title>
                                <Card.Subtitle id="register">If you have an account <Card.Link href="/login">click here</Card.Link>.</Card.Subtitle>
                                <Card.Body>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group>
                                            <Form.Label controlId="formUsername">Username:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                                minLength="3"
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label controlId="formPassword">Password:</Form.Label>
                                            <Form.Control
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label contolId="formEmail">Email:</Form.Label>
                                            <Form.Control
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label controlId="formBirthday">Birthday:</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={birthday}
                                                onChange={(e) => setBirthday(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                        <Button variant="primary" type="submit" id="signup-submit">
                                            Sign Up
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
