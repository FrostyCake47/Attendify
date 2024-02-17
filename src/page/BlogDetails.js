import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../services/useFetch";

const BlogDetails = () => {
    const {id} = useParams();
    const {data: blog} = useFetch("http://localhost:8000/blogs/" + id);
    return ( 
        <div>
            {blog && (
                <article className="blog-details">
                    <h2 className="blog-title">{blog.title}</h2>
                    <p className="date-time">{blog.date}   -  {blog.time}</p>
                    <p className="blog-body">{blog.body}</p>
                </article>
            )}
            
        </div>
        
    );
}
 
export default BlogDetails;