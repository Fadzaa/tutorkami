import PropTypes from "prop-types";
import {cn} from "@/lib/utils.js";
import {useLocation, useNavigate} from "react-router-dom";
import {SlOptionsVertical} from "react-icons/sl";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {useMutation, useQuery} from "@tanstack/react-query";

import {api, makeResponseFailed} from "@/api/api.js";
import {Button} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {FaCheck, FaRegTrashAlt} from "react-icons/fa";

export function ListQuestionCard({
                                     title,
                                     date,
                                     total_questions,
                                     proficiency,
                                     category,
                                     isSolved,
                                     type,
                                     id,
                                    storage,
                                     subTopicId
                                 }) {


    const form = useForm()

    const navigate = useNavigate();
    const {pathname} = useLocation();
    const handleToDetail = (id) => {
        type.toString().toLowerCase() === "lms" ? navigate(`/tools/generative-${type.toString().toLowerCase()}/detail/${id}/${subTopicId}`)
        : navigate(`/tools/generative-${type.toString().toLowerCase()}/detail/${id}`);
    }


    const {mutate, isPending,} = useMutation({
        mutationFn: async (id) => {
            try {
                const res = await api.delete(`${type.toString().toLowerCase()}/${id}`);
                return res;
            } catch (error) {
                return makeResponseFailed({
                    message: error,
                })
            }
        },

        onSuccess: () => {

            navigate(`/tools/generative-${type.toString().toLowerCase()}/`);
        },

        onError: (error) => {

        },

        onMutate: async () => {

        },

    })


    const onSubmit = (data) => {
        mutate(data)
    }

    return (<div
        className={cn("flex w-full p-4 ps-0 gap-4 rounded-lg hover:bg-accent cursor-pointer", pathname.toString().includes(id) ? "bg-accent" : "",storage?'bg-accent':'')

    }
        onClick={() => handleToDetail(id)}>
        <div className="h-auto w-[1px] bg-black"></div>
        <div className="w-full flex flex-col justify-between gap-3">


            <div className={'flex flex-col gap-3'}>

                <div className={'flex justify-between'}>
                    <p className="text-xs lg:text-base">{total_questions} {type} • {proficiency} • {category}</p>


                    {isSolved ?

                        <div className={'flex gap-2'}>

                        <span className={'bg-[#1E293B] rounded-full p-1'}>
                            <FaCheck className={'text-white text-sm '}/>
                        </span>

                            <p>Solved</p>

                        </div>
                        : (

                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger> <SlOptionsVertical className="w-3 lg:w-5"/></DropdownMenuTrigger>
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
                            </>

                        )}
                </div>

                <h1 className="text-base lg:text-lg font-semibold">{title}</h1>
            </div>

            <div className={cn("flex justify-between",)}>
                <p className="text-sm lg:text-base">{type}</p>

                <p>{date}</p>
            </div>
        </div>
    </div>)
}

ListQuestionCard.propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    total_questions: PropTypes.number,
    id: PropTypes.number,
    proficiency: PropTypes.string,
    category: PropTypes.string,
    type: PropTypes.string,
    isSolved: PropTypes.bool,
    storage: PropTypes.bool,
    handleEnable: PropTypes.func,
    subTopicId: PropTypes.number,
}