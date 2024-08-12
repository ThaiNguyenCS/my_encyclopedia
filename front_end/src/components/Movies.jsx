import React from "react";
import "./Movies.css";
import MovieItem from "./MovieItem";
import { FAKE_DATA } from "../data/FAKE_movies";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";

export const loader = async () => {
    let data = await axios.get("/database/movies").then((res) => res.data);
    console.log(data); // an array
    return data;
};

const Movies = () => {
    const navigate = useNavigate();
    const movies = useLoaderData();

    return (
        <>
            <div className="category-title">Movies</div>
            <button onClick={() => navigate(`add-movie`)}>Add movie</button>
            {movies && movies.length > 0 && (
                <div className="movies-holder">
                    {movies.map((item) => (
                        <MovieItem key={item.id || ""} movieInfo={item} />
                    ))}
                </div>
            )}
        </>
    );
};

export default Movies;
