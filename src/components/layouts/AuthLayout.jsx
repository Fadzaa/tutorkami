import {Outlet, ScrollRestoration} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"

export default function AuthLayout()  {
    return (
        <body>
            <main>
                <Outlet/>
                <ScrollRestoration/>
            </main>
            <Toaster />
        </body>
    )
}