import "./Profile.scss"
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Profile = () =>{
    const {logout, currentUser} = useAuth();
    const navigate = useNavigate();
    return(
        <div className="profile">
            <h1>Your Profile</h1>
            <h2>{currentUser?.email}</h2>
            <Link to="/" onClick={async ()=>{
                await logout();
                navigate("/login");
                }}>Logout</Link>
        </div>
    )
}
export default Profile;