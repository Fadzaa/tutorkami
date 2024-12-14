import {AuthForm} from "@/components/form/AuthForm.jsx";
import {Link} from "react-router-dom";

export function RegisterPage() {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="
            flex flex-col items-center w-full lg:w-[28%] lg:border-2 lg:border-[#E2E2E2] rounded-lg p-6">
                <h1 className="mb-1 font-semibold text-xl">Register Account</h1>
                <p className="mb-6 font-light text-xs text-[#7A7A7A]">Lets start with register your account</p>
                <AuthForm authType="register"/>
                <p className="mt-5 text-xs font-light">Already have an account? <Link to={"/login"} className="font-bold cursor-pointer">Sign In</Link>
                </p>
            </div>
        </div>
    )
}
