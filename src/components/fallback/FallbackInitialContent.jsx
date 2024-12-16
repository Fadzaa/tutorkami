import {useTranslation} from "react-i18next";


export function FallbackInitialContent({type}) {
    const { t } = useTranslation();

    const typeContent = {
        "study": {
            icon: "/public/ic_empty.svg",
            title: t('initial_head_material'),
            description: t('initial_desc_material')
        },
        "question": {
            icon: "/public/ic_empty.svg",
            title: t('initial_head_question'),
            description: t('initial_desc_question')
        },
        "roadmap": {
            icon: "/public/ic_empty.svg",
            title: t('initial_head_roadmap'),
            description: t('initial_desc_roadmap')
        },
        "lms": {
            icon: "/public/ic_empty.svg",
            title: t('initial_head_lms'),
            description: t('initial_desc_lms')
        }
    }

    const {icon, title, description} = typeContent[type]

    return (
        <div className="h-full w-full flex flex-col items-center justify-center gap-3">
            <img src={icon} alt="Icon Empty"/>
            <h1 className="font-semibold text-lg text-primary">{title}</h1>
            <p className="font-light w-1/2 text-sm text-[#9A9A9A] text-center">{description}</p>
        </div>
    )
}