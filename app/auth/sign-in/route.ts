import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest, NextResponse } from 'next/server'

import { i18n } from '@/i18n-config'
import { useSearchParams } from 'next/navigation'

export const dynamic = 'force-dynamic'

function getLocale(request: NextRequest): string | undefined {


    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales

    // Use negotiator and intl-localematcher to get best locale
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
        locales
    )

    const locale = matchLocale(languages, locales, i18n.defaultLocale)

    return locale
}

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url)
    const provider = searchParams.get('provider') as any;

    if (!provider) {
        const locale = getLocale(request);
        return NextResponse.redirect(
            `${origin}/${locale}/signin?error=not provider`,
            {
                status: 301,
            }
        )
    }

    const supabase = createRouteHandlerClient({ cookies })
    const locale = getLocale(request);
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    })

    if (error) {
        const locale = getLocale(request);
        return NextResponse.redirect(
            `${origin}/${locale}/signin?error=Could not authenticate user`,
            {
                status: 301,
            }
        )
    }

    return NextResponse.redirect(data.url, {
        status: 301,
    });

}

export async function POST(request: NextRequest) {
    const requestUrl = new URL(request.url)
    const formData = await request.formData()
    const email = String(formData.get('email'))
    const password = String(formData.get('password'))
    const supabase = createRouteHandlerClient({ cookies })

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        const locale = getLocale(request);
        return NextResponse.redirect(
            `${requestUrl.origin}/${locale}/signin?error=Could not authenticate user`,
            {
                status: 301,
            }
        )
    }

    return NextResponse.redirect(requestUrl.origin, {
        status: 301,
    })
}
