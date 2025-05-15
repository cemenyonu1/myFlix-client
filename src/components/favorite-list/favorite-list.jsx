import { useState } from "react";


export const FavoriteList = () => {
    const firstList = localStorage.getItem('user.favoreiteMovies');
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    return (
        <>
            <h2>Favorite Movies</h2>
            {favoriteMovies.map((movie) => {
                <div key={movie.id}>
                    <Link to={`movies/${movie.title}`}>
                        <img src={movie.image} />
                    </Link>
                </div>
            })}
        </>
    )
}