import React from "react";
import { useState } from "react";

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
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Login</button>
        </form>
    );
};
