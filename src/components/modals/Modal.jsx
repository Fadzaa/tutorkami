import {useCallback, useEffect, useState} from 'react'
import {Close} from '@mui/icons-material'
import PropTypes from "prop-types";
import {Button} from "@/components/ui/button.jsx";
import {Loading} from "@/components/loading/Loading.jsx";


const Modal = ({
    isEasyInOut,
                   isOpen,
                   onClose,
                   onSubmit,
                   title,
                   body,
                   footer,
                   actionLabel,
                   disabled,
                   regenerateLoading
               }) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }

        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300)

    }, [disabled, onClose]);

    // Just to check whether component is disabled or not before submitting
    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }
        onSubmit();

    }, [disabled, onSubmit]);



    if (!isOpen) {
        return null;
    }

    return (<>
            <div
                className="
        justify-center
        items-center
        flex
        overflow-x-hidden
        overflow-y-auto
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        bg-neutral-800/70
    ">
                <div
                    className="
            relative
            w-full
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            my-6
            mx-auto
            h-full
            lg:h-auto
            md:h-auto
        ">
                    <div
                        className={`
                translate
                duration-300
                h-full  
                ${showModal
                            ? isEasyInOut
                                ? 'scale-100'
                                : 'translate-y-0'
                            : isEasyInOut
                                ? 'scale-0'
                                : 'translate-y-full'
                        }
                ${showModal ? 'opacity-100' : 'opacity-0'}
            `}>


                        <div
                            className="
                    translate
                    h-full
                    lg:h-auto
                    md:h-auto
                    relative
                    rounded-xl
                    shadow-lg
                    border-0
                    flex
                    flex-col
                    w-full
                    bg-white
                    outline-none
                    focus:outline-none
                ">

                            <div
                                className="
                    flex
                    items-center
                    px-6
                    pt-6
                    pb-3
                    rounded-t
                    justify-start
                    relative

                    ">


                                <div
                                    className="
                        text-xl
                        font-semibold"
                                >
                                    {title}
                                </div>

                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="
                            p-1
                            border-0
                            hover:opacity-70
                            transition
                            absolute
                            right-9
                        ">
                                    <Close
                                        className="text-gray-800 sm"/>
                                </button>
                            </div>


                            <div className="relative px-6 pb-3 flex-auto">
                                {body}
                            </div>

                            <div className="flex flex-col gap-2 pb-8 pt-2 px-6">
                                <div
                                    className="
                            flex
                            flex-row
                            gap-4
                            w-full
                            items-center
                        ">

                                    <Button
                                        className={'w-full'}
                                        disabled={disabled}
                                        onClick={handleSubmit}
                                        type="button">
                                        {
                                            regenerateLoading === true ?<Loading/>: actionLabel
                                        }
                                    </Button>
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>)
}

Modal.propTypes = {
    progress: PropTypes.number,
    isOpen: PropTypes.bool,
    isEasyInOut: PropTypes.bool,
    title: PropTypes.string,
    body: PropTypes.element,
    footer: PropTypes.element,
    actionLabel: PropTypes.string,
    disabled: PropTypes.bool,
    secondaryActionLabel: PropTypes.string,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
    secondaryAction: PropTypes.func,
    regenerateLoading: PropTypes.bool,
}
export default Modal