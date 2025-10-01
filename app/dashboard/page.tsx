"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function DashboardRedirect() {
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        router.replace("/auth/login")
        return
      }

      // Get profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single()

      if (profile?.role === "admin") router.replace("/dashboard/admin")
      else if (profile?.role === "provider") router.replace("/dashboard/provider")
      else router.replace("/dashboard/user")
    }

    checkUser()
  }, [router])

  return <p>Loading dashboard...</p>
}
