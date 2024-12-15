import PropTypes from "prop-types";
import {cn} from "@/lib/utils.js";
import {useLocation, useNavigate} from "react-router-dom";
import {SlOptionsVertical} from "react-icons/sl";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import {roadmapAPI} from "@/api/roadmap.js";
import {useEffect, useState} from "react";
import {api, makeResponseFailed} from "@/api/api.js";
import {Button} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FaCheck, FaRegTrashAlt} from "react-icons/fa";

export function ListQuestionCard({
                                     title,
                                     date,
                                     total_questions,
                                     proficiency,
                                     category,
                                     isSolved,
                                     isQuestion,
                                     type,
                                     id,

                                 }) {


    const form = useForm()

    const navigate = useNavigate();
    const {pathname} = useLocation();
    const handleToDetail = (id) => {


        navigate(`/tools/generative-${type.toString().toLowerCase()}/detail/${id}`);
    }


    const {mutate, isPending,} = useMutation({
        mutationFn: async (id) => {
            try {
                const res = await api.delete(`${type.toString().toLowerCase()}/${id}`);
                console.log("Login Response:", res);
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
            console.log("onError")
            console.log(error)


        },

        onMutate: async () => {

        },

    })


    const onSubmit = (data) => {
        mutate(data)
    }

    return (<div
        className={cn("flex w-full p-4 ps-0 gap-4 rounded-lg hover:bg-accent cursor-pointer", pathname.toString().includes(id) ? "bg-accent" : "")}
        onClick={() => handleToDetail(id)}>
        <div className="h-auto w-[1px] bg-black"></div>
        <div className="w-full flex flex-col gap-3">

            <div className={'flex justify-between'}>
                <p>{total_questions} {type} • {proficiency} • {category}</p>


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
                                <DropdownMenuTrigger> <SlOptionsVertical/></DropdownMenuTrigger>
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
            <h1 className="text-lg font-semibold">{title}</h1>
            <div className={cn("flex justify-between",)}>
                <p>{type}</p>

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
    isQuestion: PropTypes.bool,
    handleEnable: PropTypes.func
}