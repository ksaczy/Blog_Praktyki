import { InputField } from "../InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterData, RegisterSchema} from "./User";
import {createUserWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import {auth, googleAuth} from "../../FirebaseConfig";
import {Link, Navigate} from "react-router-dom";
import { useAuth } from "../../AuthContext";
import "../AddDrone.scss";
import "./Auth.scss";
import toast from "react-hot-toast";
import {useState} from "react";

const Register = () => {
    const { currentUser } = useAuth();

    const { register, handleSubmit, setError, reset, formState: { errors, isSubmitting } } = useForm<RegisterData>({
        resolver: zodResolver(RegisterSchema),
        mode: "onChange",
    });

    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
    const [repeatPasswordVisibility, setRepeatPasswordVisibility] = useState<boolean>(false);

    const onSubmit: SubmitHandler<RegisterData> = async (data) => {
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password);
            reset();
            toast.success("Registered successfully");
        } catch (err: any) {
            if (err.code === "auth/email-already-in-use") {
                setError("email", { message: "This email is already in use" });
            } else {
                setError("root", { message: err.message });
            }
        }
    };

    const onGoogleSignIn = async ()=>{
        try {
            await signInWithPopup(auth, googleAuth);
            toast.success("Login successful");
        }
        catch(err:any){
            setError("root", {message:"Something went wrong logging in with google"});
        }
    }

    if(currentUser)return <Navigate to="/" />;

    return (
        <div className="form">
            <h1>Register</h1>
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
                <div className="input-with-button">
                    <InputField
                        name="passwordRepeat"
                        label="Repeat password: "
                        error={errors.passwordRepeat}
                        register={register("passwordRepeat")}
                        type={repeatPasswordVisibility ? "text" : "password"}
                    />
                    <button type="button" onClick={()=>setRepeatPasswordVisibility(!repeatPasswordVisibility)}>
                        { repeatPasswordVisibility ? "hide" : "show"}
                    </button>
                </div>

                <button disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register"}
                </button>

                <p>
                    <button className="google-sign-in" type="button" onClick={()=>onGoogleSignIn()}>
                        Sign up with google
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="google logo"/>
                    </button>
                </p>
            </form>

            <div className="information">
                {errors.root && <p className="error">{errors.root.message}</p>}
                <p>Already have an account? <Link to="/login">Click here</Link></p>
            </div>
        </div>
    );
};

export default Register;