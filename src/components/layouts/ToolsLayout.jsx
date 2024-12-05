import {Navbar} from "@/components/navbar/Navbar.jsx";
import {Footer} from "@/components/footer/Footer.jsx";
import {Outlet, ScrollRestoration} from "react-router-dom";


export default function ToolsLayout()  {
    return (
        <>
            <Navbar/>
            <main>
                <Outlet/>
                <ScrollRestoration/>
            </main>
        </>
    )
}