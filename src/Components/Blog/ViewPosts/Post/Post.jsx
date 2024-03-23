/* eslint-disable react/prop-types */
import "./post.css"


const Post = ({ id, title, summary, picture, content }) => {
    return (
        <div key={id} className="containerPost">
            <header>
                <h1 className="postTitle">{ title }</h1>
                <h4 className="postSummary">{ summary }</h4>
            </header>
            
            <picture className="postPicture">
                <img src={ picture } alt={`${title}-img`} />
            </picture>
            
            <hr />
            
            <div className="postContent">
                <div dangerouslySetInnerHTML={{ __html: content }} className="postText"></div>
            </div>
        </div>
    )
}


export default Post