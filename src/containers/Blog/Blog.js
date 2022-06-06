import React, {useEffect, useState} from 'react';
import './Blog.css';
import Post from "../../components/Post/Post";
import PostsForm from "../../components/PostsForm/PostsForm";
import FullPost from "../../components/FullPost/FullPost";
import {POSTS_URL, BASE_URL, USER_URL} from '../../constants';
import axios from 'axios';


const Blog = () => {
    console.log("[Blog] render");

    const [posts, setPosts] = useState([]);
    const [postsFormShown, setPostsFormShown] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);

    const [error, setError] = useState(null);

    // const url = 'https://jsonplaceholder.typicode.com/posts?_limit=2';
    const togglePostsForm = () => {
        setPostsFormShown(!postsFormShown);
    }

    // const makeRequest = async url =>{
    //     const res = await fetch(url);
    //     if (res.ok) {
    //         return res.json();
    //     }
    //     throw new Error("Something went wrong in makeRequest")
    // }


    useEffect(() => {
        const fetchData = async () => {
            try {

                const postsResponse = await axios.get(POSTS_URL);
                console.log("[Blog] useeffect postsResponse", postsResponse)
                const posts = postsResponse.data;
                const promises = posts.map(async (post) =>{
                    const userUrl = USER_URL+post.userId;
                    const userResponse = await axios.get(userUrl);
                    console.log("[Blog] userResponse",userResponse)
                    return {...post, author: userResponse.data.name};
                })
                // console.log("[Blog] useeffect promises", promises)
                
                const updatedPosts = await Promise.all(promises)
                // console.log("[Blog] useeffect updatedPosts", updatedPosts)
                setPosts(updatedPosts);   
            } catch (e) {
                // console.log("[Blog] useeffect error", e.message)
            }
        }

        fetchData().catch(e => {setError(e)});
        // console.log("[Blog] component mounted and updated");
    }, []);

    return (
        <>
            <section className="Posts">
                {posts.map(post => {
                    return (
                        <Post
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            clicked = {() => {setSelectedPostId(post.id)}}
                        />
                    )
                })}
            </section>

            <section>
          <FullPost 
              id={selectedPostId}
          />
        </section>
                <button className="ToggleButton" onClick={togglePostsForm}>New Post</button>
                {postsFormShown ? 
                <PostsForm/> :null
                }

        </>
    )
}






















// class Blog extends Component {
//     state = {
//         posts: [
//             {title: "Test Post", author: "John Doe", id: '1'},
//             {title: "Привет Мир", author: "Вася Пупкин", id: '2'},
//             {title: "Hello world", author: "Jack Black", id: '3'},
//         ],
//         postsFormShown: false
//     }
//
//     togglePostsForm = () => {
//         this.setState({postsFormShown: !this.state.postsFormShown});
//     }
//
//     constructor(props) {
//         super(props);
//         console.log("[Blog] constructor");
//         console.log("[Blog] State exists: " + (this.state.posts.length > 0));
//     }
//
//     componentDidMount() {
//         console.log("[Blog] didMount");
//     }
//
//     render() {
//         console.log("[Blog] render");
//
//         let postsForm = null;
//
//         if(this.state.postsFormShown) {
//             postsForm = (
//                 <section className="NewPost">
//                     <p>new post form will be here</p>
//                 </section>
//             )
//         }
//         return (
//             <>
//                 <section className="Posts">
//                     {this.state.posts.map(post => {
//                         return (
//                             <Post
//                                 key={post.id}
//                                 title={post.title}
//                                 author={post.author}
//                             />
//                         )
//                     })}
//                 </section>
//                 <button className="ToggleButton" onClick={this.togglePostsForm}>New post</button>
//                 {postsForm}
//             </>
//         )
//     }
// }

export default Blog;
