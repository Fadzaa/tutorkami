import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert.jsx"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion.jsx"
import React from "react";
import {Button} from "@/components/ui/button.jsx";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog.jsx"

// export function AlertDemo() {
//     return (
//         <Alert>
//             <AlertTitle>Heads up!</AlertTitle>
//             <AlertDescription>
//                 You can add components to your app using the cli.
//             </AlertDescription>
//         </Alert>
//     )
// }

// export function ShadcnTestComponent() {
//
//     return (
//         <div>
//             <Button>Click me</Button>
//         </div>
//     )
// }

// export function ShadcnTestComponent() {
//
//     return (
//         <Accordion type="single" collapsible>
//             <AccordionItem value="item-1">
//                 <AccordionTrigger>Is it accessible?</AccordionTrigger>
//                 <AccordionContent>
//                     Yes. It adheres to the WAI-ARIA design pattern.
//                 </AccordionContent>
//             </AccordionItem>
//         </Accordion>
//     )
// }
export function ShadcnTestComponent() {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}