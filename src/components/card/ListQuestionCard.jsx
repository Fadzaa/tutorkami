import PropTypes from "prop-types";

export function ListQuestionCard({title, date, total_questions, proficiency, category, isSolved}) {
    return (
        <div className="flex w-full p-4 ps-0 gap-4 rounded-lg">
            <div className="h-auto w-[1px] bg-black"></div>
            <div className="w-full flex flex-col gap-3">
                <p>{total_questions} Questions • {proficiency} • {category}</p>
                <h1 className="text-lg font-semibold">{title}</h1>
                <div className="flex justify-between">
                    <p>{isSolved ? "Solved" : "Unsolved"}</p>
                    <p>{date}</p>
                </div>
            </div>
        </div>
    )
}

ListQuestionCard.propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    total_questions: PropTypes.number,
    proficiency: PropTypes.string,
    category: PropTypes.string,
    isSolved: PropTypes.bool
}