import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string | undefined;
    name: string;
    error?: FieldError | undefined;
    register: UseFormRegisterReturn;
}

export const InputField = ({label, error, register, name, ...props}: InputFieldProps) => {
    return (
        <div className="form-group">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                id={name}
                {...register}
                {...props}
            />
            {error && <span className="error">{error.message}</span>}
        </div>
    );
};