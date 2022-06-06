import React, {useState} from 'react';
import './FullPost.css';

export default props => {
    useEffect(() =>{
        console.log('[FullPost] id=', props.id);
    }, [props.id])
  return (
    <div className="FullPost">
      <h1>Title</h1>
      <p>Body</p>
      <div className="Edit">
        <button className="Delete">Delete</button>
      </div>
    </div>
  );
};
