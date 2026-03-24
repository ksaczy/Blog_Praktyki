import './index.scss';
import Navbar from './Navbar/Navbar';
import Home from './Pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from "./Pages/Create";
import BlogDetails from "./Blog/BlogDetails";
import NotFound from "./Pages/NotFound";
import Galeria from "./Pages/Galeria";
import Team from "./Pages/Team";
import AddDrone from "./Pages/AddDrone";
import Login from "./Pages/Authentication/Login"
import Register from "./Pages/Authentication/Register";
import {AuthProvider} from "./AuthContext";

function App() {
    return (
        <AuthProvider>
        <Router>
            <div className="App">
                <Navbar />
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/create">
                            <Create />
                        </Route>
                        <Route path="/blogs/:id">
                            <BlogDetails />
                        </Route>
                        <Route path="/galeria">
                            <Galeria />
                        </Route>
                        <Route path="/team">
                            <Team />
                        </Route>
                        <Route path="/add-drone">
                            <AddDrone />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
        </AuthProvider>
    );
}

export default App;