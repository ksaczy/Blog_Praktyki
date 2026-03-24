import {InputField} from "../InputField"
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {User, UserSchema} from "./User";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../FirebaseConfig";
import {Link} from "react-router-dom";
import "../AddDrone.scss";
import "./Auth.scss";
import {useAuth} from "../../AuthContext";


const Login = () =>{
    const {register, handleSubmit, setError, reset, formState: { errors, isSubmitting } } = useForm<User>({
        resolver: zodResolver(UserSchema),
        mode: "onChange",
    });

    const { currentUser } = useAuth();

    const onSubmit: SubmitHandler<User> = async (data) => {
        try{
            await signInWithEmailAndPassword(auth, data.email, data.password);
            reset();
        }
        catch(err:any){
            setError("root", {message:"Invalid email or password"});
        }

    };

    return(
        <div className="form">
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    name="email"
                    label="Email: "
                    error={errors.email}
                    register={register("email")}
                    type="email"
                />
                <InputField
                    name="password"
                    label="Password: "
                    error={errors.password}
                    register={register("password")}
                    type="password"
                />
                <button disabled={isSubmitting}>{isSubmitting? "Loading..." : "Login"}</button>
            </form>
            <div className="information">
                {errors.root &&  <p className="error">{errors.root.message}</p>}
                {currentUser && <h3>You are logged in as: {currentUser.email}</h3>}
                <p>No account? <Link to="/register">Click here</Link></p>
            </div>
        </div>
    )
}

export default Login;