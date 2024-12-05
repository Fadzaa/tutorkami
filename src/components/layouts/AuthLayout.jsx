import {Outlet, ScrollRestoration} from "react-router-dom";


export default function AuthLayout()  {
    return (
        <>
            <main>
                <Outlet/>
                <ScrollRestoration/>
            </main>
        </>
    )
}