import React from "react";

export const accoutView = () => {
    const url = "https://charlese-movieapp-71f7e695f2c4.herokuapp.com";

    fetch(url + "/users")
        .then((response) => response.json)
        .then((data) => {
            const usersFromApi = data.map((user) => {
                return {
                    username: user.username,
                    password: user.password,
                    email: user.email,
                    favoriteMovies: user.favoriteMovies,
                };
            });
        });
    return (
        
    )
};
