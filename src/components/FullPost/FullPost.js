import React, {useCallback, useState, useEffect} from 'react';
import './FullPost.css';
import axios from 'axios';

export default (props)=> {

    const [post, setPost]= useState(null);

    const fetchData = useCallback( async () =>{
        if (props.id !== null) {
            const postResponse = await axios.get(POST_URL + props.id);
            setPost(postResponse.data);
        }
    }, [props.id]);

    useEffect(() =>{
        console.log('[FullPost] id=', props.id);
        fetchData().catch(console.error)
    }, [props.id]);
  
    return post && (
    <div className="FullPost">
    {props.id}
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <div className="Edit">
        <button className="Delete">Delete</button>
      </div>
    </div>
  );
};