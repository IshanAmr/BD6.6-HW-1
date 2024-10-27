const express = require('express');
const cors = require("cors");
const { getAllMovies, getMovieById } = require("./controllers/index");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/movies", async (req, res) => {
    const movies = getAllMovies();
    res.json({ movies });
})

app.get("/movies/details/:id", async (req, res) => {
     let movie = getMovieById(parseInt(req.params.id));
     res.json({ movie });
})

module.exports = { app };