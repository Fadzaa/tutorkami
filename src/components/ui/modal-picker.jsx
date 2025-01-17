import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import { Button } from "flowbite-react";

export function ModalPicker({ open, setOpen, text,handleRegenerate, setValue, value1, value2 }) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="h-full w-full fixed top-0 left-0 bg-black bg-opacity-15 z-20 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    <motion.div
                        className="relative bg-white w-3/4 lg:w-1/4 flex flex-col items-center p-6 lg:px-20 lg:py-10 rounded-xl gap-3 lg:gap-5"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1 className={`text-lg font-medium text-center pb-3`}>
                            {text}
                        </h1>
                        <div className="flex lg:w-3/4 w-full justify-evenly">
                            <Button
                                color="gray"
                                className={`hover:bg-gray-200`}
                                onClick={() => {
                                    setValue(value1);
                                    setOpen(false);
                                    handleRegenerate();
                                }}
                            >
                                {value1}
                            </Button>
                            <Button
                                color="gray"
                                className={`hover:bg-gray-200`}
                                onClick={() => {
                                    setValue(value2);
                                    setOpen(false);
                                    handleRegenerate();
                                }}
                            >
                                {value2}
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}