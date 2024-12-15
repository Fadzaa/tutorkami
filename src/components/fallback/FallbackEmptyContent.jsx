
export function FallbackEmptyContent() {
    return (
        <div className="flex flex-col items-center gap-3">
            <img src="/public/ic_empty.svg" alt="Icon Empty"/>
            <h1 className="font-semibold text-lg text-primary">Oops, No Questions Yet!</h1>
            <p className="font-light text-sm text-[#9A9A9A] text-center">It’s looking empty here. Add some questions to get started!</p>
        </div>
    )
}