import {ListQuestionCard} from "@/components/card/ListQuestionCard.jsx";
import {Button} from "@/components/ui/button.jsx";

export function ListQuestionSidebar() {
    const data = [
        {
            title: "Geometry",
            date: "20 Nov 2024",
            total_questions: 20,
            proficiency: "Expert",
            category: "Science",
            isSolved: false
        },
        {
            title: "Geometry",
            date: "20 Nov 2024",
            total_questions: 20,
            proficiency: "Expert",
            category: "Science",
            isSolved: false
        },
        {
            title: "Geometry",
            date: "20 Nov 2024",
            total_questions: 20,
            proficiency: "Expert",
            category: "Science",
            isSolved: false
        },
        {
            title: "Geometry",
            date: "20 Nov 2024",
            total_questions: 20,
            proficiency: "Expert",
            category: "Science",
            isSolved: false
        },
        {
            title: "Geometry",
            date: "20 Nov 2024",
            total_questions: 20,
            proficiency: "Expert",
            category: "Science",
            isSolved: false
        },
        {
            title: "Geometry",
            date: "20 Nov 2024",
            total_questions: 20,
            proficiency: "Expert",
            category: "Science",
            isSolved: false
        },
        {
            title: "Geometry",
            date: "20 Nov 2024",
            total_questions: 20,
            proficiency: "Expert",
            category: "Science",
            isSolved: false
        },
        {
            title: "Geometry",
            date: "20 Nov 2024",
            total_questions: 20,
            proficiency: "Expert",
            category: "Science",
            isSolved: false
        },
        {
            title: "Geometry",
            date: "20 Nov 2024",
            total_questions: 20,
            proficiency: "Expert",
            category: "Science",
            isSolved: false
        },

    ]

    return (
        <div className="h-full w-1/3 py-6 px-8 pe-0 border-e-2 border-[#AEAEAE]">
            <h1 className="font-medium text-xl">List Questions</h1>

            <div className="h-[85%] overflow-y-auto my-5">
                {data.map((item, index) => (
                        <ListQuestionCard
                            key={index}
                            title={item.title}
                            date={item.date}
                            total_questions={item.total_questions}
                            proficiency={item.proficiency}
                            category={item.category}
                            isSolved={item.isSolved}
                        />
                    )
                )}
            </div>

            <Button>Add New Questions</Button>

        </div>
    )
}