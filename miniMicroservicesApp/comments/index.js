const express = require("express");
const bodyParser = require("body-parser");
const {randomBytes} = require("crypto");
const cors = require('cors');
const httpStatus = require('http-status');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    const {id} = req.params;
    return res.status(httpStatus.OK).send(commentsByPostId[id] || []);
})

app.post('/posts/:id/comments', (req, res) => {
    const {id} = req.params;
    const { content } = req?.body;
    const commentId = randomBytes(4).toString('hex');

    if (!commentsByPostId[id]) {
        commentsByPostId[id] = [];
    }

    commentsByPostId[id].push({id: commentId, content});
    
    return res.status(httpStatus.CREATED).send(commentsByPostId[id]);

})

app.listen(4400, () => {
    console.log("listening on port 4400");
})
