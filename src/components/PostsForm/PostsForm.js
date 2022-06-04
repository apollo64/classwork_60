import React, {useEffect} from 'react';

const PostsForm = () => {
    console.log("[PostsForm] render")
    useEffect(() => {
        console.log("[PostsForm] is useEffect function");

        return () => {
            console.log("[PostsForm] before unmounted");
        }
    })
    return (
        <section className="NewPost">
            <p>new post form will be here</p>
        </section>
    )
};

export default PostsForm;
