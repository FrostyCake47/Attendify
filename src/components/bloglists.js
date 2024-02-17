import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const BlogLists = (props) => {
    const blogs = props.blogs;
    const handleDelete = props.handleDelete;

    return (
        blogs.map((blog) => (
            <div className="blog-preview" key={blog.id}>
                <div className="title-body">
                    <Link to={`blogs/${blog.id}`}>
                        <h2 className="title">{blog.title}</h2>
                        <p className="body">{blog.body}</p>
                    </Link>
                </div>
                <div className="datetime">
                    <p className="date">{blog.date}</p>
                    <p className="time">{blog.time}</p>
                </div>
                <MdDelete className="delete-btn" onClick={() => handleDelete(blog.id)}/>
            </div>
            
        )
    ) );
}
 
export default BlogLists;