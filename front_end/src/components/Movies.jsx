import React from "react";
import "./Movies.css";
import MovieItem from "./MovieItem";
import { FAKE_DATA } from "../data/FAKE_movies";
import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from 'uuid';

const generateUniqueID = () => {
    return uuidv4()
}

const Movies = () => {
    const navigate = useNavigate();

    return (
            <>
                <div className="category-title">Movies</div>
                <button onClick={() => navigate(`add-movie`)}>Add movie</button>
                {FAKE_DATA.length > 0 && (
                    <div className="movies-holder">
                        {FAKE_DATA.map((item) => (
                            <MovieItem key={item.id || ''} movieInfo={item} />
                        ))}
                    </div>
                )}
        </>
    );
};

export default Movies;
