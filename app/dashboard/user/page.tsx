"use client"

import { redirect } from "next/navigation"
// import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Plus, Settings, User, Wrench } from "lucide-react"
import Link from "next/link"

export default function UserDashboard() {
  // const supabase = await createClient()

  // const { data, error } = await supabase.auth.getUser()
  // if (error || !data?.user) {
  //   redirect("/auth/login")
  // }

  // Get user profile
  // const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  // Get user's recent bookings
  // const { data: bookings } = await supabase
  //   .from("bookings")
  //   .select(`
  //     *,
  //     services (name, price),
  //     service_providers (
  //       profiles (full_name)
  //     )
  //   `)
  //   .eq("user_id", data.user.id)
  //   .order("created_at", { ascending: false })
  //   .limit(5)

  // Mock data for testing
  const profile = {
    full_name: "Test User"
  }

  const bookings: any[] = []

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "in_progress":
        return "bg-orange-100 text-orange-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {profile?.full_name || "User"}</h1>
                <p className="text-gray-600">Manage your maintenance services</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/user/profile">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
              </Button>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600" asChild>
                <Link href="/dashboard/user/book-service">
                  <Plus className="w-4 h-4 mr-2" />
                  Book Service
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings?.length || 0}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Services</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {bookings?.filter((b) => ["confirmed", "in_progress"].includes(b.status)).length || 0}
              </div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings?.filter((b) => b.status === "completed").length || 0}</div>
              <p className="text-xs text-muted-foreground">Services completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Service</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {bookings?.find((b) => ["confirmed", "in_progress"].includes(b.status)) ? "Soon" : "None"}
              </div>
              <p className="text-xs text-muted-foreground">Scheduled</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Your latest maintenance service requests</CardDescription>
              </div>
              <Button variant="outline" asChild>
                <Link href="/dashboard/user/bookings">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {bookings && bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{booking.services?.name}</h3>
                        <Badge className={getStatusColor(booking.status)}>{booking.status.replace("_", " ")}</Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(booking.scheduled_date).toLocaleDateString()}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {booking.address}
                        </p>
                        {booking.service_providers?.profiles?.full_name && (
                          <p className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {booking.service_providers.profiles.full_name}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${booking.total_amount}</p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Wrench className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-600 mb-4">Start by booking your first maintenance service</p>
                <Button className="bg-orange-500 hover:bg-orange-600" asChild>
                  <Link href="/dashboard/user/book-service">
                    <Plus className="w-4 h-4 mr-2" />
                    Book Your First Service
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}