import React, {useCallback, useState, useEffect} from 'react';
import './FullPost.css';
import axios from 'axios';
import { POST_URL } from '../../constants';

export default ({id})=> {

    const [post, setPost]= useState(null);

    const fetchData = useCallback( async () =>{
        if (id !== null) {
            const postResponse = await axios.get(POST_URL + id);
            setPost(postResponse.data);
        }
    }, [id]);

    useEffect(() =>{
        console.log('[FullPost] id=', id);
        fetchData().catch(console.error)
    }, [id]);
  
    return post && (
    <div className="FullPost">
    {id}
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <div className="Edit">
        <button className="Delete">Delete</button>
      </div>
    </div>
  );
};