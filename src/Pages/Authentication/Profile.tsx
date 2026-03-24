import "../AddDrone.scss"
import {Link} from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Profile = () =>{
    const {logout, currentUser} = useAuth();

    return(
        <div className="profile">
            <h1>Your Profile</h1>
            <h2>{currentUser?.email}</h2>
            <Link to="/" onClick={()=>logout()}>Logout</Link>
        </div>
    )
}
export default Profile;