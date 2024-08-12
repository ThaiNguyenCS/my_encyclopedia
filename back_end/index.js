const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const {
    getMovieByID,
    getMovies,
    getMovieComments,
    deleteMovieByID,
    addMovieToDatabase,
    addCommentToMovie,
    modifyRatingByID
} = require("./database");

require("dotenv").config({ path: ".env" }); // for environment file
const PORT = process.env.PORT || 5000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "/files")); // Specify the destination directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.fieldname +
                "-" +
                uniqueSuffix +
                path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: storage });
const app = express();

app.use(express.urlencoded({ extended: true }));

// database.connect((err) => {
//     if (err) throw err;
//     console.log("Database is connected");
// });

app.use(express.static("../front_end/dist"));

app.get("/database/movies/:movieId", async (req, res) => {
    const result = await getMovieByID(req.params.movieId);
    if (result.result) {
        return res.status(200).json(result.data);
    } else return res.status(500).send("GET MOVIE ERROR");
});

app.delete("/database/movies/:movieId", async (req, res) => {
    const result = await deleteMovieByID(req.params.movieId);
    if (result.result) {
        return res.status(200).json(result.data);
    } else return res.status(500).send("DELETE ERROR");
});

app.get("/database/movies/:movieId/comments", async (req, res) => {
    const result = await getMovieComments(req.params.movieId);
    if (result.result) {
        return res.status(200).json(result.data);
    }
    console.log(result.error);
    return res.status(503).send("Cannot fetch movie comments");
});

app.get("/database/movies", async (req, res) => {
    const result = await getMovies();
    if (result.result) {
        return res.status(200).json(result.data);
    }
    console.log(result.error);
    return res.status(503).send("Cannot fetch movies");
});

app.post(
    "/entertainment/movies/add-movie",
    upload.array("uploadedFile"),
    async (req, res) => {
        console.log(req.body);
        console.log(req.files);
        const result = await addMovieToDatabase(req.body);
        if (result.result) {
            return res.status(200).json(result.data);
        }
        return res.status(500).send("Add movie fail");
    }
);

app.patch("/database/movies/:movieID/rating", upload.none(), async (req, res) => {
    console.log("PATCH /database/movies/:movieID/rating")
    console.log(req.body)
    const result = await modifyRatingByID(req.body, req.params.movieID);
    if (result.result) {
        return res.status(200).json(result.data);
    }
    return res.status(500).send("Change movie rating fail");

})

app.patch("/database/movies/:movieID/comments", upload.none(), async (req, res) => {
    console.log(req.body)
    const result = await addCommentToMovie(req.body, req.params.movieID);
    if (result.result) {
        return res.status(200).json(result.data);
    }
    console.log(result.error);
    return res.status(503).send("Cannot add comment");
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "front_end/dist/index.html"));
});

app.listen(3000, () => {
    console.log(`Server's running at port ${PORT}`);
});
