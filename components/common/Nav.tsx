
'use client'
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation"; // usePathname is a hook now imported from navigation
import { classNames } from "@/utils/common";
import { DynamicIcon } from "./DynamicIcon";




export type NavProps = {
    navigation: Navigation[]
}

// 
export default function Nav({
    navigation,
    lang
}: {
    navigation: Navigation[];
    lang: Lang;
}) {
    const pathname = usePathname()

    return (
        <>
            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto border-r border-gray-100 dark:border-gray-800 lg:bg-gray-50 lg:dark:bg-gray-900 lg:pb-4">
                <div className="flex h-16 shrink-0 items-center justify-center">
                    <Link href="/">
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                            alt="Your Company"
                        />
                    </Link>
                </div>
                <nav className="mt-8">
                    <ul role="list" className="flex flex-col items-center space-y-1">
                        {navigation.map((item) => {

                            const isActived = () => {
                                if (pathname == item.href && pathname == `/${lang}/`) {
                                    return true;
                                }
                                return (pathname.replace(`/${lang}`, '')).includes((item.href.replace(`/${lang}`, '')), 0)&& item.href != `/${lang}/`
                            };

                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        title={item.name}
                                        className={classNames(
                                            isActived() ? 'bg-gray-100 dark:bg-gray-800 dark:text-white text-gray-500' : 'text-gray-400 hover:text-gray-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800',
                                            'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold'
                                        )}
                                    >

                                        <DynamicIcon icon={item.icon} className="h-6 w-6 shrink-0 text-gray-500" />
                                        <span className="sr-only">{item.name}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </>
    )
}