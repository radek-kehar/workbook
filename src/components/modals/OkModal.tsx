import React, {Fragment, ReactNode, useRef, useState} from "react";
import {Dialog, Transition} from '@headlessui/react'
import {ExclamationTriangleIcon} from '@heroicons/react/24/outline'
import {AnswerType} from "@/components/modals/ConfirmationAlert";

export const useOkModal = () => {
    const [open, setOpen] = useState(false);

    const handleOnClose = () => {
        setOpen(false);
    }

    const handleOnOpen = () => {
        setOpen(true);
    }

    return {isOpen: open, close: handleOnClose, open: handleOnOpen}
}

export type OkModalProps = {
    isOpen: boolean,
    title: string,
    children: ReactNode,
    onClose: () => void
};

const OkModal = ({children, isOpen, title, onClose}: OkModalProps) => {
    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10 top-0 left-0 right-0" initialFocus={cancelButtonRef} onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    {children}
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent text-theme-text bg-theme-background px-4 py-2 text-base font-medium shadow-sm hover:bg-theme-background focus:outline-none focus:ring-2 focus:ring-theme-background focus:ring-offset-2 sm:text-sm"
                                        onClick={onClose}
                                    >
                                        Zavřít
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
};

export default OkModal;

