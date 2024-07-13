import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import notFound from "../../../Assets/img/notFound.png"
import { useState } from 'react';
import "./blogsPost.css"


const BlogsPost = ({ id, title, summary, picture }) => {  
    const [imgSrc, setImgSrc] = useState(picture);

    const handleImageError = () => {
        setImgSrc(notFound);
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