import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {api, makeResponseFailed} from "@/api/api.js";

import {SheetContent, SheetDescription, SheetHeader, Sheet, SheetTitle, SheetTrigger} from "@/components/ui/sheet.jsx";
import {HeaderContent} from "@/components/ui/header-content.jsx";
import {FooterContent} from "@/components/ui/footer-content.jsx";
import {Loading} from "@/components/loading/Loading.jsx";
import {cn} from "@/lib/utils.js";
import {ContentDistance} from "@/components/ui/content-distance.jsx";
import {questionAPI} from "@/api/question.js";
import {Button} from "@/components/ui/button.jsx";
import {Progress} from "@/components/ui/progress.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as item from "date-fns/locale";
import {Input} from "@/components/ui/input.jsx";


export function ListQuestionContent({id}) {



    const [questions, setQuestions] = useState([]);
    const [progress, setProgress] = useState(13)

    const [enable, setEnable] = useState(false);

    const {isLoading, data, isFetching, refetch} = useQuery({
        queryKey: ["getQuestionID"],
        queryFn: async () => {
            return questionAPI.getQuestionID(id)
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

    useEffect(() => {


        setProgress((questions.length/data?.data.question_detail.question.length) * 100)

    }, [questions])
    const handleChoices = (id, answer) => {

        let questionFilter = questions.filter(question => question.id !== id);


        questionFilter.push({
            id: id,
            answer: answer,

        });

        setQuestions(questionFilter);
    };

    const {mutate, isPending,} = useMutation({
        mutationKey: ["postSubmit"], mutationFn: async (body) => {
            try {
                const res = await api.post("submit", body);

                return res;
            } catch (error) {
                return makeResponseFailed({
                    message: error,
                })
            }
        },

        onSuccess: (response) => {


            refetch()
            //
            // navigate("/tools/generative-question/detail/" + response.data.data.id);
        },

        onError: (error) => {
            console.log("onError")
            console.log(error)


        },

        onMutate: async () => {

        },

    })



    const onSubmit = (id) => {
        mutate({
            id:id,
            request: questions,
        })

    }


    const choicesCondintion = (itemParent,i,answers) => {


        if(answers.length > 0) {
            let answerFilter = answers.filter(answer => answer.question_id === itemParent.id)[0];


            console.log(answerFilter.answer_response === itemParent.answer)
            console.log(itemParent.answer) //ress
            console.log(answerFilter.answer_response) // controller

            // let choices =
            return (
                <div>
                    <p className={cn(
                        answerFilter.answer_response === itemParent.answer ?"text-green-500":"text-red-500"
                    )}>Question {i + 1} ({itemParent.type} • Single Answer) {answerFilter.answer_response === itemParent.answer ?"V":"X"}</p>
                    <h2 className={'font-bold text-lg'}>{itemParent.title}</h2>

                    <div className={'mt-5 grid grid-rows-2 w-1/2 grid-flow-col gap-8'}>
                        {
                            itemParent.choices.toString().split(',').map((item, i) => (
                                <Button key={item}
                                        className={cn(
                                            'group flex  justify-start  rounded-xl w-96 ',
                                            answerFilter.answer_response === item ?"bg-primary/90" : "bg-transparent border-2",
                                            itemParent.answer  === item && answerFilter.answer_response !== itemParent.answer ?"bg-[#E2E8F0]":""
                                        )}>
                                    <p className={cn(
                                                "overflow-hidden ",
                                        answerFilter.answer_response === item  ?"text-white" : "text-primary"
                                    )}> {arr[i] + item}</p>
                                </Button>

                            ))
                        }
                    </div>
                    <h2 className={'mt-7 font-bold'}>Explanation: </h2>
                    <p>{itemParent.explanation}</p>
                </div>
            )
        }else {
            return (
                <div>
                    <p>Question {i + 1} ({itemParent.type} • Single Answer)</p>
                    <h2 className={'font-bold text-lg'}>{itemParent.title}</h2>

                    <div className={'mt-5 grid grid-rows-2 w-1/2 grid-flow-col gap-8'}>
                        {
                            itemParent.type === "Fill in the blank"?
                                <Input placeholder={"Type your answer here"}/>
                                :
                                itemParent.choices.toString().split(',').map((item, i) => (
                                        <Button key={item} onClick={() => handleChoices(itemParent.id, item, data?.data.id)}
                                                className={cn(
                                                    'group flex hover:border-0 justify-start  rounded-xl w-96 border-2',
                                                    questions.find(question => question.answer === item && question.id === itemParent.id) ? "bg-primary/90" : "bg-transparent"
                                                )}>
                                            <p className={cn(
                                                questions.find(question => question.answer === item && question.id === itemParent.id) ? "text-white group-hover:text-primary" : "text-primary  group-hover:text-white"
                                            )}> {arr[i] + item}</p>
                                        </Button>

                                    ))

                        }
                    </div>

                </div>
            )
        }


    }

    let arr = ["A. ", "B. ", "C. ", "D. "];
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
                                title={data?.data.question_detail.title}
                                type={data?.data.question_detail.type}
                                date={data?.data.question_detail.date}
                                goal_level={data?.data.question_detail.goal_level}
                                knowledge_level={data?.data.question_detail.knowledge_level}

                            />
                            {data?.data.question_detail.question.map((itemParent, i) => choicesCondintion(itemParent,i,data?.data.answer_details))}

                        </ContentDistance>
                    )
                )}
            </div>


            {(isLoading || isFetching) || data?.data != null && (

                data?.data.question_detail.solved ? (


                    <FooterContent url={"/tes"}/>

                ) : (
                    <div
                        className="  flex flex-col items-center justify-between gap-4 bg-white border-t-2 border-accent p-4">
                        <Progress value={progress} className="w-full"/>
                        <div className={'flex flex-row w-full justify-between'}>
                            <p>{(questions.length / data?.data.question_detail.question.length) * 100}% Compleate</p>
                            <p>{questions.length}/{data?.data.question_detail.question.length}</p>

                        </div>

                        <Button onClick={() => onSubmit(data?.data.question_detail.id)} disabled={progress !== 100} className="w-full">

                            {
                                isPending ? <Loading/> : "Submit"
                            }

                        </Button>
                    </div>
                )
            )}


        </div>
    );
}

ListQuestionContent.propTypes = {
    id: PropTypes.string,
}