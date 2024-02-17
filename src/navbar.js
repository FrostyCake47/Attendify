import {Link} from 'react-router-dom';

const NavBar = () => {
    return ( 
        <nav className="navbar">
            <h1>Awesome Bloggie</h1>
            <div className="links">
                <Link className="link-btn" to="/">Home</Link>
                <Link className="link-btn" to="/create">New Blog</Link>
            </div>
        </nav>
    );
}
 
export default NavBar;