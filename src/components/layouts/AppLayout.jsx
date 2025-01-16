import {Header} from "@/components/header/Header.jsx";
import {Footer} from "@/components/footer/Footer.jsx";
import {Outlet, ScrollRestoration} from "react-router-dom";
import {Toaster} from "@/components/ui/toaster.jsx";
import {GlobalLoading} from "@/utils/global/GlobalLoading.jsx";


export default function AppLayout()  {
    return (
        <>
            <Header isLandingPage={true}/>
            <main>
                <Outlet/>
                <ScrollRestoration/>
            </main>
            <Toaster />
            <Footer/>
        </>
    )
}