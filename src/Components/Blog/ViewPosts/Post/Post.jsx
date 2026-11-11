/* eslint-disable react/prop-types */
import { useState } from "react";
import notFound from "../../../../Assets/img/notFound.png"
import "./post.css"

const PLACEHOLDER = "https://picsum.photos/seed/itnoticias/1200/600";
const Post = ({ id, title, summary, picture, image, photo, url, content, category }) => {
    const [imgSrc, setImgSrc] = useState(picture || image || photo || url || PLACEHOLDER);

    const handleImageError = () => {
        if (imgSrc !== PLACEHOLDER) setImgSrc(PLACEHOLDER);
        else setImgSrc(notFound);
    };


    return (
        <div key={id} className="containerPost">
            <header>
                <h1 className="postTitle">{ title }</h1>
                <h4 className="postSummary">{ summary }</h4>
            </header>
            
            <picture className="postPicture">
                <img src={ imgSrc } onError={handleImageError} alt={`${title}-img`} />
            </picture>
            
            <hr />
            
            <div className="postContent">
                <div dangerouslySetInnerHTML={{ __html: content }} className="postText"></div>
            </div>
            
            <div className="postCategory">
                <h2>Categoria: <span>{ category }</span></h2>
            </div>
        </div>
    )
}

export default Post