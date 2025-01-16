import {  formatInTimeZone } from 'date-fns-tz';
import {ListQuestionCard} from "@/components/card/ListQuestionCard.jsx";

export function ListQuestionCardWrapper ({ item, type, userTimeZone }) {

    return (
        <ListQuestionCard
            title={item.title}
            key={item.id}
            id={item.id}
            date={formatInTimeZone(new Date(item.date), userTimeZone, "yyyy-MM-dd")}
            isQuestion={item.is_question}
            category={item.knowledge_level}
            proficiency={item.goal_level}
            type={item.type}
            isSolved={item.is_solved || item.solved}
            subTopicId={type === "lms" ? item.lms.topic[0]?.sub_topic[0]?.id : undefined}
        />
    );
};
