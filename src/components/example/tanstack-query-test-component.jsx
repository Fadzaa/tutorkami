import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Button} from "@/components/ui/button.jsx";
import {authAPI} from "@/api/auth.js";


async function fetchAllObject() {
    const res = await fetch(
        "https://api.restful-api.dev/objects"
    );

    return await res.json();
}
async function fetchSingleObjectById(id) {
    const res = await fetch(
        `https://api.restful-api.dev/objects/${id}`
    );

    return await res.json();
}

// async function postObject() {
//     try {
//         await axios.post("https://api.restful-api.dev/objects", {
//             "username": "User Test",
//             "email": "test@gmail.com",
//             "password": "test123"
//         });
//     } catch (e) {
//         throw e;
//     }
// }


export function TanstackQueryTestComponent() {
    // const fetchAll = useQuery({
    //     queryKey: ["FetchAllObjects"],
    //     queryFn: fetchAllObject,
    // });
    //
    // const fetchSingleObject = useQuery({
    //     queryKey: ["FetchSingleObjectById", 1],
    //     queryFn: ({ queryKey }) => fetchSingleObjectById(queryKey[1]),
    // });

    //
    //
    // if (fetchAll.isLoading) {
    //     return <div>loading...</div>
    // }
    //
    // if (fetchAll.isError) {
    //     return <div>Error</div>
    // }
    //
    // if (fetchSingleObject.isLoading) {
    //     return <div>loading...</div>
    // }
    //
    // if (fetchSingleObject.isError) {
    //     return <div>Error</div>
    // }


    return (
        <div>
            {/*<h1>Fetch All Object</h1>*/}
            {/*{fetchAll.data.map((object) => (*/}
            {/*    <div key={object.id}>{object.name}</div>*/}
            {/*))}*/}

            {/*<h1>Fetch Single Object by ID</h1>*/}
            {/*<div>{fetchSingleObject.data.name}</div>*/}

            <button className="bg-black text-white" onClick={() => {
                mutation.mutate()
            }}>Test Fetch Post</button>
        
        {/*<Button onClick={() => {      mutation.mutate()}}> Test Shadcn Button </Button>*/}
        </div>
    )
}