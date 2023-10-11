
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getDictionary } from '@/get-dictionary';
import BaseLayout from '@/components/common/BaseLayout';


export default async function Layout({
    children,
    params: { lang },
}: {
    children: React.ReactNode,
    params: { lang: Lang },
}) {
    const dictionary = (await getDictionary(lang) as any)['server-component']['layout-menu']


    const navigation: Navigation[] = [
        { key: "dashboard", name: dictionary['dashboard'], icon: 'ChartBarIcon', href: `/${lang}/` },
        { key: "products", name: dictionary['products'], icon: 'FolderIcon', href: `/${lang}/products` },
    ]

    const userNavigation: UserNavigation[] = [
        { key: "your_profile", name: dictionary['profile'], href: `/${lang}/profile` },
        { key: "settings", name: dictionary['settings'], href: `/${lang}/settings` },
        { key: "sign_out", name: dictionary['sign_out'], href: '/auth/sign_out' },
    ]


    const supabase = createServerComponentClient({ cookies })

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        // redirect to signin page
        redirect(`${lang}/signin`)
    }

    const formatUser = (user: any) => {
        return {
            ...user,
        }
    }


    return (
        <>
            <BaseLayout
                lang={lang}
                dictionary={dictionary}
                navigation={navigation}
                userNavigation={userNavigation}
                user={formatUser(user)}
            >{children}</BaseLayout></>
    )
}