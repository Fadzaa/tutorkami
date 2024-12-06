import {Button} from "@/components/ui/button.jsx";
import { cn } from "@/lib/utils"
import { forwardRef } from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {Link} from "react-router-dom";

const components = [
    {
        title: "Generative List Questions AI",
        href: "/tools/generative-list-question",
        description:
            "Generate list of Questions powered by AI.",
    },
    {
        title: "Generative LMS AI",
        href: "/tools/generative-lms",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

export function Header () {
    return (
        <div className="flex justify-between items-center w-full py-5 px-8 border-2 border-gray-200 ">
            <h1 className="text-2xl font-bold">LOGO</h1>
            <NavigationMenu className="ms-16">
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
            <div className="flex gap-3">
                <Button className="px-6" asChild>
                    <Link to={"/login"}>Sign in</Link>
                </Button>
                <Button asChild className="px-6 bg-white border-2 border-primary text-primary">
                    <Link to={"/register"}>Sign up</Link>
                </Button>
            </div>
        </div>
    )
}

const ListItem = forwardRef(({ className, title, children, ...props }, ref) => {
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
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
});
ListItem.displayName = "ListItem";
