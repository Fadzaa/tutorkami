import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {RouterProvider} from "react-router-dom";
import { routers } from "./routes"
import {useEffect} from "react";
import {langHandler} from "@/lib/langHandler.js";



const queryClient = new QueryClient();
function App() {

    useEffect(() => {
        localStorage.getItem('lang') || langHandler.set('id');
    })

  return (
    <>
        <QueryClientProvider client={queryClient}>
            <main className={'font-Urbanist'}>
                <RouterProvider router={routers}/>
            </main>
            {/*<ReactQueryDevtools initialIsOpen={false} />*/}
        </QueryClientProvider>
    </>
  )
}

export default App
