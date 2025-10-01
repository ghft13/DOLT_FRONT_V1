import { createServerClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { service_id, provider_id, scheduled_date, scheduled_time, address, notes } = body

    // Create booking
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        user_id: user.id,
        service_id,
        provider_id,
        scheduled_date,
        scheduled_time,
        address,
        notes,
        status: "pending",
      })
      .select("*")
      .single()

    if (bookingError) {
      return NextResponse.json({ error: bookingError.message }, { status: 400 })
    }

    return NextResponse.json({ booking })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("user_id")

    let query = supabase.from("bookings").select(`
        *,
        services (name, description, price),
        profiles!bookings_provider_id_fkey (full_name, email)
      `)

    if (userId) {
      query = query.eq("user_id", userId)
    }

    const { data: bookings, error } = await query.order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ bookings })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
