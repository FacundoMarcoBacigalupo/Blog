
import { Fragment, memo } from 'react'
import BlogPost from "../BlogsPost/BlogsPost.jsx"
import PropTypes from 'prop-types';



const List = memo(function List({ blogEntries }){
    return (
        <Fragment>
            {
            blogEntries.map(data => {
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