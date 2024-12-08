import {Header} from "@/components/header/Header.jsx";
import {Footer} from "@/components/footer/Footer.jsx";
import {Outlet, ScrollRestoration} from "react-router-dom";
import {Toaster} from "@/components/ui/toaster.jsx";


export default function AppLayout()  {
    return (
        <>
            <Header/>
            <main>
                <Outlet/>
                <ScrollRestoration/>
            </main>
            <Toaster />
            <Footer/>
        </>
    )
}