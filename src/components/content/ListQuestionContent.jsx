import PropTypes from "prop-types";
import {useEffect, useState} from "react";
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
import {useNavigate} from "react-router-dom";
import {ContentQuestionSkeleton} from "@/components/skeleton/ContentQuestionSkeleton.jsx";
import {commonAPI} from "@/api/common.js";


export function ListQuestionContent({id,setOpenChatbot}) {


    const [questions, setQuestions] = useState([]);
    const [progress, setProgress] = useState(0)
    const [enable, setEnable] = useState(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

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
                const res = await api.post("submit", body);

                return res;
            } catch (error) {
                return makeResponseFailed({
                    message: error,
                })
            }
        },
        onSuccess: () => {
            refetch()
            queryClient.invalidateQueries(['getQuestion']);
        },
        onError: (error) => console.log("onError: " + error)

    })


    const {mutate: retake, isPending: retakeLoading} = useMutation({
        mutationKey: ["postSubmit"], mutationFn: async (body) => await commonAPI.retakeQuestion(body.id),
        onSuccess: () => {
            refetch()
            queryClient.invalidateQueries(['getQuestion']);
        },
        onError: (error) => console.log("onError: " + error)
    })


    const onSubmit = (id) => {
        mutate({
            id: id,
            request: questions,
        })

    }

    const choicesCondintion = (itemParent, i, answers) => {


        if (answers.length > 0) {
            let answerFilter = answers.filter(answer => answer.question_id === itemParent.id)[0];

            return (
                <div>
                    <p className={cn(
                        answerFilter.answer_response === itemParent.answer ? "text-green-500" : "text-red-500"
                    )}>Question {i + 1} ({itemParent.type} • Single
                        Answer) {answerFilter.answer_response === itemParent.answer ? "V" : "X"}</p>
                    <h2 className={'font-bold text-lg'}>{itemParent.title}</h2>


                    {

                        itemParent.type === "Fill in the blank" ?
                            <Input disabled value={answerFilter.answer_response}
                                   placeholder={"Type your answer here"}/>
                            :
                            <div
                                className={'mt-5 flex flex-col lg:grid lg:grid-rows-2 w-full lg:w-1/2 lg:grid-flow-col gap-8'}>
                                {
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
                    }

                    {
                        itemParent.type === "Fill in the blank" && (
                            <>
                                <h2 className={'mt-7 font-bold'}>Answer: </h2>
                                <p>{itemParent.answer}</p>
                            </>
                        )
                    }

                    <h2 className={'mt-7 font-bold'}>Explanation: </h2>
                    <p>{itemParent.explanation}</p>
                </div>
            )
        } else {
            return (
                <div>
                    <p>Question {i + 1} ({itemParent.type} • Single Answer)</p>
                    <h2 className={'font-bold text-lg'}>{itemParent.title}</h2>

                    <div className={'mt-5 flex flex-col lg:grid lg:grid-rows-2 w-full lg:w-1/2 lg:grid-flow-col gap-8'}>
                        {
                            itemParent.type === "Fill in the blank" ?
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

                            {data?.data.question_detail.questions.map((itemParent, i) => choicesCondintion(itemParent, i, data?.data.answer_detail))}

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

                        } className="w-full">{retakeLoading ?<Loading/>:"Retake Test"}</Button>
                        <Button onClick={() => navigate("/tools/generative-list-question")}
                                className="w-full">Regenerate</Button>
                    </div>

                ) : (
                    <div
                        className="flex flex-col items-start justify-between gap-4 bg-white border-t-2 border-accent p-4">

                        <p className={'font-bold text-lg text-start'}>00:00</p>
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


        </div>
    );
}

ListQuestionContent.propTypes = {
    id: PropTypes.string,
}