import {useTranslation} from "react-i18next";

export function FallbackEmptyContent({type}) {
    const { t } = useTranslation();
    const typeContent = {
        "study": {
            icon: "/ic_empty.svg",
            title: t('empty_head_material'),
            description: t('empty_desc_material')
        },
        "question": {
            icon: "/ic_empty.svg",
            title: t('empty_head_question'),
            description: t('empty_desc_question')
        },
        "roadmap": {
            icon: "/ic_empty.svg",
            title: t('empty_head_roadmap'),
            description: t('empty_desc_roadmap')
        },
        "lms": {
            icon: "/ic_empty.svg",
            title: t('empty_head_lms'),
            description: t('empty_desc_lms')
        }
    }

    const {icon, title, description} = typeContent[type]

    return (
        <div className=" h-[78%] w-full flex flex-col justify-center items-center gap-3">
            <img src={icon} alt="Icon Empty"/>
            <h1 className="font-semibold text-lg text-primary text-center">{title}</h1>
            <p className="font-light text-sm text-[#9A9A9A] text-center">{description}</p>
        </div>
    )
}