const mysql = require("mysql2/promise");
require("dotenv").config({ path: ".env" });
const { v4: uuidv4 } = require("uuid");
const database = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

async function getMovies() {
    const QUERY = `SELECT * FROM ${process.env.DB_TABLE_MOVIES}`;
    try {
        const [results] = await database.execute(QUERY);
        console.log(results);
        return { result: true, data: results };
    } catch (error) {
        return { result: false, error };
    }
}

async function getMovieByID(id) {
    const QUERY = `SELECT * FROM ${process.env.DB_TABLE_MOVIES} WHERE id = '${id}' `;
    try {
        const [results] = await database.query(QUERY);
        console.log(results);
        return { result: true, data: results };
    } catch (error) {
        return { result: false, error };
    }
}

async function getMovieComments(movieID) {
    const QUERY = `SELECT id, content FROM ${process.env.DB_TABLE_COMMENTS} WHERE movieID = '${movieID}' `;
    try {
        const [results] = await database.query(QUERY);
        console.log(QUERY)
        console.log(results);
        return { result: true, data: results };
    } catch (error) {
        return { result: false, error };
    }
}

async function deleteMovieByID(id) {
    const QUERY = `DELETE FROM ${process.env.DB_TABLE_MOVIES} WHERE id = '${id}' `;
    try {
        const [results] = await database.query(QUERY);
        console.log(results);
    } catch (error) {
        return { result: false, error };
    }

    const COMMENT_QUERY = `DELETE FROM ${process.env.DB_TABLE_COMMENTS} WHERE movieID = '${id}' `;

    try {
        const [results] = await database.query(COMMENT_QUERY);
        console.log(results);
        return { result: true, data: results };
    } catch (error) {
        return { result: false, error };
    }
}

async function addMovieToDatabase({ title, imdb, myRating, comments }) {
    const movieID = uuidv4();
    const QUERY = `INSERT INTO ${
        process.env.DB_TABLE_MOVIES
    } (id, title, imdb, myRating) VALUES ('${movieID}', '${title}', ${imdb}, ${
        myRating || null
    })`;
    let res = {};

    try {
        const [result] = await database.query(QUERY);
        res = { result: true, data: result };
    } catch (error) {
        return { result: false, error };
    }

    if (comments) {
        let convertedComments = JSON.parse(comments);
        console.log(convertedComments);
        let ADD_COMMENT_QUERY = `INSERT INTO ${process.env.DB_TABLE_COMMENTS} (id, content, movieID) VALUES`;
        for (let i = 0; i < convertedComments.length; i++) {
            ADD_COMMENT_QUERY += ` ('${uuidv4()}', '${
                convertedComments[i]
            }', '${movieID}')`;
        }
        console.log(ADD_COMMENT_QUERY);
        try {
            const [result] = await database.query(ADD_COMMENT_QUERY);
            return { result: true, data: result };
        } catch (error) {
            return { result: false, error };
        }
    }
    return res;
}

async function addCommentToMovie({content}, movieID)
{
    const QUERY = `INSERT INTO ${process.env.DB_TABLE_COMMENTS} (id, content, movieID) VALUES ('${uuidv4()}', "${content}", '${movieID}')`
    try {
        const [result] = await database.query(QUERY);
        return {result: true, data: result}
    } catch (error) {
        return {result: false, error}
    }
} 

async function modifyRatingByID ({rating}, movieID)
{
    const QUERY = `UPDATE ${process.env.DB_TABLE_MOVIES} SET myRating = ${rating} WHERE id = '${movieID}'`;
    console.log(QUERY)
    try {
        const [result] = await database.execute(QUERY);
        return {result: true, data: result}
    } catch (error) {
        return {result: false, error}
    }
}

module.exports = {
    getMovieByID,
    getMovies,
    getMovieComments,
    deleteMovieByID,
    addMovieToDatabase,
    addCommentToMovie,
    modifyRatingByID
}; // default export
