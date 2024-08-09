import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// function keyDownBack(event) {
//     console.log(event.key);
//     if (event.key === "Escape") {
//         window.history.back();
//     }
// }

async function loader({params}) {
    console.log("Loader in movie detail");
    const response = await axios.get(`/database/movies/${params.movieId}`);
    const data = response.data;
    console.log(`response movie`);
    console.log(data);
    return data;
}

const MovieDetail = (props) => {
    const { movieId } = useParams();

    // useEffect(() => {
    //     console.log("Movie Detail MOUNTED");
    //     window.addEventListener("keydown", keyDownBack);
    //     return () => {
    //         console.log("Movie Detail unmounted");
    //         window.removeEventListener("keydown", keyDownBack);
    //     };
    // }, []);
    return (
        <>
            <div>Movie Detail of {movieId}</div>
        </>
    );
};

export default MovieDetail;
export {loader};