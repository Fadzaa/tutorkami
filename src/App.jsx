import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {RouterProvider} from "react-router-dom";
import { routers } from "./routes"
import {useEffect} from "react";
import store from '@/lib/utils/global/store/store.js';
import {LoadingProvider} from "@/lib/utils/global/LoadingProvider.jsx";
import {GlobalLoading} from "@/lib/utils/global/GlobalLoading.jsx";
import {Provider} from "react-redux";
import {langHandler} from "@/lib/langHandler.js";



const queryClient = new QueryClient();
function App() {

    useEffect(() => {
        localStorage.getItem('lang') || langHandler.set('id');
    })

  return (
    <>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <main className={'font-Urbanist'}>
                    <LoadingProvider>
                        <GlobalLoading/>
                        <RouterProvider router={routers}/>
                    </LoadingProvider>
                </main>
                {/*<ReactQueryDevtools initialIsOpen={false} />*/}
            </QueryClientProvider>
        </Provider>
    </>
  )
}

export default App
