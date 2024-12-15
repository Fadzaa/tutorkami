

export function FallbackInitialContent() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center gap-3">
            <img src="/public/ic_empty.svg" alt="Icon Empty"/>
            <h1 className="font-semibold text-lg text-primary">Build Your Learning Roadmap!</h1>
            <p className="font-light text-sm text-[#9A9A9A] text-center">Get started by creating a personalized roadmap.
                Choose your topics, set your pace, and let's chart your path to success!</p>
        </div>
    )
}