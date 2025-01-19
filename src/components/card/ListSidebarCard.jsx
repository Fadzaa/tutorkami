import PropTypes from "prop-types";
import {cn} from "@/lib/utils.js";
import {useLocation, useNavigate} from "react-router-dom";
import {SlOptionsVertical} from "react-icons/sl";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {useMutation} from "@tanstack/react-query";
import {api} from "@/api/api.js";
import {Button} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {FaRegTrashAlt} from "react-icons/fa";
import {commonAPI} from "@/api/common.js";
import ProgressCircle from "@/components/ui/progress-circle.jsx";

export function ListSidebarCard({
                                    title,
                                    date,
                                    desc,
                                    isSolved,
                                    type,
                                    id,
                                    storage,
                                    subId,
                                    subject,
                                    topic,
                                    length,
                                    totalSolve,
                                    questionType
                                }) {


    const form = useForm()
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const {mutate} = useMutation({
        mutationFn: async (id) => await commonAPI.deleteSidebarUniversal(`${type.toString().toLowerCase()}/${id}`),
        onSuccess: () => navigate(`/tools/generative-${type.toString().toLowerCase()}/`),
        onError: (error) => console.log("onError :" + error)
    })

    const handleToDetail = (id) => type === "LMS" ? navigate(`/tools/generative-${type.toString().toLowerCase()}/detail/${id}/${subId}`) : navigate(`/tools/generative-${type.toString().toLowerCase()}/detail/${id}`);
    const onSubmit = (data) => mutate(data)


    return (
        <div
            className={cn(
                "group/item flex w-full p-4 ps-0 gap-4 rounded-lg cursor-pointer hover:bg-accent",
                pathname.toString().includes(id) ? "bg-accent" : "", storage ? 'bg-accent' : '')
            }
            onClick={() => handleToDetail(id)}>
            <div className={cn(
                "h-auto w-[1px] bg-black group-hover/item:ms-4",
                pathname.toString().includes(id) ? "ms-4" : "", storage ? 'ms-4' : '')}></div>

            <div className="w-full flex flex-col justify-between gap-3">

                <section className={'flex flex-col gap-3'}>

                    <div className={'flex justify-between'}>
                        <p className="text-xl lg:text-sm font-medium ">{subject}</p>

                        {/*<DeleteDropdown/>*/}
                    </div>

                    <h1 className="text-base lg:text-xl font-semibold">{topic}</h1>
                </section>

                <section className={cn("flex justify-between items-center",)}>
                    {/*<p className="font-light lg:text-[10px]">{isSolved ? "Solved" : desc}</p>*/}
                    <p className="font-light lg:text-[10px]">{desc}</p>

                    {/*<p>{date}</p>*/}
                    {type === "Roadmap" && (
                        <ProgressCircle
                            width={"w-6 lg:w-8"}
                            height={"h-6 lg:h-8"}
                            progress={totalSolve / length * 100}
                            textProgress={`${totalSolve} /  ${length}`}
                            text={"text-[5px] lg:text-[6px]"}
                        />
                    )}

                    {type === "LMS" && (
                        <>

                            <ProgressCircle
                                width={"w-6 lg:w-8"}
                                height={"h-6 lg:h-8"}
                                progress={totalSolve / length * 100}
                                textProgress={`${totalSolve} /  ${length}`}
                                text={"text-[5px] lg:text-[6px]"}
                            />
                        </>

                    )}


                    {type === "Question" && (
                        <p>{questionType}</p>
                    )

                    }
                </section>


            </div>
        </div>
    )

    function DeleteDropdown() {

        return (
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <SlOptionsVertical
                        className="w-3 lg:w-5"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel className={'cursor-pointer'}>


                        <div className={'flex items-center text-red-600'}>

                            <FaRegTrashAlt/>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                                <Button className={'bg-transparent hover:bg-transparent'}
                                        onClick={() => onSubmit(id)}>
                                    <p className={'text-red-600'}>Delete</p>

                                </Button>
                            </form>

                        </div>


                    </DropdownMenuLabel>

                </DropdownMenuContent>
            </DropdownMenu>
        )

    }
}


ListSidebarCard.propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    id: PropTypes.number,
    subId: PropTypes.number,
    desc: PropTypes.string,
    type: PropTypes.string,
    isSolved: PropTypes.bool,
    storage: PropTypes.bool,
    handleEnable: PropTypes.func
}

