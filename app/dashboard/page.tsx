"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
// import { createClient } from "@/lib/supabase/client" // commented out

export default function DashboardRedirect() {
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      // const supabase = createClient() // commented out
      // const { data } = await supabase.auth.getUser()

      // Temporary placeholder for redirect logic
      const user = true // assume user is logged in
      const role = "user" // replace with "admin" or "provider" as needed

      if (!user) {
        router.replace("/auth/login")
        return
      }

      // if (role === "admin") router.replace("/dashboard/admin")
      // else if (role === "provider") router.replace("/dashboard/provider")
      else router.replace("/dashboard/user/book-service")
    }

    checkUser()
  }, [router])

  return <p>Loading dashboard...</p>
}
