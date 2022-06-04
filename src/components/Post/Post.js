import React, {useEffect} from 'react';
import './Post.css';


const Post = React.memo(({title, body}) => {
    useEffect(() => {
        console.log("[Post] useEffected");
    }, [])
    console.log("[Post] render");
    return (
        <article className="Post">
            <h2>{title}</h2>
            <div className="Info">
                <p className="Author">{body}</p>
            </div>
        </article>
    )
})
// class Post extends Component {
//     constructor(props) {
//         super(props);
//         console.log("[Post] constructor")
//     }
//
//     shouldComponentUpdate(nextProps) {
//         console.log("[Post] ShouldUpdate");
//         return nextProps.title !== this.props.title ||
//             nextProps.body !== this.props.body;
//     }
//
//     componentDidMount() {
//         console.log("[Post] didMount");
//     }
//
//     render() {
//         console.log("[Post] render");
//         return (
//             <article className="Post">
//                 <h2 onClick={this.props.changeHandler}>{this.props.title}</h2>
//                 <div className="Info">
//                     <p className="Author">{this.props.body}</p>
//                 </div>
//             </article>
//         )
//     }
// }
//
export default Post;
