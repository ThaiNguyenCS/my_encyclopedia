import React, { useEffect } from "react";
import "./MovieItem.css";
import Interstellar from "../assets/interstellar.jpg";
import { IoStarOutline } from "react-icons/io5";
import Rating from "@mui/material/Rating";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const MovieItem = (props) => {
    const { id, title, imdb, myRating } = props.movieInfo;
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(id);
    };
   

    return (
        <>
            <div className="movie-item-container" onClick={handleClick}>
                <img className="movie-poster" src={Interstellar} alt="" />

                <div className="imdb-rating">
                    <IoStarOutline className="imdb-rating-star" />
                    <div>{imdb}</div>
                </div>
                <div className="movie-title" onClick={handleClick}>
                    {title}
                </div>
                <Rating name="simple-controlled"></Rating>
                <div className="my-rating">{myRating}</div>
            </div>
        </>
    );
};

export default MovieItem;
