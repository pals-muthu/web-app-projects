const express = require("express");
const bodyParser = require("body-parser");
const {randomBytes} = require("crypto");
const cors = require('cors');
const httpStatus = require('http-status');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    return res.status(httpStatus.OK).send(posts);
})

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req?.body;
    posts[id] = {
        id, 
        title
    }
    return res.status(httpStatus.CREATED).send(posts[id]);

})

app.listen(4300, () => {
    console.log("listening on port 4300");
})
