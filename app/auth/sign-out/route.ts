import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const supabase = createRouteHandlerClient({ cookies })

  await supabase.auth.signOut()

  return NextResponse.redirect(`${requestUrl.origin}/signin`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  })
}
