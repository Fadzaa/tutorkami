import {ToolsCard} from "@/components/card/ToolsCard.jsx";

export function LandingPage() {
    const tools = [
        {
            title: "Geometry",
            description: "Learn Geometry with our interactive tools",
        },
        {
            title: "English",
            description: "Learn Geometry with our interactive tools",
        },
        {
            title: "Math",
            description: "Learn Geometry with our interactive tools",
        },
        {
            title: "Biology",
            description: "Learn Geometry with our interactive tools",
        },

    ]


    return (
        <div className="h-[65vh] w-full items-center justify-center flex flex-col gap-8 px-14">
            <h1 className="text-3xl font-bold">LOGO</h1>
            <h1 className="text-3xl font-medium">What do you want to Study Today?</h1>
            <div className="flex gap-3">
                {
                    tools.map((tool) => (
                        <ToolsCard key={tool.title} title={tool.title} description={tool.description}/>
                    ))
                }
            </div>
        </div>
    )
}



