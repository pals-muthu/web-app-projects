const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
    res.send('Home Page!!!');
})

app.listen("4000", () => {
    console.log("Listening on port 4000");
})