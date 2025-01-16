import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {RouterProvider} from "react-router-dom";
import { routers } from "./routes"
import {useEffect} from "react";
import store from '@/utils/global/store/store.js';
import {langHandler} from "@/utils/langHandler.js";
import {LoadingProvider} from "@/utils/global/LoadingProvider.jsx";
import {GlobalLoading} from "@/utils/global/GlobalLoading.jsx";
import {Provider} from "react-redux";



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
