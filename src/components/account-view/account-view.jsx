import React, { useState, useEffect } from "react";

export const AccountView = ({ onLogout }) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const url = "https://charlese-movieapp-71f7e695f2c4.herokuapp.com";

    const [username, setUsername] = useState(user.username || null);
    const [editing, setEditing] = useState(false);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        favoriteMovies: "",
    });

    const handleLogout = () => {
        Navigate('/login')
    };

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                email: user.email,
                favoriteMovies: user.favoriteMovies.join(", "),
            });
        }
    }, [user]);

    if (!user) {
        return <div>No user data found.</div>;
    };

    const deleteUser = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            const token = localStorage.getItem('token');

            fetch(url + `/users/${username}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                if (!response.ok) {
                    console.error(`That didn't go well`)
                }
                return response.json();
            }).then(() => {
                onLogout();
            }).catch((error) => {
                console.log(error)
            })
        }
    };

    const deleteFav = (movieId) => {
        if (!username) {
            console.log('There is no username')
        };

        token = localStorage.getItem('token');

        fetch(url + `users/${username}/${movieId}`, {
            Method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }

        }).then((response) => {
            if (!response.ok) {
                throw new Error("Movie was not able to be removed from list")
            }
            return response.json();
        }).then(() => {
            setFavoriteMovies = (favoriteMovies.filter((m) => String(m.id) !== String(movieId)))
        }).catch((err) => console.log(err))
    }

    return (
        <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-2">Account Information</h2>
            {!editing ? (
                <>
                    <p>
                        <strong>Username:</strong> {user.username}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Favorite Movies:</strong>{" "}
                        {user.favoriteMovies.join(", ") || "None"}
                    </p>
                    <button
                        onClick={() => setEditing(true)}
                        className="mt-4 p-2 bg-blue-500 text-white rounded"
                    >
                        Edit
                    </button>
                </>
            ) : (
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="favoriteMovies" className="block">
                            Favorite Movies
                        </label>
                        <input
                            id="favoriteMovies"
                            name="favoriteMovies"
                            type="text"
                            value={formData.favoriteMovies}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <button type="submit" onClick={deleteUser}>
                        Delete Account
                    </button>
                    <button type="submit" className="p-2 bg-green-500 text-white rounded">
                        Save Changes
                    </button>
                </form>
            )}
        </div>
    );
};