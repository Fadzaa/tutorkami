import PropTypes from "prop-types";
import {cn} from "@/lib/utils.js";

import { useState} from "react";
import { ChevronUp} from "lucide-react";
import * as React from "react";
import {motion,AnimatePresence} from "framer-motion";

export function ListContentDetailCard({
                                     title,
    subTopicContent,
    handle,
    id,
    subTopicId
                                 }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={`flex justify-between hover:bg-accent cursor-pointer rounded-sm py-1 px-1`} onClick={() => {
                if (subTopicId !== id && !isOpen) {
                    handle(id);
                }
                setIsOpen(prevState => !prevState);
            }}>
                <p className={`text-base font-semibold`}>{title}</p>
                <ChevronUp
                    className={`relative top-[1px] text-[#94A3B8] ml-3 h-5 w-5 transition duration-200 ${isOpen ? "rotate-180" : "rotate-90"}`}
                    aria-hidden="true" />
            </div>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="flex px-1">
                            <div className="h-auto w-[1px] bg-[#7D7D7D]"></div>
                            <div className="pl-4">
                                {subTopicContent.map((content, idx) => (
                                    <li
                                        key={idx}
                                        className="custom-list-item list-disc text-xs text-[#494545] pt-2"
                                    >
                                        {content.contents}
                                    </li>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

ListContentDetailCard.propTypes = {
    title: PropTypes.string,
    id: PropTypes.number,
    subTopicContent: PropTypes.array,
    subTopicId: PropTypes.string,
    handle: PropTypes.func,
}