import { Button, Rating } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form, useLoaderData, useParams, useSubmit } from "react-router-dom";
async function loader({ params }) {
    console.log("Loader in movie detail");
    const result = {};

    const response = await axios.get(`/database/movies/${params.movieId}`);
    const data = response.data;
    console.log(data);

    const commentsResponse = await axios
        .get(`/database/movies/${params.movieId}/comments`)
        .then((res) => res.data);
    console.log(commentsResponse);
    if (data && data.length > 0) result.movie = data[0];
    if (commentsResponse && commentsResponse.length > 0) {
        result.comments = commentsResponse;
    }
    console.log(`result has ${Object.keys(result)}`);
    return result;
}

async function action({ params, request }) {
    console.log("Action in MovieDetail");
    console.log(params);
    if (request.method === "PATCH") {
        const data = await request.formData();
        switch (data.get("_action")) {
            case "addComment": {
                const addCommentResult = await axios.patch(
                    `/database/movies/${params.movieId}/comments`,
                    data
                );
                return addCommentResult;
            }
            case "changeRating": {
                console.log("changeRating");
                const changeRatingResult = await axios.patch(
                    `/database/movies/${params.movieId}/rating`,
                    data
                );
                return changeRatingResult;
            }
            default:
                console.log("action undefined");
        }
        return null;
    } else if (request.method === "DELETE") {
        const data = await request.formData();
        const deleteResult = await axios.delete(
            `/database/movies/${params.movieId}`,
            data
        );
        return deleteResult;
    }
    // console.log(request)
    return null;
}

const MovieDetail = (props) => {
    const [commentInput, setCommentInput] = useState("");
    const { movieId } = useParams();
    const result = useLoaderData();
    const [star, setStar] = useState(undefined);
    const [isReadOnly, setIsReadOnly] = useState(true);
    const submit = useSubmit();

    useEffect(() => {
        console.log("star changed" + star);
    }, [star]);

    const handleDelete = () => {
        const formData = new FormData();
        formData.append("_method", "DELETE");
        submit(formData, {
            method: "DELETE",
            encType: "multipart/form-data",
        });
    };

    const handleCommentChange = (e) => {
        setCommentInput(e.target.value);
    };

    const handleAddComment = () => {
        setCommentInput("");
    };

    const handleRatingChange = (event, newValue) => {
        console.log(newValue);
        setStar(newValue);
    };
    const allowRatingChange = () => {
        console.log("allowRatingChange");
        setIsReadOnly(false);
    };

    const handleRatingChangeConfirm = () => {
        console.log("handleRatingChangeConfirm");
        const data = new FormData();
        console.log(`star ${star}`);
        data.append("rating", star);
        data.append("_action", "changeRating");
        submit(data, { method: "PATCH", encType: "multipart/form-data" });
        setIsReadOnly(true);
    };

    const handleCancelRatingChange = () => {
        setStar(undefined);
        setIsReadOnly(true);
    };

    return (
        <>
            <div>Movie Detail of {movieId}</div>
            {Object.keys(result).length > 0 ? (
                <>
                    <button
                        onClick={() => {
                            handleDelete();
                        }}
                    >
                        Delete this film
                    </button>
                    <Rating
                        name="myRating"
                        value={star || result.movie.myRating || 0}
                        readOnly={isReadOnly}
                        onChange={(event, newValue) =>
                            handleRatingChange(event, newValue)
                        }
                    ></Rating>

                    {isReadOnly ? (
                        <button
                            onClick={() => {
                                allowRatingChange();
                            }}
                        >
                            Modify rating
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    handleRatingChangeConfirm();
                                }}
                            >
                                OK
                            </button>
                            <button
                                onClick={() => {
                                    handleCancelRatingChange();
                                }}
                            >
                                Cancel
                            </button>
                        </>
                    )}

                    <div>{result.movie !== null && result.movie.title}</div>
                    <div>{result.movie !== null && result.movie.imdb}</div>
                    <ul>
                        {result.comments !== undefined &&
                            result.comments.length > 0 &&
                            result.comments.map((item, idx) => (
                                <li key={idx}>{item.content}</li>
                            ))}
                    </ul>
                    <Form method="PATCH" onSubmit={handleAddComment}>
                        <input
                            type="hidden"
                            name="_action"
                            value="addComment"
                        />
                        <input
                            type="text"
                            name="content"
                            id="commentInput"
                            value={commentInput}
                            onChange={(e) => handleCommentChange(e)}
                        />
                        <button type="submit">Comment</button>
                    </Form>
                </>
            ) : (
                <div>This film is not existed</div>
            )}
        </>
    );
};

export default MovieDetail;
export { loader, action };
