import {ToolsCard} from "@/components/card/ToolsCard.jsx";
import {useTranslation} from "react-i18next";

export function LandingPage() {
    const {t} = useTranslation()

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

    const  landingContent = [
        {
            title: t("landing_title_1"),
            desc: t("landing_desc_1"),
        },
        {
            title: t("landing_title_2"),
            desc: t("landing_desc_2"),
        },
        {
            title: t("landing_title_3"),
            desc: t("landing_desc_3"),
        },
    ]

    const contentSection = [
        {
            name: "Generative Study Materials AI",
            image: '/material-example.png',
            header: t("landing_study_header"),
            content: [
                {
                    title: t("landing_study_title_1"),
                    image: '/material-example.png',
                    desc: t("landing_study_desc_1"),
                },
                {
                    title: t("landing_study_title_2"),
                    desc: t("landing_study_desc_2"),
                },
                {
                    title: t("landing_study_title_3"),
                    desc: t("landing_study_desc_3"),
                }
            ]
        },
        {
            name: "List Questions AI",
            image: '/question-example.png',
            header: t("landing_question_header"),
            content: [
                {
                    title: t("landing_question_title_1"),
                    desc: t("landing_question_desc_1"),
                },
                {
                    title: t("landing_question_title_2"),
                    desc: t("landing_question_desc_2"),
                },
                {
                    title: t("landing_question_title_3"),
                    desc: t("landing_question_desc_3"),
                }
            ]
        },
        {
            name: "Roadmap Study AI",
            image: '/roadmap-example.png',
            header: t("landing_roadmap_header"),
            content: [
                {
                    title: t("landing_roadmap_title_1"),
                    desc: t("landing_roadmap_desc_1"),
                },
                {
                    title: t("landing_roadmap_title_2"),
                    desc: t("landing_roadmap_desc_2"),
                },
                {
                    title: t("landing_roadmap_title_3"),
                    desc: t("landing_roadmap_desc_3"),
                }
            ],
        },
        {
            name: "Generative LMS AI",
            image: '/lms-example.png',
            header: t("landing_lms_header"),
            content: [
                {
                    title: t("landing_lms_title_1"),
                    desc: t("landing_lms_desc_1"),
                },
                {
                    title: t("landing_lms_title_2"),
                    desc: t("landing_lms_desc_2"),
                },
                {
                    title: t("landing_lms_title_3"),
                    desc: t("landing_lms_desc_3"),
                }
            ],
        }

    ]


    return (
        <>
            <div className="mt-10 h-[100vh] w-full items-center justify-center flex flex-col gap-8 px-8 lg:px-14">
                <img src="/logo_web.svg" className={'w-40 lg:w-60'} alt=""/>
                <h1 className="text-base lg:text-2xl text-[#334155] font-medium">Ekosistem Belajar yang disesuaikan untukmu</h1>
                <div className="flex flex-col lg:flex-row gap-3">
                    {
                        tools.map((tool, index) => (
                            <ToolsCard link={tool.href} key={tool.title} title={(index + 1 + ". ") + tool.title}
                                       description={tool.description}/>
                        ))
                    }
                </div>
            </div>


            <div className="h-[100vh] w-full items-center justify-center flex flex-col gap-8 px-14">
                <img src="/logo_web.svg" className={'w-40 lg:w-60'} alt=""/>
                <h1 className="text-base lg:text-2xl text-[#334155] font-medium text-center">Ekosistem Belajar yang disesuaikan untukmu</h1>


                <img className={'w-7/12'} src="/landing-example.png"/>


                <div className={'flex flex-col lg:flex-row gap-8'}>

                    {
                        landingContent.map(item => (
                            <div key={item.title} className="flex flex-col items-center">
                                <p className={'font-semibold text-base lg:text-xl text-[#1E293B]'}>{item.title}</p>
                                <p className={'text-[#1E293B] text-sm text-center lg:text-lg '}>{item.desc}</p>
                            </div>
                        ))
                    }


                </div>

            </div>

            {
                contentSection.map((item, index) => (
                    <div className="h-[100vh] p-8 lg:p-14 flex flex-col gap-10 my-4">


                        <div className={'flex gap-2'}>
                            <div className={'bg-black h-20 w-0.5'}>

                            </div>
                            <div className={'flex flex-col'}>
                                <p className={'text-xl lg:text-4xl font-light'}>{item.name}</p>
                                <p className={'text-xl lg:text-4xl font-medium'}>{item.header}</p>
                            </div>

                        </div>

                        <img className={'h-full lg:w-7/12 lg:h-[75%]'} src={item.image}/>


                        <div className={'flex flex-col lg:flex-row gap-8'}>

                            {
                                item.content.map(item => (
                                    <div key={item.title}>
                                        <p className={'font-semibold text-lg lg:text-xl text-[#1E293B]'}>{item.title}</p>
                                        <p className={'text-[#1E293B] text-base lg:text-lg '}>{item.desc}</p>
                                    </div>
                                ))
                            }


                        </div>
                    </div>
                ))
            }
        </>
    )
}



