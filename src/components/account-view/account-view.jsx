import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FavoriteList } from "../favorite-list/favorite-list";
import { useNavigate } from "react-router-dom";

export const AccountView = ({ onLogout, favoriteMovies, removeMovie }) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const navigate = useNavigate();

    const url = "https://charlese-movieapp-71f7e695f2c4.herokuapp.com";

    const [username, setUsername] = useState(user.username || null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleLogout = () => {
        navigate('/login')
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

    const handleSave = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        fetch(`${url}/users/${user.username}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: json.stringify({
                username: formData.username,
                email: formData.email,
                password: formData.password
            })
        }.then((response) => {
            if (!response.ok) {
                throw new error('Account not updated');
                return response.json;
            };
        }).then((updatedUser) => {
            localStorage.setItem('user', json.stringify(updatedUser));
            setEditing(false);
        }).catch((err) => {
            console.log(err)
        })
        )
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
                <form>
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
                            placeholder={formData.username}
                            onChange={(e) => setFormData({ ...prev, username: e.target.value })}
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
                            placeholder={formData.password}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <button onClick={deleteUser}>
                        Delete Account
                    </button>
                    <button onClick={handleSave} className="p-2 bg-green-500 text-white rounded">
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