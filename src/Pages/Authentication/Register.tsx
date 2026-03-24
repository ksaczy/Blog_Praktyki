import { InputField } from "../InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {RegisterData, RegisterSchema} from "./User";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import {Link, Navigate} from "react-router-dom";
import { useAuth } from "../../AuthContext";
import "../AddDrone.scss";
import "./Auth.scss";
import toast from "react-hot-toast";

const Register = () => {
    const { currentUser } = useAuth();

    const { register, handleSubmit, setError, reset, formState: { errors, isSubmitting } } = useForm<RegisterData>({
        resolver: zodResolver(RegisterSchema),
        mode: "onChange",
    });

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
                <InputField
                    name="password"
                    label="Password: "
                    error={errors.password}
                    register={register("password")}
                    type="password"
                />
                <InputField
                    name="passwordRepeat"
                    label="Repeat password: "
                    error={errors.passwordRepeat}
                    register={register("passwordRepeat")}
                    type="password"
                />

                <button disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register"}
                </button>
            </form>

            <div className="information">
                {errors.root && <p className="error">{errors.root.message}</p>}
                <p>Already have an account? <Link to="/login">Click here</Link></p>
            </div>
        </div>
    );
};

export default Register;