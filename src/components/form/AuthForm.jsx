import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";
import {useMutation} from "@tanstack/react-query";
import {authAPI} from "@/api/auth.js";
import { Loader2 } from "lucide-react"
import {useToast} from "@/hooks/use-toast.js";
import {tokenHandler} from "@/utils/tokenHandler.js";
import {Link} from "react-router-dom";

export function AuthForm({authType}) {
    const {
        register,
        handleSubmit,
        formState,
        getValues
    } = useForm();
    const {errors} = formState;

    const { toast } = useToast()

    const {mutate, isPending } = useMutation({

        mutationFn: async () => {
            return authType === "login" ? await authAPI.login(getValues()) : await authAPI.register(getValues())
        },

        onSuccess: (data, variables, context) => {
            toast({
                title: authType === "login" ? "Login Success" : "Register Success",
                description: authType === "login" ? "You have successfully login" : "You have successfully register",
            })

            tokenHandler.set(data.token)
        },

        onError: (error, variables, context) => {
            console.log("onError")
            console.log(error)

            toast({
                variant: "destructive",
                title: authType === "login" ? "Login Failed" : "Register Failed",
                description: authType === "login" ? "Invalid Credentials" : "Failed to register",
            })
        },

        onMutate: async () => {

        },

    })

    function submitData() {
        mutate();
        console.log("Data submitted");
        console.log("isLoading status: " + isPending);

    }

    return (
        <form className="w-full h-full" noValidate onSubmit={handleSubmit(submitData)}>

            {authType === "register" && (
                <>
                    <label htmlFor="name">Name</label>
                    <Input
                        id="name"
                        placeholder="Name"
                        type="name"
                        className="mt-3"
                        {...register("name", {required: "Name is required"})}
                    />
                    <p className="text-red-500 text-sm mt-2">{errors.name?.message}</p>

                    <div className="mt-6"></div>
                </>
            )}

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

            <Button className="mt-8 w-full" type="submit">
                {isPending && <Loader2 className="animate-spin mr-2 text-white" size={20} />}
                {authType === "login" ? "Sign in" : "Sign up"}
            </Button>
            <Button className="mt-6 w-full bg-white text-[#646464] border-2 border-[#646464]">Continue with Google</Button>
        </form>
    )
}