'use client';
import Header from '@/components/common/Header'
import Nav from '@/components/common/Nav';
import { CalendarIcon, ChartPieIcon, DocumentDuplicateIcon, FolderIcon, HomeIcon, ChartBarIcon, BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { useState } from 'react';
import SideNav from './SideNav';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export default function BaseLayout(
    { children,
        lang,
        user,
        dictionary,
        navigation,
        userNavigation,
    }: {
        lang: Lang;
        children: React.ReactNode;
        user: any;
        dictionary: any;
        navigation: Navigation[];
        userNavigation: UserNavigation[];
    }
) {

    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="min-h-full">
            <Nav lang={lang} navigation={navigation} />
            <SideNav lang={lang} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} navigation={navigation} />
            <div className="lg:pl-20">
                <Header lang={lang} userNavigation={userNavigation} dictionary={dictionary} setSidebarOpen={setSidebarOpen} user={user}></Header>
                <Breadcrumbs navigation={navigation} lang={lang} dictionary={dictionary} capitalizeLinks />
                <main className='dark:text-white text-black'>
                    {children}
                </main>
            </div>
        </div>
    )
}