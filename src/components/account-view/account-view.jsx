import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FavoriteList } from "../favorite-list/favorite-list";
import { useNavigate } from "react-router-dom";

export const AccountView = ({ onLoggedOut, favoriteMovies, removeMovie, storedToken }) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const navigate = useNavigate();

    const url = "https://charlese-movieapp-71f7e695f2c4.herokuapp.com";

    const [username, setUsername] = useState(user.username || null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
        password: user?.password || "",
    });
    const currentUsername = user?.username || username;

    const handleLogout = () => {
        navigate('/login')
    };

    // useEffect(() => {
    //     if (user) {
    //         setFormData({
    //             username: user.username,
    //             email: user.email,
    //             password: ""
    //         });
    //     }
    //}, [user]);

    if (!user) {
        return <div>No user data found.</div>;
    };

    const deleteUser = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {


            fetch(url + `/users/${currentUsername}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedToken}`
                }
            }).then((response) => {
                if (!response.ok) {
                    throw new Error(`That didn't go well`)
                }
                // return response.json();
            }).then(() => {
                onLoggedOut();
            }).catch((error) => {
                console.log(error)
            })
        }
    };

    const handleSave = (e) => {
        e.preventDefault();

        console.log("Save button clicked");

        const updatedData = {
            newUsername: formData.username,
            newEmail: formData.email,
            newPassword: formData.password
        }

        if (formData.password.trim() !== "") {
            updatedData.password = formData.password
        }

        console.log("Sending form data: " + updatedData)

        fetch(url + `/users/${currentUsername}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedToken}`
            },
            body: JSON.stringify(updatedData)
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Account not updated: ' + response);
            };
            return response.json();
        }).then((updatedUser) => {
            setUsername(updatedData.newUsername);
            setFormData({
                username: updatedData.newUsername,
                email: updatedData.newEmail,
                password: ""
            });
            localStorage.setItem('user', JSON.stringify(formData));
        }
        ).catch((err) => {
            console.log(err)
        })
        setEditing(false);
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
                        <strong>Birthday:</strong> {user.birthday}
                    </p>
                    <button
                        onClick={() => setEditing(true)}
                        className="mt-4 p-2 bg-blue-500 text-white rounded"
                    >
                        Edit
                    </button>
                    <p>
                        <strong>Favorite Movies:</strong>
                    </p>

                </>
            ) : (
                <form onSubmit={handleSave}>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block"
                            style={{
                                color: 'black',
                                padding: '10px'
                            }}>
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            placeholder={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block"
                            style={{
                                color: 'black',
                                padding: '10px'
                            }}>
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block"
                            style={{
                                color: 'black',
                                padding: '10px'
                            }}>
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Password"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <button onClick={(e) => {
                        e.preventDefault();
                        deleteUser()
                    }}>
                        Delete Account
                    </button>
                    <button
                        type="submit"
                        className="p-2 bg-green-500 text-white rounded">
                        Save Changes
                    </button>
                </form>
            )
            }
            <div className='border rounded p-2'>
                <Row className='justify-content-md-center'>
                    <FavoriteList
                        favoriteMovies={favoriteMovies}
                        removeMovie={removeMovie}
                    />
                </Row>
            </div>
        </div >
    );
};