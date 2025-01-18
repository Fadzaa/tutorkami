import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {SheetContent, SheetDescription, SheetHeader, Sheet, SheetTitle, SheetTrigger} from "@/components/ui/sheet.jsx";
import {HeaderContent} from "@/components/ui/header-content.jsx";
import {FooterContent} from "@/components/ui/footer-content.jsx";
import check from "/public/check.svg";
import checked from "/public/checked.svg";
import {cn} from "@/lib/utils.js";
import {ContentDistance} from "@/components/ui/content-distance.jsx";
import {roadmapAPI} from "@/api/roadmap.js";
import {ContentRoadmapSkeleton} from "@/components/skeleton/ContentRoadmapSkeleton.jsx";

export function ListRoadmapContent({id}) {

    const [enable, setEnable] = useState(false);
    const [hover, setHover] = useState(false);
    const [hoverCompleted, setHoverCompleted] = useState(false);
    const [hoverId, setHoverId] = useState(0);

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
        <div className="flex flex-col h-full relative flex-1 overflow-hidden">

            <div className={cn(
                "flex-1 pb-5 cs overflow-y-auto",
                isLoading || isFetching ? "flex items-center" : ""
            )}>
                {isLoading || isFetching ? (
                    <ContentRoadmapSkeleton/>
                ) : (
                    data?.data != null && (

                        <ContentDistance>

                            <HeaderContent
                                title={data?.data.subject}
                                type={data?.data.type}
                                date={data?.data.date}
                                desc={data?.data.topic}
                            />
                            {data?.data.subject_detail_roadmap.roadmap.map((item, i) => (
                                <Sheet key={item.id}>
                                    <SheetTrigger>
                                        <div onMouseEnter={() => {
                                            setHoverId(item.id)
                                            setHover(true)
                                        }} onMouseLeave={() => {
                                            setHoverId(item.id)
                                            setHover(false)
                                        }} className={`flex`}>
                                            <div className={`relative flex justify-start w-full p-4 gap-4 bg-white border-accent ${item.solved !== 0 ? "border-l-2 border-y-2 rounded-l-lg" : "border-2 rounded-lg"} hover:bg-accent cursor-pointer`}>
                                                <div className="h-auto w-[1px] bg-black"></div>
                                                <div className="flex flex-col items-start gap-3">
                                                    <h1 className="text-sm lg:text-base text-start font-semibold">{`${i + 1}. ${item.title}`}</h1>
                                                    <p className="text-xs lg:text-base text-start lg:text-center">{item.desc}</p>
                                                    {
                                                        (hover && (hoverId === item.id)) &&(
                                                            <div className={`relative flex gap-3`}>
                                                                {
                                                                    item.solved === 0 && (
                                                                        <div onMouseEnter={(event) => {
                                                                        event.stopPropagation();
                                                                        setHoverCompleted(true)
                                                                    }} onMouseLeave={(event) => {
                                                                        event.stopPropagation();
                                                                        setHoverCompleted(false)
                                                                    }} onClick={(event) => {
                                                                        event.stopPropagation();
                                                                        roadmapAPI.solvedRoadmapID(item.id).then(() => {
                                                                            refetch();
                                                                        })
                                                                    }} className={`border hover:bg-[#1E293B] flex gap-2 hover:text-white border-1 border-[#1E293B] rounded-3xl py-0.5 px-3`}>
                                                                        {
                                                                            hoverCompleted && (<img src={check} alt=""/>)
                                                                        }
                                                                        Marked as Complete
                                                                    </div>
                                                                    )
                                                                }
                                                                {
                                                                    item.solved === 0 && (<div className="h-auto my-1 w-[1px] bg-black"></div>)
                                                                }
                                                                <div onClick={(event) => {
                                                                    event.stopPropagation();
                                                                }} className={`border hover:bg-[#1E293B] flex gap-2 hover:text-white border-1 border-[#1E293B] rounded-3xl py-0.5 px-3`}>
                                                                    Generate a Quiz
                                                                </div>
                                                                <div onClick={(event) => {
                                                                    event.stopPropagation();
                                                                }} className={`border hover:bg-[#1E293B] flex gap-2 hover:text-white border-1 border-[#1E293B] rounded-3xl py-0.5 px-3`}>
                                                                    Generate Study Materials
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            {
                                                item.solved === 1 && (
                                                    <div
                                                    className={`relative h-auto flex flex-col justify-center p-3 gap-2 rounded-r-lg bg-[#1E293B] border-accent cursor-pointer`}>
                                                        <img src={checked} alt="" className={`h-10`}/>
                                                        <span className={`text-white text-base`}>Completed</span>
                                                    </div>
                                                )
                                            }
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
                                            <SheetDescription className={'flex flex-col gap-2'}>
                                                {item.references.map((ref) => (
                                                    <div
                                                        key={ref.id}
                                                        className="flex flex-row items-center gap-5"
                                                    >
                                                        <div onClick={() => window.location.href = ref.url} className="cursor-pointer hover:bg-gray-400 hover:text-black p-2 text-sm bg-primary rounded text-white">
                                                            {ref.type}
                                                        </div>
                                                        <div className={`flex w-full justify-between`}>
                                                            <span>
                                                                {ref.title}
                                                            </span>
                                                            <span className={`pl-5 text-end justify-end items-center flex`}>
                                                                {ref.platform}
                                                            </span>
                                                        </div>
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