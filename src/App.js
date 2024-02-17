import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import NavBar from './navbar';
import Home from './page/Home';
import Attendence from './page/Attendence';
import Create from './page/Create';
import BlogDetails from './page/BlogDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/create">
              <Create/>
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails/>
            </Route>
            <Route path='/attendence'>
              <Attendence/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
