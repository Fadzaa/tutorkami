import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";
import {useMutation} from "@tanstack/react-query";
import {authAPI} from "@/api/auth.js";
import { Loader2 } from "lucide-react"
import {useToast} from "@/hooks/use-toast.js";
import {tokenHandler} from "@/lib/tokenHandler.js";
import {Link, useNavigate} from "react-router-dom";
import {signInWithGooglePopup} from "@/lib/firebase.js";
import {FcGoogle} from "react-icons/fc";
import {FaEyeSlash} from "react-icons/fa";
import {useState} from "react";
import {IoEyeSharp} from "react-icons/io5";

export function AuthForm({authType}) {
    const {
        register,
        handleSubmit,
        formState,
        getValues,
        setValue
    } = useForm();
    const {errors} = formState;
    const { toast } = useToast()
    const navigate = useNavigate();


    const [visible, setVisible] = useState(false)
    const {mutate, isPending, } = useMutation({

        mutationFn: async (body) => {

            return authType === "login" || body.google === true ? await authAPI.login(body) : await authAPI.register(body)
        },

        onSuccess: (response, variables, context) => {
            toast({
                title: authType === "login" ? "Login Success" : "Register Success",
                description: authType === "login" ? "You have successfully login" : "You have successfully register",
            })
            console.log("token check:",response.data.token)
            tokenHandler.set(response.data.token)
            navigate('/')
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
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();


        mutate({
            'google_id': response.user.uid,
            'name': response.user.displayName,
            'email': response.user.email,
            'image': response.user.photoURL,
            'google':true
        })
    }
    function submitData() {


        mutate({...getValues(),'google':false})
        console.log("Data submitted");
        console.log("isLoading status: " + isPending);

    }

    const handlePassword = () => {
        setVisible(!visible)
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
                type={visible ? "text" : "password"}
                className="mt-3"
                rightAddon={

                visible === true ?<IoEyeSharp onClick={handlePassword} />:<FaEyeSlash  onClick={handlePassword}/>

                }
                {...register("password", {required: "Password is required"})}
            />
            <p className="text-red-500 text-sm mt-2">{errors.password?.message}</p>

            <Button className="mt-8 w-full" type="submit">
                {isPending && <Loader2 className="animate-spin mr-2 text-white" size={20} />}
                {authType === "login" ? "Sign in" : "Sign up"}
            </Button>




                <Button type={'button'} onClick={logGoogleUser} className="hover:bg-primary hover:border-0 hover:text-white mt-6 w-full bg-white text-[#646464] border-2 border-[#646464]">
                    <FcGoogle  className={'w-full'}/>
                    Continue with Google

                </Button>


        </form>
    )
}