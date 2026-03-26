import {InputField} from "../InputField"
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginData, LoginSchema} from "./User";
import {signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import {auth, googleAuth} from "../../FirebaseConfig";
import {Link, Navigate} from "react-router-dom";
import "../AddDrone.scss";
import "./Auth.scss";
import {useAuth} from "../../AuthContext";
import toast from "react-hot-toast";
import {useEffect, useState} from "react";


const Login = () =>{
    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

    const {register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<LoginData>({
        resolver: zodResolver(LoginSchema),
        mode: "onChange",
    });

    useEffect(() => {
        if (currentUser) {
            toast.error("User is logged in", { id: "already-logged" });
        }
    }, []);

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

    const onGoogleSignIn = async ()=>{
        try {
            await signInWithPopup(auth, googleAuth);
            toast.success("Login successful", {id: "login"});
        }
        catch(err:any){
            setError("root", {message:"Something went wrong logging in with google"});
        }
    }

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
                <div className="input-with-button">
                    <InputField
                        name="password"
                        label="Password: "
                        error={errors.password}
                        register={register("password")}
                        type={passwordVisibility ? "text" : "password"}
                    />
                    <button type="button" onClick={()=>setPasswordVisibility(!passwordVisibility)}>
                        { passwordVisibility ? "hide" : "show"}
                    </button>
                </div>
                <button disabled={isSubmitting}>{isSubmitting? "Loading..." : "Login"}</button>
                <p>
                    <button className="google-sign-in" type="button" onClick={()=>onGoogleSignIn()}>
                        Sign in with google
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="google logo"/>
                    </button>
                </p>
            </form>
            <div className="information">
                {errors.root &&  <p className="error">{errors.root.message}</p>}
                <p>No account? <Link to="/register">Click here</Link></p>
            </div>
        </div>
    )
}

export default Login;