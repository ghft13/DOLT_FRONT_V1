import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

/**
 * Especially important if using Fluid compute: Don't put this client in a
 * global variable. Always create a new client within each function when using
 * it.
 */
async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: {
      storage: {
        getItem: (key: string) => {
          const cookie = cookieStore.get(key)
          return cookie?.value || null
        },
        setItem: (key: string, value: string) => {
          try {
            cookieStore.set(key, value, {
              httpOnly: true,
              secure: true,
              sameSite: "lax",
              path: "/",
            })
          } catch {
            // The setItem method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        removeItem: (key: string) => {
          try {
            cookieStore.delete(key)
          } catch {
            // The removeItem method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  })
}

export const createClient = createSupabaseServerClient
export const createServerClient = createSupabaseServerClient
