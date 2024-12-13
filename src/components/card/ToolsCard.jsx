
export function ToolsCard({title, description,link}) {
    return (
        <a href={link} className="flex shadow-common p-4 gap-4 border-2 border-[#E5E7EB] rounded-lg cursor-pointer">
            <div className="h-auto w-[2px] bg-black"></div>
            <div>
                <h1  className="text-lg font-semibold ">{title}</h1>
                <p>{description}</p>
            </div>
        </a>
    )
}