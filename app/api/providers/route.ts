import { createServerClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    const serviceId = searchParams.get("service_id")

    let query = supabase
      .from("profiles")
      .select("id, full_name, email, phone, rating, specialties")
      .eq("role", "provider")

    if (serviceId) {
      // Filter providers who offer this service
      query = query.contains("specialties", [serviceId])
    }

    const { data: providers, error } = await query.order("rating", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ providers })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
