
export function ToolsCard({title, description}) {
    return (
        <div className="flex shadow-common p-4 gap-4 border-2 border-[#E5E7EB] rounded-lg">
            <div className="h-auto w-[2px] bg-black"></div>
            <div>
                <h1 className="text-lg font-semibold">1. {title}</h1>
                <p>{description}</p>
            </div>
        </div>
    )
}