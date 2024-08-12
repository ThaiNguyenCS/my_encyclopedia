import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Form, useSubmit } from "react-router-dom";
import { v4 as uuid } from "uuid";

async function loader() {
    console.log("loader from AddMovie");
    return null;
}

async function action({ request }) {
    console.log("action from AddMovie");
    let data = await request.formData();
    // data = Object.fromEntries(data);
    await axios
        .post("/entertainment/movies/add-movie", data)
        .then((res) => console.log(`response from server ${res.data}`))
        .catch((err) => console.log("Add movie fail"));
    return data;
}

const AddMovie = () => {
    console.log("Add movie component re rendering");
    const [movieArr, setMovieArr] = useState([]);
    const [titleInput, setTitleInput] = useState("");
    const [deductionArr, setDeductionArr] = useState([]);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [deductionInput, setDeductionInput] = useState("");
    const [imdbInput, setImdbInput] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const fileRef = useRef();
    const submit = useSubmit();

    const handleImdbInput = (event) => {
        setImdbInput(event.target.value);
    };

    const handleDeductionInput = (event) => {
        setDeductionInput(event.target.value);
    };

    const searchMovieByTitle = async () => {
        setMovieArr([]);
        let page = 1;
        while (true) {
            try {
                const response = await axios.get(
                    `https://www.omdbapi.com/?s=${titleInput}&apikey=86ec8f20&page=${page}`
                );
                page++;
                if (response.data.Response === "False") break;
                setMovieArr((state) => [...state, ...response.data.Search]);
            } catch (error) {
                throw error;
            }
        }
        // console.log(`Movie Arr with ${movieArr.length}`)
        movieArr.forEach((item) => console.log(item));
    };

    useEffect(() => {
        if (titleInput.length > 1) {
            searchMovieByTitle();
        } else {
            setMovieArr([]);
        }
        console.log("here");
    }, [titleInput]);

    const handleTitleInput = (event) => {
        setTitleInput(event.target.value);
    };

    const handleAddDeduction = (event) => {
        if (deductionInput.length >= 10) {
            setDeductionArr((state) => [...state, deductionInput]);
            setDeductionInput("");
        }
    };

    const handleAddDeductionByEnter = (event) => {
        if (event.key === "Enter") {
            if (deductionInput.length >= 10) {
                setDeductionArr((state) => [...state, deductionInput]);
                setDeductionInput("");
            }
        }
    };

    const handleUploadFile = (event) => {
        if (event.target.files === null) {
            return;
        }
        console.log("number of files: " + event.target.files.length);
        // setUploadedFile(event.target.files[0]);
        setUploadedFile(event.target.files);
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.addEventListener("loadend", (event) => {
                console.log("onloadend");
                console.log(reader.result);
                setImagePreview(reader.result);
            });

            // reader.onloadend = (event) => {};
            reader.readAsDataURL(file);
        }
    };

    function handlePostMovieData() {
        const movieFormData = new FormData();
        if(titleInput === '')
        {
            window.alert("Empty movie title")
            return;
        }
        movieFormData.append("title", titleInput);
        movieFormData.append("imdb", imdbInput);
        movieFormData.append("comments", JSON.stringify(deductionArr));
        if (uploadedFile) {
            for (let i = 0; i < uploadedFile.length; i++) {
                movieFormData.append("uploadedFile", uploadedFile[i]);
            }
        }

        // movieFormData.append("uploadedFile", uploadedFile);
        fileRef.current.value = ""; // reset the file name
        resetStates();
        submit(movieFormData, {
            method: "post",
            encType: "multipart/form-data",
        });
    }

    function resetStates() {
        setTitleInput("");
        setDeductionArr([]);
        setImdbInput("");
        setUploadedFile(null);
    }

    const deleteComment = (idx) => {
        const newCommentArr = [...deductionArr];
        newCommentArr.splice(idx, 1);
        setDeductionArr(newCommentArr);
    }

    return (
        <>
            <div>Add Movie</div>
            <div
                style={{
                    color: "black",
                    width: "180px",
                    aspectRatio: "3/4",
                    display: "grid",
                    placeItems: "center",
                }}
            >
                {imagePreview ? (
                    <img
                        src={imagePreview}
                        style={{ width: "180px", aspectRatio: "3/4" }}
                    />
                ) : (
                    "No poster"
                )}
            </div>

            <div>
                <label htmlFor="movieTitle">Movie Title</label>
                <input
                    id="movieTitle"
                    type="text"
                    onChange={(e) => handleTitleInput(e)}
                    value={titleInput}
                />
            </div>

            <div>
                <label htmlFor="imdbRating">Imdb</label>
                <input
                    id="imdbRating"
                    type="number"
                    onChange={(e) => handleImdbInput(e)}
                    value={imdbInput}
                />
            </div>

            <label htmlFor="deduction">Comments</label>
            <div>
                <textarea
                    name="deduction"
                    id="deduction"
                    onChange={(e) => handleDeductionInput(e)}
                    value={deductionInput}
                    onKeyDown={(e) => handleAddDeductionByEnter(e)}
                ></textarea>
                <button
                    onClick={(e) => {
                        handleAddDeduction(e);
                    }}
                >
                    Add
                </button>
            </div>
            <label htmlFor="uploadedFile">Upload File</label>
            <input
                type="file"
                name="uploadedFile"
                id="uploadedFile"
                ref={fileRef}
                onChange={(e) => handleUploadFile(e)}
            />
            <button onClick={() => handlePostMovieData()}>Submit</button>
            <ul>
                {deductionArr &&
                    deductionArr.length > 0 &&
                    deductionArr.map((item, idx) => (<>
                    <li key={idx}>{item}</li>
                    <button onClick={() => deleteComment(idx)}>Delete</button>
                    </>))}
            </ul>

            {/* <ul>
                {movieArr &&
                    movieArr.map((item, idx) => (
                        <>
                            <img
                                src={item.Poster}
                                style={{ height: "50px" }}
                            ></img>
                            <li key={idx}>{item.Title}</li>
                        </>
                    ))}
            </ul> */}
        </>
    );
};
export default AddMovie;
export { action, loader };
