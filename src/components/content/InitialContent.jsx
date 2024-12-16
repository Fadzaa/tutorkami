import {useTranslation} from "react-i18next";


import {materialAPI} from "@/api/material.js";
import {SheetContentMobile} from "@/components/content/SheetContentMobile.jsx";



export function InitialContent({type}) {
    const { t } = useTranslation();

    const typeContent = {
        "study": {
            icon: "/public/ic_empty.svg",
            name: "Material Study AI",
            list_name: "List Material",
            title: t('initial_head_material'),
            description: t('initial_desc_material'),
            route: "/tools/generative-material/create",
            key: "getMaterial",
            fallbackType: "study"
        },
        "question": {
            icon: "/public/ic_empty.svg",
            name: "List Questions AI",
            title: t('initial_head_question'),
            description: t('initial_desc_question'),
        },
        "roadmap": {
            icon: "/public/ic_empty.svg",
            name: "Roadmap Study AI",
            title: t('initial_head_roadmap'),
            description: t('initial_desc_roadmap'),
        },
        "lms": {
            icon: "/public/ic_empty.svg",
            name: "Generative LMS AI",
            title: t('initial_head_lms'),
            description: t('initial_desc_lms'),
        }
    }

    const {icon, name,title, description} = typeContent[type]

    return (
        <div className="h-full w-full p-5 flex flex-col items-center lg:justify-center justify-between gap-3">

            <div className="flex w-full items-center justify-between lg:hidden">
                <SheetContentMobile type={type}/>
                <h1 className="font-semibold">{name}</h1>
                <div></div>
            </div>

            <div className="flex flex-col items-center justify-center">
                <img src={icon} alt="Icon Empty"/>
                <h1 className="font-semibold text-lg text-primary">{title}</h1>
                <p className="font-light w-2/3 lg:w-1/2 text-sm text-[#9A9A9A] text-center">{description}</p>
            </div>

            <div></div>
        </div>
    )
}