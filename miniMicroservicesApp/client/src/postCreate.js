import React, {useState} from 'react';
import axios from 'axios';

const PostCreate = () => {
    let [title, setTitle] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        await axios.post('http://localhost:4300/posts', {title}).catch((e) => {
            console.log("request failed: ", e);    
        });

        setTitle('');
        console.log("success");
    };

    return (
    <div>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label>Title</label>
                <input value={title}
                onChange={e => setTitle(e.target.value)}
                className='form-control'/>
            </div>
            <button className='btn btn-primary'>Submit</button>
        </form>
    </div>
    );
}

export default PostCreate;