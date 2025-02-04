import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const url = "https://charlese-movieapp-71f7e695f2c4.herokuapp.com";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
        };

        fetch(url + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log("Login response: ", response);
                if (response.user) {
                    localStorage.setItem("user", JSON.stringify(response.user));
                    localStorage.setItem("token", JSON.stringify(response.token));
                    onLoggedIn(response.user, response.token);
                } else {
                    alert("User is not registered.");
                }
            })
            .catch((e) => {
                alert("Something went wrong.");
            });
    };

    return (
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
            <Form.Group controlId="fromPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    );
};
