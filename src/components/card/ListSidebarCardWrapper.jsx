import {  formatInTimeZone } from 'date-fns-tz';
import {ListQuestionCard} from "@/components/card/ListQuestionCard.jsx";
import {format} from "date-fns";
import {ListSidebarCard} from "@/components/card/ListSidebarCard.jsx";

export function ListSidebarCardWrapper ({ item, type, userTimeZone }) {

    const lmsTotalSolved = () => {
        let solved = 0;
        item.subject_detail_lms.lms.topic.forEach((item) => item.sub_topic.forEach((sub) => {
            if (sub.solved) {
                solved++;
            }
        }))
        return solved;
    }

    const lmsLength = () => {
        let length = 0;
        item.subject_detail_lms.lms.topic.forEach((item) =>
            length = length + item.sub_topic.length
        )
        return length;
    }

    const lmsIsSolved = () => {
        return lmsTotalSolved() === lmsLength();
    }


    if (type === "lms") {
        return (
            <ListSidebarCard
                key={item.id}
                subject={item.subject}
                topic={item.topic}
                id={item.id}
                date={format(item.date, "Y-M-dd")}
                type={item.type}
                subId={item.subject_detail_lms.lms.topic[0].sub_topic[0].id}
                desc={`${item.subject_detail_lms.difficulty} • ${item.subject_detail_lms.activity_type}`}
                isSolved={true}
                totalSolve={lmsTotalSolved().toString()}
                length={lmsLength().toString()}
            />
        );
    }

    if (type === "study") {
        return (
            <ListSidebarCard
                key={item}
                title={item.subject}
                topic={item.topic}
                subject={item.subject}
                id={item.id}
                date={format(item.date, "Y-M-dd")}
                type={item.type}
                desc={`${item.output_format} • ${item.proficiency_level} • ${item.style_customization} • `}
            />
        );
    }

    if (type === "roadmap") {
        return (
            <ListSidebarCard
                key={item}
                id={item.id}
                title={item.topic}
                topic={item.topic}
                type={item.type}
                subject={item.subject}
                isSolved={item.is_solved}
                date={format(item.date, "Y-M-dd")}
                desc={`${item.subject_detail_roadmap.user_proficiency_level} • ${item.subject_detail_roadmap.proficiency_level} • ${item.subject_detail_roadmap.timeline}`}
                totalSolve={item.subject_detail_roadmap.roadmap.filter((item) => item.solved === 1).length}
                length={item.subject_detail_roadmap.roadmap.length}
            />
        );
    }

    if (type === "question") {
        return (
            <ListSidebarCard
                key={item}
                id={item.id}
                title={item.subject}
                type={item.type}
                isSolved={item.is_solved}
                date={format(item.date, "Y-M-dd")}
                desc={`${item.questions[0]?.type || ""} • ${item.total} Questions • ${item.question_difficulty}`}
                subject={item.subject}
                topic={item.topic}
            />
        );
    }


}

