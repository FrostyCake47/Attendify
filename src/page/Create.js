import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsPending(true);

        const currentDate = new Date();
        const date = currentDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        });
          
          // Format time (hh:mm am/pm)
        const time = currentDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        const blog = {title, body, date, time};
        console.log(blog);

        fetch("http://localhost:8000/blogs/", {
            method : "POST",
            headers :{"Content-Type" : "application/json"},
            body : JSON.stringify(blog)
        }).then(() => {
            console.log("Blog succesfully added");
            setIsPending(false);
            history.push('/');
        })
    }

    return ( 
        <div className="create">
            <h2>Create new Blog</h2>
            <form className="create-blog" onSubmit={handleSubmit}>
                <label className="title">Title</label>
                <input type="text" required value={title} onChange={(e) => {setTitle(e.target.value)}}/>

                <label className="body">Body</label>
                <textarea rows="7" value={body} onChange={(e) => {setBody(e.target.value)}}></textarea>

                {!isPending && (<button className="add-blog">Add Blog</button>)}
                {isPending && (<button className="add-blog" disabled>Adding Blog</button>)}
            </form>
        </div>
    );
}
 
export default Create;