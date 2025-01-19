import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api, makeResponseFailed} from "@/api/api.js";
import {HeaderContent} from "@/components/ui/header-content.jsx";
import {Loading} from "@/components/loading/Loading.jsx";
import {cn} from "@/lib/utils.js";
import {Button} from "@/components/ui/button.jsx";
import {Progress} from "@/components/ui/progress.jsx";
import {useToast} from "@/hooks/use-toast.js";
import {ContentDistance} from "@/components/ui/content-distance.jsx";


export function ListLmsQuestionContent({data,lms}) {


    const [questions, setQuestions] = useState([]);
    const [progress, setProgress] = useState(0)


    const {toast} = useToast()


    useEffect(() => {
        let result = Math.floor(questions.length / data?.lms_quiz.length * 100,)


        setProgress(result)

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
                return await api.post("lms/submit", body);
            } catch (error) {
                return makeResponseFailed({
                    message: error,
                })
            }
        },
        onSuccess: () => {
            toast({
                title: "Submit Success",
                description: "You have successfully submited questions.",
            })
            setQuestions([])
            setProgress(0)
            window.location.reload();
        },
        onError: (error) => {

            toast({
                variant: "destructive",
                title: "Submit Failed",
                description: "Failed submited questions.",
            })
        }

    })

    const onSubmit = (id) => {
        mutate({
            id: id,
            request: questions,
        })

    }

    const choicesCondintion = (itemParent, i, answers,qsDetail) => {

        if (answers?.length > 0) {
            let answerFilter = answers?.filter(answer => answer.lms_id === itemParent.id)[0];

            return (
                <div>
                    <p className={cn(
                        answerFilter?.answer_response === itemParent.answer ? "text-green-500" : "text-red-500"
                    )}>Question {i + 1} ({itemParent.type} • Single
                        Answer) {answerFilter?.answer_response === itemParent.answer ? "V" : "X"}</p>
                    <h2 className={'font-bold text-lg'}>{itemParent.title}</h2>

                    <div className={cn('mt-5 flex flex-col lg:grid  w-full lg:w-1/2 lg:grid-flow-col gap-8',
                        'lg:grid-rows-2'
                    )}>

                    {

                                    itemParent.choices.toString().split(',').map((item, i) => {

                                            const answerchoose = answerFilter?.answer_response.toString().trim().toLowerCase() === item.trim().toLowerCase()

                                            const correctAnswer = itemParent.answer.toString().trim() === item.toString().trim() && answerFilter?.answer_response.toString().trim() !== itemParent.answer.toString().trim()

                                            return (

                                                <Button key={item}
                                                        className={cn(
                                                            'group flex   justify-start  rounded-xl w-full lg:w-96',

                                                            answerchoose ? "bg-primary/90" : "bg-transparent hover:bg-transparent border-2",
                                                            correctAnswer ? "bg-[#E2E8F0] hover:bg-[#E2E8F0]" : ""
                                                        )}>
                                                    <p className={cn(
                                                        "overflow-hidden ",
                                                        answerchoose ? "text-white" : "text-primary"
                                                    )}> { item}</p>
                                                </Button>

                                            )

                                        }
                                    )


                    }
                    </div>
                    {

                        qsDetail?.include_answer === "Yes" &&  qsDetail?.explanations === "Yes"  && (
                            <>
                                <h2 className={'mt-7 font-bold'}>Answer: </h2>
                                <p>{itemParent.answer}</p>

                                <h2 className={'mt-7 font-bold'}>Explanation: </h2>
                                <p>{itemParent.explanation}</p>
                            </>
                        )
                    }


                </div>
            )
        } else {
            return (
                <div>
                    <p>Question {i + 1} ({itemParent.type} • Single Answer)</p>
                    <h2 className={'font-bold text-lg'}>{itemParent.title}</h2>


                    <div className={cn('mt-5 flex flex-col lg:grid  w-full lg:w-1/2 lg:grid-flow-col gap-8', 'lg:grid-rows-2'
                        )}>
                        {
                                itemParent.choices.toString().split(',').map((item, i) => (
                                    <Button key={item} onClick={() => handleChoices(itemParent.id, item, data?.id)}
                                            className={cn(
                                                'group flex hover:border-0 justify-start  rounded-xl w-full lg:w-96 border-2',
                                                questions.find(question => question.answer === item && question.id === itemParent.id) ? "bg-primary/90" : "bg-transparent"
                                            )}>
                                        <p className={cn(
                                            questions.find(question => question.answer === item && question.id === itemParent.id) ? "text-white group-hover:text-primary" : "text-primary  group-hover:text-white"
                                        )}> { item}</p>
                                    </Button>

                                ))

                        }
                    </div>

                </div>
            )
        }


    }

    let arr = ["A. ", "B. ", "C. ", "D. ", "E. ", "F. "];
    return (
        <div className="flex flex-col h-full relative flex-1">
            <div className={cn(
                "flex-1 pb-5 cs overflow-y-auto",
                "flex items-center"
            )}>

                {data != null && (
                        <ContentDistance className={`flex w-full h-full justify-between flex-col gap-4 mt-5 mx-10`}>
                            <HeaderContent
                                title={lms?.subject}
                                date={data?.date}
                                solved={data?.is_solved}
                                desc={`${data?.type} • ${lms?.topic} • ${data?.question_difficulty} • ${data?.target_audience}`}
                            />

                            {data?.lms_quiz.map((itemParent, i) => choicesCondintion(itemParent, i, data?.lms_quiz_response	, data))}
                        </ContentDistance>
                )}
            </div>
            {
                data?.is_solved === false && (
                    <div
                        className="flex flex-col items-start justify-between gap-4 bg-white border-t-2 border-accent p-4">

                        <Progress value={progress} className="w-full"/>
                        <div className={'flex flex-row w-full justify-between'}>
                            <p>{progress ? progress : 0}% Complete</p>
                            <p>{questions.length}/{data?.lms_quiz.length}</p>

                        </div>

                        <Button onClick={() => onSubmit(data?.id)} disabled={progress !== 100}
                                className="w-full">

                            {
                                isPending ? <Loading/> : "Submit"
                            }

                        </Button>
                    </div>
                )
            }
        </div>
    );
}

ListLmsQuestionContent.propTypes = {
    data: PropTypes.object,
    lms: PropTypes.object,
}