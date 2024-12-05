import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";

export function AuthForm({authType}) {
    const {
        register,
        handleSubmit,
        formState,
    } = useForm();
    const {errors} = formState;

    function submitData() {
        console.log("Data submitted");
    }

    return (
        <form className="w-full h-full" noValidate onSubmit={handleSubmit(submitData)}>

            <label htmlFor="email">Email</label>
            <Input
                id="email"
                placeholder="Email"
                type="email"
                className="mt-3"
                {...register("email", {required: "Email is required"})}
            />
            <p className="text-red-500 text-sm mt-2">{errors.email?.message}</p>

            <div className="mt-6"></div>

            <label htmlFor="password">Password</label>
            <Input
                id="password"
                placeholder="Password"
                type="password"
                className="mt-3"
                {...register("password", {required: "Password is required"})}
            />
            <p className="text-red-500 text-sm mt-2">{errors.password?.message}</p>

            <Button className="mt-8 w-full" type="submit">{authType === "login" ? "Sign in" : "Sign up"}</Button>
            <Button className="mt-6 w-full bg-white text-[#646464] border-2 border-[#646464]">Continue with Google</Button>
        </form>
    )
}