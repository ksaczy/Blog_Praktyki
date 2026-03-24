import { InputField } from "../InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, UserSchema } from "./User";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import "../AddDrone.scss";
import "./Auth.scss";

const Register = () => {
    const { currentUser } = useAuth();

    const { register, handleSubmit, setError, reset, formState: { errors, isSubmitting } } = useForm<User>({
        resolver: zodResolver(UserSchema),
        mode: "onChange",
    });

    const onSubmit: SubmitHandler<User> = async (data) => {
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password);
            reset();
        } catch (err: any) {
            if (err.code === "auth/email-already-in-use") {
                setError("email", { message: "This email is already in use" });
            } else {
                setError("root", { message: err.message });
            }
        }
    };

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

                <button disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register"}
                </button>
            </form>

            <div className="information">
                {errors.root && <p className="error">{errors.root.message}</p>}
                <p>Already have an account? <Link to="/login">Click here</Link></p>
                {currentUser && <h3>You are logged in as: {currentUser.email}</h3>}
            </div>
        </div>
    );
};

export default Register;