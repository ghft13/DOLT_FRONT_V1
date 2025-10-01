import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, DollarSign, MapPin, Settings, Star, Users, Wrench } from "lucide-react"
import Link from "next/link"

export default async function ProviderDashboard() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get provider profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  // Get provider details
  const { data: provider } = await supabase.from("service_providers").select("*").eq("user_id", data.user.id).single()

  // Get provider's bookings
  const { data: bookings } = await supabase
    .from("bookings")
    .select(`
      *,
      services (name, price),
      profiles!bookings_user_id_fkey (full_name)
    `)
    .eq("provider_id", provider?.id)
    .order("scheduled_date", { ascending: true })
    .limit(10)

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

  const todayBookings =
    bookings?.filter((b) => new Date(b.scheduled_date).toDateString() === new Date().toDateString()) || []

  const upcomingBookings =
    bookings?.filter(
      (b) =>
        new Date(b.scheduled_date) > new Date() &&
        new Date(b.scheduled_date).toDateString() !== new Date().toDateString(),
    ) || []

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
                <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>
                <p className="text-gray-600">Welcome back, {profile?.full_name || "Provider"}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-semibold">{provider?.rating || "0.0"}</span>
                <span className="text-gray-500">({provider?.total_reviews || 0} reviews)</span>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/provider/profile">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
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
              <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings?.length || 0}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Jobs</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayBookings.length}</div>
              <p className="text-xs text-muted-foreground">Scheduled today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings?.filter((b) => b.status === "completed").length || 0}</div>
              <p className="text-xs text-muted-foreground">Jobs completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                {bookings
                  ?.filter((b) => b.status === "completed")
                  .reduce((sum, b) => sum + (b.total_amount || 0), 0)
                  .toFixed(2) || "0.00"}
              </div>
              <p className="text-xs text-muted-foreground">Total earned</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Jobs scheduled for today</CardDescription>
            </CardHeader>
            <CardContent>
              {todayBookings.length > 0 ? (
                <div className="space-y-4">
                  {todayBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{booking.services?.name}</h3>
                          <Badge className={getStatusColor(booking.status)}>{booking.status.replace("_", " ")}</Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {new Date(booking.scheduled_date).toLocaleTimeString()}
                          </p>
                          <p className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {booking.address}
                          </p>
                          <p className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {booking.profiles?.full_name}
                          </p>
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
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs today</h3>
                  <p className="text-gray-600">Enjoy your free day!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Jobs */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Upcoming Jobs</CardTitle>
                  <CardDescription>Your next scheduled services</CardDescription>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/dashboard/provider/schedule">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.slice(0, 3).map((booking) => (
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
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${booking.total_amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Wrench className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No upcoming jobs</h3>
                  <p className="text-gray-600">New jobs will appear here when scheduled</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
