import PropTypes from "prop-types";
import {Suspense, useEffect, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {SheetContent, SheetDescription, SheetHeader, Sheet, SheetTitle, SheetTrigger} from "@/components/ui/sheet.jsx";
import {HeaderContent} from "@/components/ui/header-content.jsx";
import check from "/public/check.svg";
import add from "/public/add.svg";
import checked from "/public/checked.svg";
import {cn} from "@/lib/utils.js";
import {ContentDistance} from "@/components/ui/content-distance.jsx";
import {roadmapAPI} from "@/api/roadmap.js";
import {ContentRoadmapSkeleton} from "@/components/skeleton/ContentRoadmapSkeleton.jsx";
import {AnimatePresence,motion} from "framer-motion";
import useRoadmapsModal from "@/hooks/use-roadmap-modal.js";
import RoadmapAddModal from "@/components/modals/RoadmapAddModal.jsx";
import {LoadingGeneratingContent} from "@/components/loading/LoadingGeneratingContent.jsx";
import {toast} from "@/hooks/use-toast.js";
import {Button} from "@/components/ui/button.jsx";
import RoadmapEditModal from "@/components/modals/RoadmapEditModal.jsx";
import useRoadmapsUpdateModal from "@/hooks/use-roadmap-update-modal.js";
import {Loading} from "@/components/loading/Loading.jsx";
import {regenerateAPI} from "@/api/regenerate.js";
import MaterialModal from "@/components/modals/MaterialModal.jsx";
import RoadmapModal from "@/components/modals/RoadmapModal.jsx";
import useRoadmapRegenerateModal from "@/hooks/use-roadmap-regenerate-modal.js";
import useMaterialGenerateQuizModal from "@/hooks/use-material-generate-quiz-modal.js";
import generateQuizModal from "@/components/modals/GenerateQuizModal.jsx";
import GenerateQuizModal from "@/components/modals/GenerateQuizModal.jsx";
import GenerateMaterialModal from "@/components/modals/GenerateMaterialModal.jsx";
import useGenerateMaterialModal from "@/hooks/use-generate-material-modal.js";
import {questionAPI} from "@/api/question.js";

export function ListRoadmapContent({id}) {

    const [enable, setEnable] = useState(false);
    const [hover, setHover] = useState(false);
    const [modalId, setModalId] = useState(0);
    const [completedId, setCompletedId] = useState(0);
    const [hoverCompleted, setHoverCompleted] = useState(false);
    const [hoverId, setHoverId] = useState(0);
    const queryClient = useQueryClient();
    const roadmapsModal = useRoadmapsModal();
    const roadmapsUpdateModal = useRoadmapsUpdateModal();
    const roadmapRegenerateModal = useRoadmapRegenerateModal();
    const quizGenerateModal = useMaterialGenerateQuizModal()
    const generateMaterialModal = useGenerateMaterialModal()
    const hoverAnimation = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
    };

    let {isLoading, data, isFetching, refetch} = useQuery({
        queryKey: ["getRoadmapID"],
        queryFn: async () => {
            return roadmapAPI.getRoadmapID(id)
        },
        enabled: enable,
        refetchOnWindowFocus: false,
    });

    const {mutate, isPending,} = useMutation({
        mutationFn: async (body) => await roadmapAPI.updateRoadmap(body,data?.data?.subject_detail_roadmap?.id),
        onSuccess: (response) => {
            toast({
                title: "Create Roadmap Success",
                description: "You have successfully create roadmap.",
            })
            refetch();
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Create Roadmap Failed",
                description: "Failed create roadmap.",
            })
        },
    })

    const {mutate : mutate3, isPending: isPending3,} = useMutation({
        mutationFn: async ({ body, id }) => await roadmapAPI.updateRoadmap(body,id),
        onSuccess: (response) => {
            toast({
                title: "Create Roadmap Success",
                description: "You have successfully create roadmap.",
            })
            refetch();
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Create Roadmap Failed",
                description: "Failed create roadmap.",
            })
        },
    })

    const {mutate : mutate4, isPending: isPending4,} = useMutation({
        mutationFn: async ({ id }) => await roadmapAPI.solvedRoadmapID(id),
        onSuccess: () => {
            toast({
                title: "Update Roadmap Success",
                description: "You have successfully update roadmap.",
            })
            queryClient.invalidateQueries(['getRoadmap']);
            refetch().then(() => {
                setCompletedId(0);
            })
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Update Roadmap Failed",
                description: "Failed update roadmap.",
            })
        },
    })

    const {mutate: mutate2, isPending: isPending2,} = useMutation({
        mutationFn: async (body) => await roadmapAPI.updateRoadmap(body,data?.data?.subject_detail_roadmap?.id),
        onSuccess: (response) => {
            toast({
                title: "Create Roadmap Success",
                description: "You have successfully create roadmap.",
            })
            refetch();
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Create Roadmap Failed",
                description: "Failed create roadmap.",
            })
        },
    })

    const {mutate: regenerate, isPending: regenerateLoading} = useMutation({
        mutationKey: ["regenerateMaterial"],
        mutationFn: async (body) => await regenerateAPI.regenerateRoadmap(body, id),
        onSuccess: () => {
            toast({
                title: "Regenerate Material",
                description:  "Regenerate Material Successfully",
            })
            refetch()

        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Regenerate Failed",
                description: "Failed regenerated questions.",
            })
            console.log("onError: " + error)
        }
    })

    useEffect(() => {
        if (enable && id) {
            refetch();
        } else if (id) {
            setEnable(true);
        }
    }, [id]);

    const handleRegenerate = (dataRegeneration) => {

        regenerate({
            ...dataRegeneration,
        })
    }

    return (
        <div className="flex flex-col h-full relative flex-1 overflow-hidden">

            <div className={cn(
                "flex-1 pb-5 cs overflow-y-auto",
                (isLoading|| isPending2 || isPending3) && completedId ? "flex items-center" : ""
            )}>
                {(isLoading || isPending2 || isPending3) && completedId === 0 ? (
                    <ContentRoadmapSkeleton array={5}/>
                ) : (
                    data?.data != null && (
                        <ContentDistance>
                            <RoadmapAddModal update={mutate} update2={mutate2}/>
                            <HeaderContent
                                title={data?.data.subject}
                                type={data?.data.type}
                                date={data?.data.date}
                                text={"text-xs"}
                                progress={data?.data?.subject_detail_roadmap?.roadmap?.filter((i) => i.solved === 1).length / data?.data?.subject_detail_roadmap?.roadmap?.length}
                                progressText={`${data?.data?.subject_detail_roadmap?.roadmap?.filter((i) => i.solved === 1).length} / ${data?.data?.subject_detail_roadmap?.roadmap?.length}`}
                                desc={`${data?.data?.topic} • ${data?.data?.subject_detail_roadmap?.user_proficiency_level} • ${data?.data?.subject_detail_roadmap?.timeline}`}
                            />
                            {data?.data.subject_detail_roadmap.roadmap.map((item, i) => (
                                <>
                                    {
                                        isPending4 && item.id === completedId ? (
                                            <ContentRoadmapSkeleton array={1} />
                                        ) :<Sheet key={item.id}>
                                            {
                                                modalId === item.id     && (
                                                    <RoadmapEditModal update={mutate3} data={item} id={item.id} />
                                                )
                                            }
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
                                                            <AnimatePresence>
                                                                {
                                                                    (hover && (hoverId === item.id)) &&(
                                                                        <motion.div
                                                                            className="relative flex gap-3 overflow-hidden"
                                                                            layout
                                                                            initial={{ height: 0, opacity: 0 }}
                                                                            animate={{ height: "auto", opacity: 1 }}
                                                                            exit={{ height: 0, opacity: 0 }}
                                                                            transition={{ duration: 0.5 }}
                                                                        >
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
                                                                                        setCompletedId(item.id);
                                                                                        mutate4({id: item.id});
                                                                                    }} className={`border hover:bg-[#1E293B] flex gap-2 hover:text-white border-1 border-[#1E293B] rounded-3xl py-0.5 px-3`}>
                                                                                        {
                                                                                            hoverCompleted && (<img src={check} alt="" className={`w-4`}/>)
                                                                                        }
                                                                                        Marked as Complete
                                                                                    </div>
                                                                                )
                                                                            }
                                                                            {
                                                                                item.solved === 0 && (<div className="h-auto my-1 w-[1px] bg-black"></div>)
                                                                            }
                                                                            <AnimatePresence>
                                                                                <motion.div onClick={(event) => {
                                                                                    quizGenerateModal.onOpen()
                                                                                    event.stopPropagation();
                                                                                }} variants={hoverAnimation}
                                                                                            initial="hidden"
                                                                                            animate="visible"
                                                                                            exit="exit" className={`border hover:bg-[#1E293B] flex gap-2 hover:text-white border-1 border-[#1E293B] rounded-3xl py-0.5 px-3`}>
                                                                                    Generate a Quiz
                                                                                </motion.div>
                                                                            </AnimatePresence>
                                                                            <AnimatePresence>
                                                                                <motion.div onClick={(event) => {
                                                                                    generateMaterialModal.onOpen()
                                                                                    event.stopPropagation();
                                                                                }} variants={hoverAnimation}
                                                                                            initial="hidden"
                                                                                            animate="visible"
                                                                                            exit="exit" className={`border hover:bg-[#1E293B] flex gap-2 hover:text-white border-1 border-[#1E293B] rounded-3xl py-0.5 px-3`}>
                                                                                    Generate Study Materials
                                                                                </motion.div>
                                                                            </AnimatePresence>
                                                                        </motion.div>
                                                                    )
                                                                }
                                                            </AnimatePresence>
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
                                                    <SheetTrigger>
                                                        <Button
                                                            type="button"
                                                            onClick={() =>{
                                                                roadmapsUpdateModal.onOpen();
                                                                setModalId(item.id);
                                                            }}
                                                        >
                                                            Edit Roadmap
                                                        </Button>
                                                    </SheetTrigger>
                                                </SheetHeader>
                                            </SheetContent>
                                        </Sheet>
                                    }
                                </>
                            ))}
                            <div onClick={() => roadmapsModal.onOpen()} className={`flex gap-3 pt-3 cursor-pointer font-medium text-[#C1C1C1]`}>
                                <img src={add} alt="" className={`h-6`}/>
                                Add Another Step
                            </div>
                        </ContentDistance>
                    )
                )}
            </div>


            {(isLoading || isFetching) || isPending || isPending2 || isPending3 || data?.data != null && (
                <>
                    <div
                        className="h-[100px] overflow-hidden flex items-center justify-between gap-4 bg-white border-t-2 border-accent p-4">
                        {/*<Button onClick={() => navigate("/tools/generative-question")}*/}
                        {/*        className="w-full">{"Generate a Quiz"}</Button>*/}
                        <Button onClick={() => roadmapRegenerateModal.onOpen()} className="w-full">{regenerateLoading ?
                            <Loading/> : "Regenerate"}</Button>
                    </div>

                    <Suspense>
                        <RoadmapModal regenerate={handleRegenerate} regenerateLoading={regenerateLoading}/>
                        <GenerateQuizModal topic={data?.data?.topic} subject={data?.data?.subject}/>
                        <GenerateMaterialModal topic={data?.data?.topic} subject={data?.data?.subject}/>
                    </Suspense>
                </>
            )}

            {isPending || isPending2 || isPending3 ?
                <LoadingGeneratingContent isPending={isPending || isPending2 || isPending3} type={"roadmap"}/> : <></>}


        </div>
    );
}

ListRoadmapContent.propTypes = {
    id: PropTypes.string,
}