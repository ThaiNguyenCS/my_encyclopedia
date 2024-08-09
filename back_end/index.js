const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
require("dotenv").config({path: '.env'}); // for environment file
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

const database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

database.connect((err) => {
    if(err) throw err
    console.log("Database is connected");
})

app.use(express.static("../front_end/dist"));

app.get("/database/movies/:movieId", (req, res) => {
    const QUERY = `SELECT * FROM movies WHERE id = ${req.params.movieId}`;
    console.log(QUERY);
    database.query(QUERY, (err, result, field) => {
        if (err) throw res.status(404).send("Movie not Found");
        // console.log(typeof result)
        return res.status(200).json(result);
    });
});

app.post(
    "/entertainment/movies/add-movie",
    upload.array("uploadedFile"),
    (req, res) => {
        console.log(req.body);
        console.log(req.files);
        // const {title, imdb, deductions} = req.body;
        // console.log(title)
        // console.log(imdb)
        // console.log(deductions)
        // const QUERY = `INSERT INTO movies (title, imdb, myRating, deductions) VALUES ()`;
        // console.log(QUERY);
        // database.query(QUERY, (err, result, field) => {
        //     if (err) throw res.status(404).send("Movie not Found");
        //     // console.log(typeof result)
        //     return res.status(200).json(result);
        // });
        res.end("OK");
    }
);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "front_end/dist/index.html"));
});

app.listen(3000, () => {
    console.log(`Server's running at port ${PORT}`);
});
