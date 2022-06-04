import React, {useEffect, useState} from 'react';
import './Blog.css';
import Post from "../../components/Post/Post";
import PostsForm from "../../components/PostsForm/PostsForm";


const Blog = () => {
    console.log("[Blog] render");

    const [posts, setPosts] = useState([]);
    const [postsFormShown, setPostsFormShown] = useState(false);

    const [error, setError] = useState(null);

    const url = 'https://jsonplaceholder.typicode.com/posts?_limit=8';
    const togglePostsForm = () => {
        setPostsFormShown(!postsFormShown);
    }

    useEffect(() => {
        console.log("UseEffect")
        const fetchData = async () => {
            const response = await fetch(url);

            if(response.ok) {
                const posts = await response.json();
                setPosts(posts);
            }
        }

        fetchData().catch(e => {setError(e)});
        console.log("[Blog] component mounted and updated");
    }, []);

    return (
        <>
            <section className="Posts">
                {posts.map(post => {
                    return (
                        <Post
                            key={post.id}
                            title={post.title}
                            body={post.body}
                        />
                    )
                })}
            </section>
            <button className="ToggleButton" onClick={togglePostsForm}>New post</button>
            {postsFormShown ?
                <PostsForm/> : null
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
