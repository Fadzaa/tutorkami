import {AuthForm} from "@/components/form/AuthForm.jsx";

export function RegisterPage() {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="
            flex flex-col items-center w-[28%] border-2 border-[#E2E2E2] rounded-lg p-6">
                <h1 className="mb-1 font-semibold text-xl">Register Account</h1>
                <p className="mb-6 font-light text-xs text-[#7A7A7A]">Lets start with register your account</p>
                <AuthForm authType="register"/>
                <p className="mt-5 text-xs font-light">Already have an account? <span className="font-bold cursor-pointer">Sign In</span>
                </p>
            </div>
        </div>
    )
}
