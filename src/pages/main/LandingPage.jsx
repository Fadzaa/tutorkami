import {ToolsCard} from "@/components/card/ToolsCard.jsx";

export function LandingPage() {
    const tools = [

        {
            title: "Roadmap Study AI",
            href: "/tools/generative-roadmap",
            description: "Rancang rencana belajarmu dengan panduan langkah-langkah yang jelas dari AI.",
        },
        {
            title: "List Questions AI",
            href: "/tools/generative-list-question",
            description:
                "Cari dan jawab pertanyaan seru buat tiap topik, biar makin paham.",
        },
        {
            title: "Generative Study Materials AI",
            href: "/tools/generative-material",
            description: "Bikin materi belajar yang pas buat kamu, cepat dan gampang.",
        },
        {
            title: "Generative LMS AI",
            href: "/tools/generative-lms",
            description:
                "Pantau progres belajarmu dan dapetin rekomendasi belajar yang pas.",
        },
    ]

    const roadmap = [

        {
            title: "Dynamic Learning Paths",
            description: "Generates personalized roadmaps based on your topics of interest.",
        },
        {
            title: "Visual Progress Tracking",
            description: "Helps you monitor your learning journey visually with a step-by-step breakdown.",
        },
        {
            title: "Topic Exploration Tree",
            description: "Offers a treeview layout for effortless topic navigation.",
        },
    ]


    return (
        <>
            {/*<div className="h-[100vh] w-full items-center justify-center flex flex-col gap-8 px-8 lg:px-14">*/}
            {/*    <img src="/logo_web.svg" className={'w-40 lg:w-60'} alt=""/>*/}
            {/*    <h1 className="text-base lg:text-2xl text-[#334155] font-medium">Ekosistem Belajar yang disesuaikan untukmu</h1>*/}
            {/*    <div className="flex flex-col lg:flex-row gap-3">*/}
            {/*        {*/}
            {/*            tools.map((tool, index) => (*/}
            {/*                <ToolsCard link={tool.href} key={tool.title} title={(index + 1 + ". ") + tool.title}*/}
            {/*                           description={tool.description}/>*/}
            {/*            ))*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*</div>*/}


            {/*<div className="h-[100vh] w-full items-center justify-center flex flex-col gap-8 px-14">*/}
            {/*    <img src="/logo_web.svg" className={'w-40 lg:w-60'} alt=""/>*/}
            {/*    <h1 className="text-base lg:text-2xl text-[#334155] font-medium text-center">Ekosistem Belajar yang disesuaikan untukmu</h1>*/}


            {/*    <img className={'w-7/12'} src="/sample.png"/>*/}


            {/*    <div className={'flex flex-col lg:flex-row gap-8'}>*/}

            {/*        {*/}
            {/*            roadmap.map(item => (*/}
            {/*                <div key={item.title} className="flex flex-col items-center">*/}
            {/*                    <p className={'font-semibold text-base lg:text-xl text-[#1E293B]'}>{item.title}</p>*/}
            {/*                    <p className={'text-[#1E293B] text-sm text-center lg:text-lg '}>{item.description}</p>*/}
            {/*                </div>*/}
            {/*            ))*/}
            {/*        }*/}


            {/*    </div>*/}

            {/*</div>*/}

            <div className="h-[100vh] p-8 lg:p-14 flex flex-col gap-8">


                <div className={'flex gap-2'}>
                    <div className={'bg-black h-20 w-0.5'}>

                    </div>
                    <div className={'flex flex-col'}>
                        <p className={'text-xl lg:text-4xl font-light'}>Roadmap AI</p>
                        <p className={'text-xl lg:text-4xl font-medium'}>Plan your learning journey with ease, tailored
                            just for you</p>
                    </div>

                </div>

                <img className={'h-full lg:w-7/12 lg:h-auto'} src="/sample.png"/>


                <div className={'flex flex-col lg:flex-row gap-8'}>

                    {
                        roadmap.map(item => (
                            <div key={item.title}>
                                <p className={'font-semibold text-lg lg:text-xl text-[#1E293B]'}>{item.title}</p>
                                <p className={'text-[#1E293B] text-base lg:text-lg '}>{item.description}</p>
                            </div>
                        ))
                    }


                </div>
            </div>

            <div className="h-[100vh] p-8 lg:p-14 flex flex-col gap-8">


                <div className={'flex gap-2'}>
                    <div className={'bg-black h-20 w-0.5'}>

                    </div>
                    <div className={'flex flex-col'}>
                        <p className={'text-xl lg:text-4xl font-light'}>Roadmap AI</p>
                        <p className={'text-xl lg:text-4xl font-medium'}>Plan your learning journey with ease, tailored
                            just for you</p>
                    </div>

                </div>

                <img className={'h-full lg:w-7/12 lg:h-auto'} src="/sample.png"/>


                <div className={'flex flex-col lg:flex-row gap-8'}>

                    {
                        roadmap.map(item => (
                            <div key={item.title}>
                                <p className={'font-semibold text-lg lg:text-xl text-[#1E293B]'}>{item.title}</p>
                                <p className={'text-[#1E293B] text-base lg:text-lg '}>{item.description}</p>
                            </div>
                        ))
                    }


                </div>
            </div>

            <div className="h-[100vh] p-8 lg:p-14 flex flex-col gap-8">


                <div className={'flex gap-2'}>
                    <div className={'bg-black h-20 w-0.5'}>

                    </div>
                    <div className={'flex flex-col'}>
                        <p className={'text-xl lg:text-4xl font-light'}>Roadmap AI</p>
                        <p className={'text-xl lg:text-4xl font-medium'}>Plan your learning journey with ease, tailored
                            just for you</p>
                    </div>

                </div>

                <img className={'h-full lg:w-7/12 lg:h-auto'} src="/sample.png"/>


                <div className={'flex flex-col lg:flex-row gap-8'}>

                    {
                        roadmap.map(item => (
                            <div key={item.title}>
                                <p className={'font-semibold text-lg lg:text-xl text-[#1E293B]'}>{item.title}</p>
                                <p className={'text-[#1E293B] text-base lg:text-lg '}>{item.description}</p>
                            </div>
                        ))
                    }


                </div>
            </div>

            <div className="h-[100vh] p-8 lg:p-14 flex flex-col gap-8">


                <div className={'flex gap-2'}>
                    <div className={'bg-black h-20 w-0.5'}>

                    </div>
                    <div className={'flex flex-col'}>
                        <p className={'text-xl lg:text-4xl font-light'}>Roadmap AI</p>
                        <p className={'text-xl lg:text-4xl font-medium'}>Plan your learning journey with ease, tailored
                            just for you</p>
                    </div>

                </div>

                <img className={'h-full lg:w-7/12 lg:h-auto'} src="/sample.png"/>


                <div className={'flex flex-col lg:flex-row gap-8'}>

                    {
                        roadmap.map(item => (
                            <div key={item.title}>
                                <p className={'font-semibold text-lg lg:text-xl text-[#1E293B]'}>{item.title}</p>
                                <p className={'text-[#1E293B] text-base lg:text-lg '}>{item.description}</p>
                            </div>
                        ))
                    }


                </div>
            </div>


        </>
    )
}



