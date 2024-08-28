
import { Fragment, memo } from 'react'
import { useAuthContext } from '../../../Context/AuthProvider.jsx';
import BlogPost from "../BlogsPost/BlogsPost.jsx"
import PropTypes from 'prop-types';

const List = memo(function List({ blogEntries }){
    const { categorySelected } = useAuthContext();

	const filteredEntries = categorySelected
		? blogEntries.filter((post) => post.category === categorySelected)
		: blogEntries;
    return (
        <Fragment>
            { filteredEntries.map(data => {
                if(data && data.content){
                    return (
                        <article key={data.id}>
                            <BlogPost {...data} />
                        </article>
                    );
                }
                else{
                    return null;
                }
            }) }
        </Fragment>
    )
},
(prevProps, nextProps) => {
    return prevProps.blogEntries.length === nextProps.blogEntries.length;
});


List.propTypes = {
    blogEntries: PropTypes.arrayOf(PropTypes.object).isRequired
};


export default List