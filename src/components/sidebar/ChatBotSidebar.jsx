import {
    Sidebar,
    SidebarProvider,
    SidebarTrigger
} from "@/components/ui/sidebar.jsx";
import * as React from "react";
import PropTypes from "prop-types";
import DOMPurify from 'dompurify';
import {useQuery} from "@tanstack/react-query";
import { lmsAPI} from "@/api/lms.js";
import { suggestionAPI} from "@/api/suggestion.js";
import {useEffect, useRef, useState} from "react";
import {roadmapAPI} from "@/api/roadmap.js";
import {questionAPI} from "@/api/question.js";
import {materialAPI} from "@/api/material.js";
import {Loading} from "@/components/loading/Loading.jsx";
import {chatbotAPI} from "@/api/chatbot.js";
import {marked} from "marked";
import Lottie from "lottie-react";
import loadingAnimation from "/public/loading_animation.json"
import {i} from "framer-motion/m";

export function ChatBotSidebar({id, type}) {

    const [enable, setEnable] = useState(false);
    const [isChatbot, setIsChatbot] = useState(false);
    const [chatLoading, setChatLoading] = useState(false);
    const [chatbot, setChatbot] = useState([]);
    const [prompt, setPrompt] = useState("");
    const messagesEndRef = useRef(null);

    const typeContent = {
        "Material": {
            key: "getMaterialID",
            api: () => materialAPI.getMaterialID(id),
            content : (data) => data.data.material.content,
            topic : (data) => data.data.title,
            topicId : (data) => data.data.material.id,
        },
        "Question": {
            key: "getQuestionID",
            api: () => questionAPI.getQuestionID(id),
            content : (data) => {
                const question = data.data.question_detail.question.map((item, index) => {
                    return `Question : ${index + 1} `+
                        `title : ${item.title} ` +
                        `type question : ${item.type} `+
                        `choices question : ${item.choices} ` +
                        `answer question : ${item.answer} `+
                        `explanation question : ${item.explanation} `;
                })

                return question.join("   ")
            },
            topic : (data) => data.data.question_detail.title,
            topicId : (data) => data.data.question_detail.id,
        },
        "Roadmap": {
            key: "getRoadmapID",
            api:  () => roadmapAPI.getRoadmapID(id),
            content : (data) => {
                const roadmap = data.data.roadmap.map((item, index) => {
                    return `Roadmap : ${index + 1} `+
                        `type : ${data.data.type} ` +
                        `title roadmap : ${item.title} `+
                        `knowledge level roadmap : ${data.data.knowledge_level} ` +
                        `goal level roadmap : ${data.data.goal_level} `+
                        `description roadmap : ${item.desc} ` +
                        `detail description roadmap : ${item.detail_desc} ` +
                        `reference roadmap : ${item.references.map((i, index) => {
                            return `reference : ${index + 1} `+
                                `type : ${i.type} ` +
                                `content : ${i.content}`
                        }).join("     ")}`;
                })

                return roadmap.join("   ")
            },
            topic : (data) => data.data.title,
            topicId : (data) => data.data.id,
        },
        "Lms": {
            key: "getLmsID",
            api: () => lmsAPI.getLmsDetail(id, {regenerate : false}),
            content : (data) => data.result.detail_content,
            topic : (data) => data.result.sub_topic,
            topicId : (data) => data.result.id,
        }
    }
    const { api, key, content, topic, topicId} = typeContent[type]

    const { isLoading, data, isFetching, refetch } = useQuery({
        queryKey: [key],
        queryFn: api,
        enabled: enable,
    });

    const {
        isLoading: isSuggestionLoading,
        data: suggestionData,
        isFetching: isFetchingSuggestion,
        refetch: refetchSuggestion
    } = useQuery({
        queryKey: ["getQuestionSuggestion"],
        queryFn: async () => {
            return await suggestionAPI.getQuestionSuggestion({
                sub_topic : content(data)
            })
        },
        enabled: false
    });

    const {
        isLoading: isChatbotLoading,
        data: chatbotData,
        isFetching: isFetchingChatbot,
        refetch: refetchChatbot
    } = useQuery({
        queryKey: ["getChatbot"],
        queryFn: async () => {
            return await chatbotAPI.getChatbot(type,topicId(data)).then((response) => {
                setChatbot(response);
                return response;
            })
        },
        enabled: false
    });

    const handleChatbot = async (prompt) => {
        if (prompt !== "") {
            setChatLoading(true);
            setIsChatbot(false);
            if (chatbot.length !== 0) {
                const newUserMessage = {
                    prompt: prompt,
                    role: "user"
                };
                chatbotData.push(newUserMessage);
                setChatbot((prevData) => [...prevData, newUserMessage]);
            } else {
                const newMessage = [
                    {
                        content: "",
                        role: "dummy",
                    },
                    {
                        content: "",
                        role: "dummy",
                    },
                    {
                        prompt: prompt,
                        role: "user"
                    }
                ];
                newMessage.forEach((message) => {
                    chatbotData.push(message);
                })
                setChatbot(newMessage);
            }
            setPrompt("");
            try {await chatbotAPI.postChatbot({
                    prompt,
                    type,
                    content: content(data),
                    topic: topic(data)
                }, topicId(data)).then((res) => {
                const newSystemMessage = {
                    content: res.data.content,
                    role: "system",
                };
                chatbotData.push(newSystemMessage);
                setChatbot((prevData) => [
                    ...prevData,
                    newSystemMessage
                ]);
                setChatLoading(false);
            });
            } catch (error) {
                console.error("Failed to fetch chatbot response:", error);
            }
        }
    };

    useEffect(() => {
        if (enable && id) {
            refetch();
        } else if (id) {
            setEnable(true);
        }

        if (data !== undefined) {
            refetchChatbot();
        }

        if (!chatbotData) {
            refetchSuggestion();
            setIsChatbot(true);
        } else {
            if (chatbotData.length !== 0) {
                setIsChatbot(false);
            } else {
                refetchSuggestion();
                setIsChatbot(true);
            }
        }

    }, [id,data,chatbotData]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [chatbot])

    return (
        <SidebarProvider defaultOpen={false} className="hidden lg:block">
            <div className={'fixed w-1/4'}>
                <Sidebar side="right" className={'w-full absolute bg-[#F8F8F8] rounded-l-lg'}>
                    <div className={'flex items-end justify-between mx-4 pt-4 pb-5'}>
                        <SidebarTrigger className={`rotate-180`} />

                        <img src="/logo_web.svg" className={'w-20 lg:w-40'} alt=""/>
                    </div>
                    {
                        isChatbot ?
                        isSuggestionLoading || isFetching|| isFetchingSuggestion || isFetchingChatbot ? (
                            <Loading/>
                        ) : (
                            <div className={`flex flex-col h-2/3 justify-center items-center`}>
                                <span className={`font-semibold text-2xl`}>Hello There</span>
                                <span className={`font-light text-lg`}>Ask anything related current topic</span>
                                <div className={`h-9`}/>
                                <div className={`flex flex-col justify-center items-center gap-4`}>
                                    {suggestionData && Object.entries(suggestionData.data).map(([key, question]) => (
                                        <div key={key} onClick={() => handleChatbot(question)} className={`cursor-pointer hover:bg-gray-200 bg-white w-5/6 flex p-5 gap-3 rounded-lg`}>
                                            <div className="h-auto w-[3px] bg-black"></div>
                                            <span className={`text-sm`}>{question}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                            :
                            isSuggestionLoading || isFetching || (!isChatbot ? isFetchingSuggestion : false) || isFetchingChatbot ? <></> : (
                                <div ref={messagesEndRef}
                                     className={`w-full flex flex-col gap-4 overflow-scroll px-4 pb-12`}
                                     style={{height: "80%"}}
                                >
                                    {chatbot ?
                                        chatbot.filter((_, index) => index > 1).map((item, index) => (
                                            item.role === "user" ?
                                                (
                                                    <div key={index} className={`flex justify-end`}>
                                                        <div className={`justify-end text-start flex w-3/4 relative`}>
                                                            <span
                                                                className={`bg-[#282828] py-2 px-3 rounded-l-lg rounded-br-lg text-white`}>{item.prompt}</span>
                                                        </div>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div key={index} className={`flex justify-start`}>
                                                        <div className={`justify-start text-start flex w-3/4 relative`}>
                                                            <span
                                                                dangerouslySetInnerHTML={{
                                                                    __html: DOMPurify.sanitize(marked(item.content)),
                                                                }}
                                                                className={`bg-white py-2 px-3 rounded-r-lg rounded-bl-lg text-black`}></span>
                                                        </div>
                                                    </div>
                                                )
                                        )) : <Loading/>
                                    }
                                    {
                                        chatLoading ? <div className={`flex justify-start`}>
                                            <div className={`justify-start text-start flex w-3/4 relative`}>
                                                <span className={`bg-white py-0.5 px-3 relative rounded-r-lg rounded-bl-lg text-[#c0bfbd]`}>
                                                    <Lottie animationData={loadingAnimation} className={`w-12 h-12`}/>
                                                </span>
                                            </div>
                                        </div>
                                            : <></>
                                    }
                                    <div ref={messagesEndRef}></div>
                                </div>
                            )
                    }
                    {
                        isSuggestionLoading || isFetching || (!isChatbot ? isFetchingSuggestion : false) || isFetchingChatbot ? <></> : (
                            <div className={`absolute flex justify-evenly pt-4 bottom-0 h-1/6 bg-white w-full`}>
                                <input
                                    className={`bg-[#F8F8F8] h-1/3 w-3/4 rounded-3xl outline-none p-3`}
                                    placeholder={"Ask AI here...."}
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleChatbot(prompt);
                                        }
                                    }}
                                />
                                <div className={'flex h-1/3'}>
                                    <img src="/send.svg" className={'w-14 lg:w-16 cursor-pointer'} alt=""
                                         onClick={() => handleChatbot(prompt)} />
                                </div>
                            </div>
                        )
                    }
                </Sidebar>
            </div>
            <main>
                <SidebarTrigger className={'absolute right-0 mt-5 z-20'}/>
            </main>
        </SidebarProvider>
    )
}

ChatBotSidebar.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string
}