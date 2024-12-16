import {Button} from "@/components/ui/button.jsx";
import { cn } from "@/lib/utils"
import {forwardRef, useEffect, useState} from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Link, useNavigate} from "react-router-dom";
import {tokenHandler} from "@/utils/tokenHandler.js";
import {useMutation, useQuery} from "@tanstack/react-query";
import {authAPI} from "@/api/auth.js";
import {toast} from "@/hooks/use-toast.js";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import {useTranslation} from "react-i18next";
import {Loading} from "@/components/loading/Loading.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";

const components = [

    {
        title: "Roadmap Study AI",
        href: "/tools/generative-roadmap",
        description: "Rancang rencana belajarmu dengan panduan langkah-langkah yang jelas dari AI.",
    },
    {
        title: "List Questions AI",
        href: "/tools/generative-question",
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

export function Header () {
    const { t, i18n } = useTranslation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsAuthenticated(tokenHandler.has());
    }, []);


    const navigate = useNavigate()
    const {mutate} = useMutation({

        mutationFn: async () => {
            return authAPI.logout()
        },

        onSuccess: (data, variables, context) => {
            toast({
                title: "Logout Success",
                description: "You have successfully logout",
            })

            tokenHandler.unset()
            setIsAuthenticated(false)
            navigate("/login")
        },

        onError: (error, variables, context) => {
            console.log("onError")
            console.log(error)

            toast({
                variant: "destructive",
                title: "Logout Failed",
                description: "Failed to logout",
            })
        },

        onMutate: async () => {

        },

    })

    const {data, isLoading } = useQuery({
        queryKey: ["getUser"],
        queryFn: authAPI.getUser,
    });


    function getInitials(name) {
        if (!name) return "";
        return name
            .split(" ")
            .map((word) => word[0]?.toUpperCase())
            .join("");
    }

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng).then(r => console.log(r));
    };

    return (
        <div className="fixed top-0 bg-white flex justify-between items-center w-full py-5 p-6 lg:px-14 border-2 border-gray-200 ">

            <Link to={"/"}> <img src="/logo_web.svg" className={'w-32'} alt=""/></Link>
            <div className="flex items-center gap-5">
                <div className="flex gap-2 lg:hidden">
                    <div onClick={() => changeLanguage('id')} className="cursor-pointer">ID</div>
                    <div>|</div>
                    <div onClick={() => changeLanguage('en')} className="cursor-pointer">EN</div>
                </div>

                <CiMenuBurger size={24} onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-primary"/>
            </div>
            {
                isOpen ? <
                    NavMobileMenu
                    onClick={() => setIsOpen(!isOpen)}
                    isAuthenticated={isAuthenticated}
                    components={components}
                /> : <></>
            }

            <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                            Home
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {components.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Dashboard
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <div className="hidden lg:flex items-center gap-5">
                {isAuthenticated
                    ?
                    isLoading && data === undefined ? <div className="flex items-center gap-5">
                            <Skeleton className="text-transparent">
                                <p>ata.data.name</p>
                            </Skeleton>

                            <Skeleton className="text-transparent rounded-full">
                                <Avatar/>
                            </Skeleton>
                        </div> :

                        <div className="lg:flex items-center gap-4 font-medium hidden">

                            <p>{data.data.name}</p>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar>
                                        <AvatarFallback className={'font-bold'}>

                                            {
                                                data.data.image ?

                                                    <img src={data.data.image} alt=""/>
                                                    :
                                                    getInitials(data.data.name)
                                            }


                                        </AvatarFallback>

                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {/*<DropdownMenuLabel>My Account</DropdownMenuLabel>*/}

                                    <DropdownMenuItem onClick={() => mutate()}>
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </div>

                    : <div className="lg:flex gap-3 hidden">
                        <Button className="px-6" asChild>
                            <Link to={"/login"}>Sign in</Link>
                        </Button>
                        <Button asChild className="px-6 bg-white border-2 border-primary text-primary">
                            <Link to={"/register"}>Sign up</Link>
                        </Button>
                    </div>
                }

                <div className="lg:flex gap-2 hidden">
                    <div onClick={() => changeLanguage('id')} className="cursor-pointer">ID</div>
                    <div>|</div>
                    <div onClick={() => changeLanguage('en')} className="cursor-pointer">EN</div>
                </div>
            </div>

        </div>
    )
}

const ListItem = forwardRef(({className, title, children, ...props}, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-md font-bold leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
});
ListItem.displayName = "ListItem";


const NavMobileMenu = ({onClick, isAuthenticated}) => {
    const [isOpenTools, setIsOpenTools] = useState(false)


    return (
        <div className="flex flex-col gap-9 w-screen h-screen fixed top-0 left-0 z-20 py-5 p-6 bg-white lg:hidden">
            <div className="flex w-full justify-between items-center ">
                <img src="/logo_web.svg" className={'w-32'} alt=""/>
                <IoCloseOutline size={24} onClick={onClick} className="text-primary"/>
            </div>

            <div className="flex flex-col gap-7">
                <Link to={'/'}><h3 className="font-semibold text-lg cursor-pointer">Home</h3></Link>
                <div className="flex flex-col">
                    <div onClick={() => setIsOpenTools(!isOpenTools)} className="flex w-full items-center justify-between cursor-pointer">
                        <h3 className="font-semibold text-lg" >Tools</h3>
                        {isOpenTools
                            ? <IoIosArrowForward className="rotate-90" />
                            : <IoIosArrowForward />
                        }
                    </div>

                    {
                        isOpenTools
                            ? <div className="py-3 flex flex-col gap-7">
                                {
                                    components.map((component) => (
                                        <Link to={component.href}>
                                            <div className="cursor-pointer">
                                                <h2 className="font-semibold">{component.title}</h2>
                                                <p className="text-xs text-[#64748B] leading-5">{component.description}</p>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                            : <></>
                    }
                </div>
                <Link to={'/test'}><h3 className="font-semibold text-lg cursor-pointer">Dashboard</h3></Link>
            </div>

            {
                isAuthenticated
                    ? <Button className=" w-full px-6 h-11 bg-white border-2 border-[#FF8484] text-[#FF8484]" asChild>
                        <div>
                            <CiLogout />
                            <p>Log out</p>
                        </div>
                    </Button>
                    : <div className="flex w-full gap-4">
                        <Button className="w-full px-6 h-11" asChild>
                            <Link to={"/login"}>Sign in</Link>
                        </Button>
                        <Button className=" w-full px-6 h-11 bg-white border-2 border-primary text-primary" asChild>
                            <Link to={"/register"}>Sign up</Link>
                        </Button>
                    </div>
            }
        </div>
    )
}
