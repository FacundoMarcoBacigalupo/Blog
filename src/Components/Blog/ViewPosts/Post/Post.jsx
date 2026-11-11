import { useState } from "react";
import notFound from "../../../../Assets/img/notFound.png"
import "./post.css"

const PLACEHOLDER = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80";
const Post = ({ id, title, summary, picture, image, photo, url, content, category }) => {
    const [imgSrc, setImgSrc] = useState(picture || image || photo || url || PLACEHOLDER);

    const handleImageError = () => {
        if (imgSrc !== PLACEHOLDER) setImgSrc(PLACEHOLDER);
        else setImgSrc(notFound);
    }

    return (
        <div key={id} className="containerPost">
            <header className="postHeader">
                <h1 className="postTitle">{ title }</h1>
                <h4 className="postSummary">{ summary }</h4>
            </header>
            
            <picture className="postPicture">
                <img src={ imgSrc } onError={handleImageError} alt={`${title}-img`} />
            </picture>
            
            <hr className="postDivider" />
            
            <div className="postContent">
                <div dangerouslySetInnerHTML={{ __html: content }} className="postText"></div>
            </div>
            
            {category && (
                <div className="postCategory">
                    <span>{ category }</span>
                </div>
            )}
        </div>
    )
}

export default Post