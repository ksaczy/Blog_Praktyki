import './index.scss';
import Navbar from './Navbar/Navbar';
import Home from './Pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Create from "./Pages/Create";
import BlogDetails from "./Blog/BlogDetails";
import NotFound from "./Pages/NotFound";
import Galeria from "./Pages/Galeria";
import Team from "./Pages/Team";
import AddDrone from "./Pages/AddDrone";
import Login from "./Pages/Authentication/Login"
import Register from "./Pages/Authentication/Register";
import Profile from "./Pages/Authentication/Profile";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import {Toaster} from "react-hot-toast";

function App() {
    return (
        <AuthProvider>
            <Toaster />
            <Router>
                <div className="App">
                    <Navbar />
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Home />} />

                            <Route path="/create" element={<Create />} />


                            <Route path="/blogs/:id" element={<BlogDetails />} />

                            <Route path="/galeria" element={<ProtectedRoute><Galeria /></ProtectedRoute>} />

                            <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />

                            <Route path="/add-drone" element={<ProtectedRoute><AddDrone /></ProtectedRoute>} />

                            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />


                            <Route path="/login" element={<Login />} />

                            <Route path="/register" element={<Register />} />

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;