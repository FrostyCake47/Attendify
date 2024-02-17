import { useEffect, useState } from "react";
import BlogLists from "../components/bloglists";
import useFetch from "../services/useFetch";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const Home = () => {
    const [blogs, setBlogs] = useState(null);
    const {data, isPending, error} = useFetch("http://localhost:8000/blogs");
    const history = useHistory();

    useEffect(() => {
        if (data) {
            setBlogs(data);
        }
    }, [data]);

    const handleDelete = (id) => {
        const newBlogs = blogs.filter(blog => blog.id !== id);
        setBlogs(newBlogs);

        fetch("http://localhost:8000/blogs/"+ id, {
            method: 'DELETE'
        }).then(()=>{
            history.go(0);
        })
    }

    return ( 
        <div className="home">
            {error && <p className="error">{error.msg}</p>}
            {blogs && <BlogLists blogs={blogs} handleDelete={handleDelete}/>}
        </div>
     );
}
 
export default Home;