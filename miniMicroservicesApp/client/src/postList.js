import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CommentCreate from './commentCreate';
import CommentList from './commentList';

const PostList = () => {
    let [posts, setPosts] = useState({});


    const fetchPosts = async (event) => {
        
        const res = await axios.get('http://localhost:4300/posts').catch((e) => {
            console.log("request failed: ", e);    
        });

        setPosts(res.data);
        
    };

    useEffect(() => {
        fetchPosts();
    }, [])

    console.log("posts: ", posts);

    const renderedPosts = Object.values(posts).map(post => {
        return (<div className='card' style={{width:'30%',marginBottom:'20px'}} key={post.id}>
            <div className='card-body'>
                <h3>{post.title}</h3>
                <CommentList postId={post.id} />
                <CommentCreate postId={post.id} />
            </div>
        </div>)
    })

    return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>
        {renderedPosts}
    </div>
    );
}

export default PostList;