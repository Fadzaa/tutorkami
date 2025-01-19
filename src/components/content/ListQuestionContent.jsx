import PropTypes from "prop-types";
import {Suspense, useEffect, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {api, makeResponseFailed} from "@/api/api.js";
import {HeaderContent} from "@/components/ui/header-content.jsx";
import {Loading} from "@/components/loading/Loading.jsx";
import {cn} from "@/lib/utils.js";
import {ContentDistance} from "@/components/ui/content-distance.jsx";
import {questionAPI} from "@/api/question.js";
import {Button} from "@/components/ui/button.jsx";
import {Progress} from "@/components/ui/progress.jsx";
import {Input} from "@/components/ui/input.jsx";
import {ContentQuestionSkeleton} from "@/components/skeleton/ContentQuestionSkeleton.jsx";
import {commonAPI} from "@/api/common.js";
import useQuestionsModal from "@/hooks/use-question-modal.js";
import QuestionModal from "@/components/modals/QuestionModal.jsx";
import {useToast} from "@/hooks/use-toast.js";
import QuestionTimeModal from "@/components/modals/QuestionTimeModal.jsx";
import useQuestionTimeStop from "@/hooks/use-question-time-stop.js";


export function ListQuestionContent({id}) {


    const [questions, setQuestions] = useState([]);
    const [progress, setProgress] = useState(0)

    const [enable, setEnable] = useState(false);
    const queryClient = useQueryClient();

    const modal = useQuestionsModal();
    const modalTime = useQuestionTimeStop();
    const {isLoading, data, isFetching, refetch} = useQuery({
        queryKey: ["getQuestionID"],
        queryFn: async () => {
            return questionAPI.getQuestionID(id)
        },
        enabled: enable,
        refetchOnWindowFocus: false,
    });


    const {toast} = useToast()


    useEffect(() => {
        if (enable && id) {
            refetch();
        } else if (id) {
            setEnable(true);
        }
    }, [id]);

    useEffect(() => {
        let result = Math.floor(questions.length / data?.data.question_detail.questions.length * 100,)


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
                const res = await api.post("common-question", body);

                return res;
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
            refetch()
            queryClient.invalidateQueries(['getQuestion']);
        },
        onError: (error) => {

            toast({
                variant: "destructive",
                title: "Submit Failed",
                description: "Failed submited questions.",
            })
            console.log("onError: " + error)
        }

    })


    const {mutate: retake, isPending: retakeLoading} = useMutation({
        mutationKey: ["postSubmit"], mutationFn: async (body) => await commonAPI.retakeQuestion(body.id),
        onSuccess: () => {
            toast({
                title: "Retake Success",
                description: "You have successfully retake questions.",
            })
            setQuestions([])
            setProgress(0)
            refetch()
            queryClient.invalidateQueries(['getQuestion']);
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Retake Failed",
                description: "Failed retake questions.",
            })
            console.log("onError: " + error)
        }
    })

    const {mutate: regenerate, isPending: regenerateLoading} = useMutation({
        mutationKey: ["postSubmit"], mutationFn: async (body) => await commonAPI.regenerateQuestion(body, id),
        onSuccess: () => {

            toast({
                title: "Regenerate Success",
                description: "You have successfully regenerated questions.",
            })
            setQuestions([])
            setProgress(0)

            refetch()
            queryClient.invalidateQueries(['getQuestion']);

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


    const {mutate: update, isPending: updateLoading} = useMutation({
        mutationKey: ["update"], mutationFn: async (body) => await questionAPI.updateQuestion(id),
        onSuccess: () => {
            if (data?.data != null) {
                setSeconds(data?.data.question_detail.time_limit * 60)
            }
            modalTime.onClose()
            refetch()
        },
        onError: (error) => {

        }
    })


    const [seconds, setSeconds] = useState(1);


    useEffect(() => {
        if (data?.data != null) {

            if (data?.data.question_detail.is_time_limit == true) {
                modalTime.onOpen()
            } else {
                setSeconds(data?.data.question_detail.time_limit * 60)
            }

        }
        return () => {
            setSeconds(1);
            modalTime.onClose()
        };
    }, [data]);


    useEffect(() => {

        if (seconds <= 0) {

            if(data?.data != null){
                if(data?.data.question_detail.time_limit != 0) {

                    modalTime.onOpen()
                }
            }

            return;
        }

        const timer = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [seconds]);

    const formatTime = (timeInSeconds) => {

        const minutes = Math.floor(timeInSeconds / 60)
            .toString()
            .padStart(2, "0");
        const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };


    const onSubmit = (id) => {
        mutate({
            id: id,
            request: questions,
        })

    }

    const choicesCondintion = (itemParent, i, answers, qsDetail) => {


        if (answers.length > 0) {
            let answerFilter = answers.filter(answer => answer.question_id === itemParent.id)[0];

            return (
                <div>
                    <p className={cn(
                        answerFilter.answer_response === itemParent.answer ? "text-green-500" : "text-red-500"
                    )}>Question {i + 1} ({itemParent.type} • Single
                        Answer) {answerFilter.answer_response === itemParent.answer ? "V" : "X"}</p>
                    <h2 className={'font-bold text-lg'}>{itemParent.title}</h2>

                    <div className={cn('mt-5 flex flex-col lg:grid  w-full lg:w-1/2 lg:grid-flow-col gap-8',

                        itemParent.type === "Fill-in-the-Blank" || itemParent.type == "Short Answer" ? '' : 'lg:grid-rows-2'
                    )}>

                        {

                            itemParent.type === "Fill-in-the-Blank" || itemParent.type == "Short Answer" ?
                                <Input disabled value={answerFilter.answer_response}
                                       placeholder={"Type your answer here"}/>
                                :


                                itemParent.choices.toString().split(',').map((item, i) => {

                                        // jawaban yang di pilih
                                        const answerchoose = answerFilter.answer_response.toString().trim().toLowerCase() === item.trim().toLowerCase()

                                        // jawaban benar
                                        const correctAnswer = itemParent.answer.toString().trim() === item.toString().trim() && answerFilter.answer_response.toString().trim() !== itemParent.answer.toString().trim()


                                        return (

                                            <Button key={item}
                                                    className={cn(
                                                        'group flex   justify-start  rounded-xl w-full lg:w-96',

                                                        //answer choose
                                                        answerchoose ? "bg-primary/90" : "bg-transparent hover:bg-transparent border-2",
                                                        //correct answer
                                                        correctAnswer ? "bg-[#E2E8F0] hover:bg-[#E2E8F0]" : ""
                                                    )}>
                                                <p className={cn(
                                                    "overflow-hidden ",
                                                    answerchoose ? "text-white" : "text-primary"
                                                )}> {arr[i] + item}</p>
                                            </Button>

                                        )

                                    }
                                )


                        }
                    </div>
                    {

                        (itemParent.type === "Short Answer" || itemParent.type === "Fill-in-the-Blank") && qsDetail.include_answer == "Yes" && qsDetail.explanations == "Yes" && (
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


                    <div className={cn('mt-5 flex flex-col lg:grid  w-full lg:w-1/2 lg:grid-flow-col gap-8',

                        itemParent.type === "Fill-in-the-Blank" || itemParent.type == "Short Answer" ? '' : 'lg:grid-rows-2'
                    )}>
                        {
                            itemParent.type === "Fill-in-the-Blank" || itemParent.type == "Short Answer" ?
                                <Input onChange={(e) => handleInput(e, itemParent.id)}
                                       placeholder={"Type your answer here"}/>
                                :
                                itemParent.choices.toString().split(',').map((item, i) => (
                                    <Button key={item} onClick={() => handleChoices(itemParent.id, item, data?.data.id)}
                                            className={cn(
                                                'group flex hover:border-0 justify-start  rounded-xl w-full lg:w-96 border-2',
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

    const handleInput = (e, id) => {
        let questionFilter = questions.filter(question => question.id !== id);

        if (e.target.value !== "") {
            questionFilter.push({
                id: id, answer: e.target.value,
            });

            setQuestions(questionFilter);

        } else {
            let newquestion = questions.filter(question => question.id !== id && question.answer === "");

            setQuestions(newquestion)
        }

    }

    const handleRegenerate = (dataRegeneration) => {

        let arrayWrongAnswer = []

        for (let i = 0; i < data?.data.question_detail.questions.length; i++) {

            const result = data?.data.answer_detail.find(item => item.answer_response != data?.data.question_detail.questions[i].answer && item.question_id == data?.data.question_detail.questions[i].id)


            if (result) {
                arrayWrongAnswer.push({
                    title: result.question.title,
                })
            }

        }


        regenerate({
            ...dataRegeneration,
            questions: arrayWrongAnswer,
        })

    }


    let arr = ["A. ", "B. ", "C. ", "D. "];
    return (
        <div className="flex flex-col h-full relative flex-1">


            <div className={cn(
                "flex-1 pb-5 cs overflow-y-auto",
                isLoading || isFetching ? "flex items-center" : ""
            )}>

                {isLoading || isFetching ? (
                    <ContentQuestionSkeleton/>
                ) : (
                    data?.data != null && (

                        <ContentDistance>

                            <HeaderContent
                                title={data?.data.question_detail.subject}
                                date={data?.data.question_detail.date}
                                solved={data?.data.question_detail.is_solved}
                                desc={`${data?.data.question_detail.type} • ${data?.data.question_detail.topic} • ${data?.data.question_detail.question_difficulty} • ${data?.data.question_detail.target_audience}`}
                            />

                            {data?.data.question_detail.questions.map((itemParent, i) => choicesCondintion(itemParent, i, data?.data.answer_detail, data?.data.question_detail))}

                        </ContentDistance>
                    )
                )}
            </div>
            {(isLoading || isFetching) || data?.data != null && (

                data?.data.question_detail.is_solved ? (


                    <div
                        className="h-[100px] overflow-hidden flex items-center justify-between gap-4 bg-white border-t-2 border-accent p-4">
                        <Button onClick={
                            () => retake(
                                {
                                    id: id
                                }
                            )

                        } className="w-full">{retakeLoading ? <Loading/> : "Retake Test"}</Button>
                        <Button onClick={() => modal.onOpen()}
                                className="w-full">{regenerateLoading ? <Loading/> : "Regenerate"}</Button>
                    </div>

                ) : (
                    <div
                        className="flex flex-col items-start justify-between gap-4 bg-white border-t-2 border-accent p-4">

                        {data?.data.question_detail.time_limit == 0 ?<></>:formatTime(seconds)}
                        <Progress value={progress} className="w-full"/>
                        <div className={'flex flex-row w-full justify-between'}>
                            <p>{progress ? progress : 0}% Complete</p>
                            <p>{questions.length}/{data?.data.question_detail.questions.length}</p>

                        </div>


                        <Button onClick={() => onSubmit(data?.data.question_detail.id)} disabled={progress !== 100}
                                className="w-full">

                            {
                                isPending ? <Loading/> : "Submit"
                            }

                        </Button>
                    </div>
                )
            )}

            {

                (isLoading || isFetching) || data?.data != null && (

                    <Suspense>
                        <QuestionModal regenerate={handleRegenerate} regenerateLoading={regenerateLoading}/>

                    </Suspense>
                )

            }

            {

                (isLoading || isFetching) || data?.data != null && (
                    <QuestionTimeModal regenerate={update} regenerateLoading={updateLoading}/>
                )

            }


        </div>
    );
}

ListQuestionContent.propTypes = {
    id: PropTypes.string,
}