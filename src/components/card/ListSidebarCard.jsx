import PropTypes from "prop-types";
import {cn} from "@/lib/utils.js";
import {useLocation, useNavigate} from "react-router-dom";
import {SlOptionsVertical} from "react-icons/sl";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {useMutation} from "@tanstack/react-query";
import {api} from "@/api/api.js";
import {Button} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {FaRegTrashAlt} from "react-icons/fa";
import {commonAPI} from "@/api/common.js";

export function ListSidebarCard({
                                     title, date, desc, isSolved, type, id, storage, subId
                                 }) {


    const form = useForm()
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const {mutate} = useMutation({
        mutationFn: async (id) => await commonAPI.deleteQuestion(`${type.toString().toLowerCase()}/${id}`),
        onSuccess: () => navigate(`/tools/generative-${type.toString().toLowerCase()}/`),
        onError: (error) => console.log("onError :" + error)
    })

    const handleToDetail = (id) => type === "LMS" ? navigate(`/tools/generative-${type.toString().toLowerCase()}/detail/${id}/${subId}`) : navigate(`/tools/generative-${type.toString().toLowerCase()}/detail/${id}`);
    const onSubmit = (data) => mutate(data)

    return (<div
        className={cn(
            "flex w-full p-4 ps-0 gap-4 rounded-lg hover:bg-accent cursor-pointer",
            pathname.toString().includes(id) ? "bg-accent" : "", storage ? 'bg-accent' : '')
        }
        onClick={() => handleToDetail(id)}>

        <hr className="h-auto w-[1px] bg-black"/>

            <div className="w-full flex flex-col justify-between gap-3">

                <section className={'flex flex-col gap-3'}>

                    <div className={'flex justify-between'}>
                        <p className="text-xl lg:text-base">{desc}</p>

                        <DeleteDropdown/>
                    </div>

                    <h1 className="text-base lg:text-lg font-semibold">{title}</h1>
                </section>

                <section className={cn("flex justify-between",)}>
                    <strong className="text-sm lg:text-base">{isSolved ? "Solved" : type}</strong>

                    <p>{date}</p>
                </section>


            </div>
        </div>
    )

    function DeleteDropdown() {

        return (
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <SlOptionsVertical
                        className="w-3 lg:w-5"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel className={'cursor-pointer'}>


                        <div className={'flex items-center text-red-600'}>

                            <FaRegTrashAlt/>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                                <Button className={'bg-transparent hover:bg-transparent'}
                                        onClick={() => onSubmit(id)}>
                                    <p className={'text-red-600'}>Delete</p>

                                </Button>
                            </form>

                        </div>


                    </DropdownMenuLabel>

                </DropdownMenuContent>
            </DropdownMenu>
        )

    }
}



ListSidebarCard.propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    id: PropTypes.number,
    subId: PropTypes.number,
    desc: PropTypes.string,
    type: PropTypes.string,
    isSolved: PropTypes.bool,
    storage: PropTypes.bool,
    handleEnable: PropTypes.func
}