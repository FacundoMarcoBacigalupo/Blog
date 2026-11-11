import { Link } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import notFound from "../../../Assets/img/notFound.png"
import "./blogsPost.css"

const PLACEHOLDER = "https://picsum.photos/seed/itnoticias/800/450";
const BlogsPost = ({ id, title, summary, picture, image, photo, url }) => {  
    const [imgSrc, setImgSrc] = useState(picture || image || photo || url || PLACEHOLDER);

    const handleImageError = () => {
        if (imgSrc !== PLACEHOLDER) setImgSrc(PLACEHOLDER);
        else setImgSrc(notFound);
    };

    return (
        <section className="card">
            <header id="cardHeader">
                <img src={imgSrc} onError={handleImageError} alt={`${title}-img`} />
            </header>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="card-description">
                    {`${summary.substring(0, 100)}.`}
                </p>
                <Link className="btn" to={`/post/${id}`}>Leer mas</Link>
            </div>
        </section>
    );
};

BlogsPost.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
};

export default BlogsPost