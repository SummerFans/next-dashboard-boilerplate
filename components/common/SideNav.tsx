import { classNames } from "@/utils/common";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation"; // usePathname is a hook now imported from navigation
import { Fragment } from "react";
import { DynamicIcon } from "./DynamicIcon";

export default function SideNav(
    { sidebarOpen, setSidebarOpen, navigation, lang, }: {
        sidebarOpen: boolean,
        setSidebarOpen: any,
        navigation: Navigation[];
        lang: Lang;
    }
) {

    const pathname = usePathname();

    return (
        <>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>

                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <img
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                            alt="Your Company"
                                        />
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul role="list" className="-mx-2 flex-1 space-y-1">
                                            {navigation.map((item) => {

                                                const isHome = item.href.replace(`/${lang}`, '') === '/'

                                                return (
                                                    <li key={item.key}>
                                                        <Link
                                                            href={item.href}
                                                            className={classNames(
                                                                pathname.includes(item.href, 0)&&!isHome
                                                                    ? 'bg-gray-800 text-white'
                                                                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                            )}
                                                        >
                                                            <DynamicIcon icon={item.icon} className="h-6 w-6 shrink-0 text-gray-500" />
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}