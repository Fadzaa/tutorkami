import PropTypes from "prop-types";
import {cn} from "@/lib/utils.js";
import solved from "/public/check.svg"
import {useState} from "react";
import {ChevronUp} from "lucide-react";
import * as React from "react";
import {motion, AnimatePresence} from "framer-motion";
import {ListContentDetailCard} from "@/components/card/ListContentDetailCard.jsx";

export function ListContentCard({
                                    title,
                                    subTopic,
                                    handle, subTopicId
                                }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={cn("flex flex-col w-full ps-0 rounded-lg")}>
            <div className={`flex justify-between hover:bg-accent cursor-pointer rounded-sm py-1 px-1`}
                 onClick={() => setIsOpen(prevState => !prevState)}>
                <p className={`text-base font-semibold`}>{title}</p>
                <ChevronUp
                    className={`relative top-[1px] text-[#94A3B8] ml-3 h-5 w-5 transition duration-200 ${isOpen ? "rotate-180" : "rotate-90"}`}
                    aria-hidden="true"/>
            </div>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{height: 0, opacity: 0}}
                        animate={{height: 'auto', opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        transition={{duration: 0.3}}
                        className="overflow-hidden"
                    >
                        <div className="flex px-1">
                            <div className="h-auto w-[1px] bg-black"></div>
                            <div className="pt-2 pl-4 w-full">
                                {subTopic.map((item, index) => {
                                    console.log(item)
                                    return (
                                        <ListContentDetailCard title={item.sub_topic} isSolved={item.solved}
                                                               subTopicContent={item.sub_topic_content} handle={handle}
                                                               id={item.id} subTopicId={subTopicId}/>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

ListContentCard.propTypes = {
    title: PropTypes.string,
    subTopic: PropTypes.array,
    subTopicId: PropTypes.string,
    handle: PropTypes.func,
}