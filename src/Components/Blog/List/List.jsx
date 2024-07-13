
import { Fragment, memo } from 'react'
import BlogPost from "../BlogsPost/BlogsPost.jsx"
import PropTypes from 'prop-types';
import { useAuthContext } from '../../../Context/AuthProvider.jsx';



const List = memo(function List({ blogEntries }){
    const { categorySelected } = useAuthContext();

	const filteredEntries = categorySelected
		? blogEntries.filter((post) => post.category === categorySelected)
		: blogEntries;
    return (
        <Fragment>
            {
            filteredEntries.map(data => {
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
            })
            }
        </Fragment>
    )
}, (prevProps, nextProps) => {
    return prevProps.blogEntries.length === nextProps.blogEntries.length;
});


List.propTypes = {
    blogEntries: PropTypes.arrayOf(PropTypes.object).isRequired
};


export default List