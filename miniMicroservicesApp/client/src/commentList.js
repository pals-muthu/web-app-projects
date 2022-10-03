import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CommentList = ({ postId }) => {
    let [comments, setComments] = useState({});


    const fetchComments = async (event) => {
        
        const res = await axios.get(`http://localhost:4400/posts/${postId}/comments`).catch((e) => {
            console.log("request failed: ", e);    
        });

        setComments(res.data);
        
    };

    useEffect(() => {
        fetchComments();
    }, [])

    console.log("comments: ", comments);

    const renderedComments = Object.values(comments).map(comment => {
        return (<li  key={comment.id}>{comment.content}</li>)
    })

    return (
    <ul>
        {renderedComments}
    </ul>
    );
}

export default CommentList;