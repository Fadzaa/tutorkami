import {Header} from "@/components/landing/Header.jsx";
import {Footer} from "@/components/landing/Footer.jsx";
import {Outlet, ScrollRestoration} from "react-router-dom";
import {Toaster} from "@/components/ui/toaster.jsx";


export default function StorageLayout()  {
    return (
        <>
            <Header/>
            <main>
                <Outlet/>
                <ScrollRestoration/>
            </main>
        </>
    )
}