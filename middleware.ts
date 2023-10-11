import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { i18n } from '@/i18n-config'

import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string | undefined {

    const cookieStore = cookies()
    const next_locale = cookieStore.get('NEXT_LOCALE')?.value
    if (next_locale) {
        return next_locale;
    }

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

export async function middleware(req: NextRequest) {

    // append headers
    const requestHeaders = new Headers(req.headers);
    // requestHeaders.set('x-pathname', req.nextUrl.pathname);

    const pathname = req.nextUrl.pathname

    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(req)
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
                req.url
            )
        )
    }

    const res = NextResponse.next({
        headers: requestHeaders,
    })
    const supabase = createMiddlewareClient({ req, res })
    await supabase.auth.getSession()

    return res
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|auth|_next/static|_next/|images|image|favicon.ico).*)'],
}