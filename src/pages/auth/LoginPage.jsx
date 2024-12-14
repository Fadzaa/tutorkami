import {AuthForm} from "@/components/form/AuthForm.jsx";
import {Link} from "react-router-dom";

export function LoginPage() {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="
            flex flex-col items-center w-full lg:w-[28%] lg:border-2 lg:border-[#E2E2E2] rounded-lg p-6">
                <h1 className="mb-1 font-semibold text-xl">Welcome Back</h1>
                <p className="mb-6 font-light text-xs text-[#7A7A7A]">Please enter your account to sign in.</p>
                <AuthForm authType="login"/>
                <p className="mt-5 text-xs font-light">Don't have account? <Link to={"/register"} ><span className="font-bold cursor-pointer">Sign Up</span></Link></p>
            </div>
        </div>
    )
}
