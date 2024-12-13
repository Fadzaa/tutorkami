import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {api, makeResponseFailed} from "@/api/api.js";

import {SheetContent, SheetDescription, SheetHeader, Sheet, SheetTitle, SheetTrigger} from "@/components/ui/sheet.jsx";
import {HeaderContent} from "@/components/ui/header-content.jsx";
import {FooterContent} from "@/components/ui/footer-content.jsx";
import {Loading} from "@/components/loading/Loading.jsx";
import {cn} from "@/lib/utils.js";
import {ContentDistance} from "@/components/ui/content-distance.jsx";
import {LabelTitleContent} from "@/components/ui/label-title-content.jsx";
import {roadmapAPI} from "@/api/roadmap.js";

export function ListRoadmapContent({id}) {

    const [enable, setEnable] = useState(false);

    const {isLoading, data, isFetching, refetch} = useQuery({
        queryKey: ["getRoadmapID"],
        queryFn: async () => {
            return roadmapAPI.getRoadmapID(id)
        },
        enabled: enable,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (enable && id) {
            refetch();
        } else if (id) {
            setEnable(true);
        }
    }, [id]);

    return (
        <div className="flex flex-col h-full relative flex-1">

            <div className={cn(
                "flex-1 pb-5 cs overflow-y-auto",
                isLoading || isFetching ? "flex items-center" : ""
            )}>
                {isLoading || isFetching ? (
                    <Loading/>
                ) : (
                    data?.data != null && (

                 <ContentDistance>

                     <HeaderContent
                         title={data?.data.title}
                         type={data?.data.type}
                         date={data?.data.date}
                         goal_level={data?.data.goal_level}
                         knowledge_level={data?.data.knowledge_level}

                     />
                     {data?.data.roadmap.map((item, i) => (
                         <Sheet key={item.id}>
                             <SheetTrigger>
                                 <div
                                     className="flex justify-start w-full p-4 gap-4 rounded-lg bg-white border-accent border-2 hover:bg-accent cursor-pointer">
                                     <div className="h-auto w-[1px] bg-black"></div>
                                     <div className="flex flex-col items-start gap-3">
                                         <h1>{`${i + 1}. ${item.title}`}</h1>
                                         <p>{item.desc}</p>
                                     </div>
                                 </div>
                             </SheetTrigger>
                             <SheetContent className="w-[400px] sm:w-[540px]">
                                 <SheetHeader>
                                     <SheetTitle>{item.title}</SheetTitle>
                                     <SheetDescription>
                                         {`${item.desc} ${item.detail_desc}`}
                                     </SheetDescription>
                                     <SheetDescription>
                                         <h2 className="text-md mb-5">
                                             Visit the following resources to learn more:
                                         </h2>
                                         <hr/>
                                     </SheetDescription>
                                     <SheetDescription>
                                         {item.references.map((ref) => (
                                             <div
                                                 key={ref.id}
                                                 className="flex flex-row items-center gap-5"
                                             >
                                                 <div className="p-2 text-sm bg-primary rounded text-white">
                                                     {ref.type}
                                                 </div>
                                                 <p className="text-sm">{ref.content}</p>
                                             </div>
                                         ))}
                                     </SheetDescription>
                                 </SheetHeader>
                             </SheetContent>
                         </Sheet>
                     ))}

                 </ContentDistance>
                    )
                )}
            </div>


            {(isLoading || isFetching) || data?.data != null && (
                <FooterContent url={"/tes"}/>
            )}


        </div>
    );
}

ListRoadmapContent.propTypes = {
    id: PropTypes.string,
}