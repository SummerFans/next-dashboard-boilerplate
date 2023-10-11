import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import { i18n } from '@/i18n-config'
import Negotiator from 'negotiator'
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
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    try {
      const supabase = createRouteHandlerClient({ cookies })
      console.log(code)
      await supabase.auth.exchangeCodeForSession(code)
    } catch (e: any) {
      const locale = getLocale(request);
      return NextResponse.redirect(
        `${requestUrl.origin}/${locale}/signin?error=${e.message}`,
        {
          status: 301,
        }
      )
    }

  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin)
}
