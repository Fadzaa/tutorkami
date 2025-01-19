import {  formatInTimeZone } from 'date-fns-tz';
import {ListQuestionCard} from "@/components/card/ListQuestionCard.jsx";
import {format} from "date-fns";
import {ListSidebarCard} from "@/components/card/ListSidebarCard.jsx";

export function ListSidebarCardWrapper ({ item, type, userTimeZone }) {

    const desc = () => {
        if (type === "lms") {
            return `${item.subject_detail_lms.difficulty} • ${item.subject_detail_lms.activity_type}`;
        } else if (type === "study") {
            console.log(item)
            return `${item.proficiency_level} • ${item.style_customization} • ${item.output_format}`;
        } else if (type === "roadmap") {
            console.log(item)
            return `${item.subject} • ${item.subject_detail_roadmap.proficiency_level} • ${item.subject_detail_roadmap.timeline}`;
        } else if (type === "question") {
            console.log(item)
            return `${item.topic} • ${item.question_difficulty} • ${item.target_audience}`;
        }
    }

    return (
        <ListSidebarCard
            title={item.subject}
            key={item.id}
            id={item.id}
            date={formatInTimeZone(new Date(item.date), userTimeZone, "yyyy-MM-dd")}
            type={item.type}
            desc={desc().toString()}
            isSolved={item.is_solved || item.solved}
            subId={type === "lms" ? item.subject_detail_lms.lms.topic[0]?.sub_topic[0]?.id : undefined}
        />
    );
};
