import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {RouterProvider} from "react-router-dom";
import { routers } from "./routes"



const queryClient = new QueryClient();
function App() {

  return (
    <>
        <QueryClientProvider client={queryClient}>
            <main className={'font-Urbanist'}>
                <RouterProvider router={routers}/>
            </main>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </>
  )
}

export default App
