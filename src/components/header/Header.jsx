import {Button} from "@/components/ui/button.jsx";
import { cn } from "@/lib/utils"
import {forwardRef, useEffect, useState} from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Link} from "react-router-dom";
import {tokenHandler} from "@/utils/tokenHandler.js";
import {useMutation, useQuery} from "@tanstack/react-query";
import {authAPI} from "@/api/auth.js";
import {toast} from "@/hooks/use-toast.js";

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
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(tokenHandler.has());
    }, []);

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



    // const initials = getInitials(data.name);
    // console.log(initials);
    //
    function getInitials(name) {
        if (!name) return "";
        return name
            .split(" ")
            .map((word) => word[0]?.toUpperCase())
            .join("");
    }
    //
    //
    //

    return (
        <div className="flex justify-between items-center w-full py-5 px-14 border-2 border-gray-200 ">
            <img src="/logo_web.svg" className={'w-32'} alt=""/>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/"  className={navigationMenuTriggerStyle()}>
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
            {isAuthenticated
                ? data !== undefined ?
                    <div className="flex items-center gap-4 font-medium">

                        <p>{data.data.name}</p>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    {/*<AvatarImage src={data?.image} />*/}
                                    <AvatarFallback className={'font-bold'}>{getInitials(data.data.name)}</AvatarFallback>

                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {/*<DropdownMenuLabel>My Account</DropdownMenuLabel>*/}

                                <DropdownMenuItem onClick={() => mutate()}>
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div> :<div></div>

                : <div className="flex gap-3">
                    <Button className="px-6" asChild>
                        <Link to={"/login"}>Sign in</Link>
                    </Button>
                    <Button asChild className="px-6 bg-white border-2 border-primary text-primary">
                        <Link to={"/register"}>Sign up</Link>
                    </Button>
                </div>
            }
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
