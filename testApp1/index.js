// const express = require("express");
// const app = express();

// app.get('/', (req, res) => {
//     res.send("Hello from red hat minimal");
// })

// app.listen("3550", () => {
//     console.log("Listening on Port 3550 for redhat");
// })

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/moviesApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected");
    })
    .catch((err) => {
        console.log(err);
    })

const movieSchema = new mongoose.Schema({
    title: String,
    year: { type: Number },
    score: { type: Number, default: 0 },
    rating: { type: String, default: 'R' }
})

const Movie = mongoose.model('Movie', movieSchema);

const amadeus = new Movie({ title: 'Amadeus', year: 1986, score: 9.2, rating: 'U' });

amadeus.save().then(() => {
    console.log("Saved to database", amadeus);
})