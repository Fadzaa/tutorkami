import {Header} from "@/components/header/Header.jsx";
import {Footer} from "@/components/footer/Footer.jsx";
import {Outlet, ScrollRestoration} from "react-router-dom";


export default function ToolsLayout()  {
    return (
        <div className={'h-[100vh]'}>
            <Header/>
            <main>
                <Outlet/>
                <ScrollRestoration/>
            </main>
        </div>
    )
}