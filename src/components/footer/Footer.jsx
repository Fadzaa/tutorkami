
export function Footer () {
    return (
        <div className="w-full flex flex-col items-center py-5 px-8 border-t-2 border-gray-200 gap-4">
            <img src="/logo_web.svg" className={'w-32'} alt=""/>
            <p className={'w-4/12 line text-[#64748B] text-center text-balance'}>TutorKami adalah platform belajar berbasis AI yang bikin proses belajar jadi lebih gampang, seru, dan
                terarah. Dengan alat seperti Roadmap Study AI hingga Generative LMS AI, kami siap membantu kamu belajar
                lebih efisien!</p>
            <div className="flex gap-4">
                <a href="/" className="text-black font-bold">SITE</a>
                <a href="/" className="text-black">Home</a>
                <a href="/" className="text-black">Tools</a>
                <a href="/" className="text-black">Dashboard</a>
                <a href="/login" className="text-black">Sign in</a>
            </div>
            <div className="flex gap-4">
                <a href="/" className="text-black font-bold">TOOLS</a>
                <a href="/tools/generative-roadmap" className="text-black">Roadmap Study AI</a>
                <a href="/tools/generative-material" className="text-black">Generative Study Materials AI</a>
                <a href="/tools/generative-list-question" className="text-black">List Questions AI</a>
                <a href="/tools/generative-lms" className="text-black">Generative LMS AI</a>
            </div>
            <h1 className="font-semibold mt-5">© 2024 Rdo Hero. All rights reserved.</h1>

        </div>
    )
}
