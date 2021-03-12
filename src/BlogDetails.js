import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch("http://localhost:8000/blogs/" + id);
    const history = useHistory();
    const handleClick = (id) => {
        fetch('http://localhost:8000/blogs/' + id,{
            method : 'DELETE'
        }).then((response)=>{
            if(response.ok){
                history.push('/')
            }
        })
    } 

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written By {blog.author}</p>
                    <div>{blog.body}</div>
                    <button className='button' onClick={()=>handleClick(blog.id)}>Delete</button>
                </article>
            )}
        </div>
    );
};

export default BlogDetails;
