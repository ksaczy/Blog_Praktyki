import {InputField} from "../InputField"
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginData, LoginSchema} from "./User";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../FirebaseConfig";
import {Link, Navigate} from "react-router-dom";
import "../AddDrone.scss";
import "./Auth.scss";
import {useAuth} from "../../AuthContext";
import toast from "react-hot-toast";


const Login = () =>{
    const {register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<LoginData>({
        resolver: zodResolver(LoginSchema),
        mode: "onChange",
    });

    const { currentUser } = useAuth();

    const onSubmit: SubmitHandler<LoginData> = async (data) => {
        try{
            await signInWithEmailAndPassword(auth, data.email, data.password);
            toast.success("Login successful");
        }
        catch(err:any){
            setError("root", {message:"Invalid email or password"});
        }

    };

    if(currentUser){
        return <Navigate to="/" />;
    }

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
                <p>No account? <Link to="/register">Click here</Link></p>
            </div>
        </div>
    )
}

export default Login;