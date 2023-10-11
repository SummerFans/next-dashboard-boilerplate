'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n } from '@/i18n-config';
import { HomeIcon } from '@heroicons/react/24/outline';


const Breadcrumbs = ({ 
    capitalizeLinks,
    lang,
    dictionary,
    navigation
 }: {
    capitalizeLinks?: boolean;
    lang: Lang;
    dictionary: any;
    navigation: Navigation[];
 }) => {

    const paths = usePathname()
    const pathNames = paths.split('/').filter((path: any) => {
        return i18n.locales.indexOf(path) === -1 && path !== '';
    })

    return (
        <nav className="flex p-4" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
                <li>
                    <div>
                        <Link href="/" className="text-gray-400 dark:text-gray-700 hover:text-gray-500 dark:hover:text-gray-500">
                            <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                            <span className="sr-only">Home</span>
                        </Link>
                    </div>
                </li>
                {
                    pathNames.map((link, index) => {
                        let href = `/${pathNames.slice(0, index + 1).join('/')}`
                        let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
                        
                        return (
                            <React.Fragment key={index}>
                                <li >
                                    <div className="flex items-center">
                                        <svg
                                            className="h-5 w-5 flex-shrink-0 text-gray-300 dark:text-gray-700 "
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            aria-hidden="true"
                                        >
                                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                        </svg>

                                        {(pathNames.length - 1) === index ? (
                                            <span className="ml-2 text-xs font-medium text-gray-600">
                                                {dictionary[link]||itemLink}
                                            </span>
                                        ) : (
                                            <Link
                                                href={href}
                                                className="ml-2 text-xs font-medium text-gray-500 hover:text-gray-700"
                                            >
                                                {/* {itemLink} */}
                                                {dictionary[link]||itemLink}
                                            </Link>
                                        )}

                                    </div>
                                </li>
                            </React.Fragment>
                        )
                    })
                }

            </ol>
        </nav>
    )
}

export default Breadcrumbs
