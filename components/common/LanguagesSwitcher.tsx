'use client';
import { Listbox, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { setCookie } from "cookies-next";

import { Locale, i18n } from '@/i18n-config';
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function LanguagesSwitcher({
    current,
}: {
    current: Locale,
}) {
    const setLanguage = (lang: any) => {
        if (lang == current) return;
        setCookie('NEXT_LOCALE', lang)
        window.location.href = "/"
    }

    return (
        <>
            <Listbox value={current} onChange={setLanguage}>
                {({ open }) => (
                    <>
                        <Listbox.Label className="hidden text-sm font-medium leading-6 text-gray-900 dark:text-white ">Assigned to</Listbox.Label>
                        <div className="relative mt-2 w-40">
                            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white dark:bg-black py-1.5 pl-3 pr-10 text-left text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                <span className="flex items-center">
                                    <Image width={32} height={32} src={'/images/flag/' + current + '.svg'} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                                    <span className="ml-3 block truncate">{i18n.show_locales[current]}</span>
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </Listbox.Button>

                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-black dark:text-gray-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {i18n.locales.map((locale, index) => (
                                        <Listbox.Option
                                            key={index}
                                            className={({ active }) =>
                                                classNames(
                                                    active ? 'bg-indigo-600 text-white' : 'text-gray-900 dark:text-gray-400',
                                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                                )
                                            }
                                            value={locale}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <div className="flex items-center">
                                                        <Image width={32} height={32} src={'/images/flag/' + locale + '.svg'} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                                                        <span
                                                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                        >{i18n.show_locales[locale]}</span>
                                                    </div>

                                                    {selected ? (
                                                        <span
                                                            className={classNames(
                                                                active ? 'text-white' : 'text-indigo-600',
                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                            )}
                                                        >
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
        </>
    )
}