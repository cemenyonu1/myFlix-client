export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.image} />
            </div>
            <div>
                <span>
                    Title: <div>{movie.title}</div>
                </span>
            </div>
            <div>
                <span>
                    Director: <div>{movie.director}</div>
                </span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    )
}