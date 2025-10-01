"use client"

import { useState, useEffect } from "react"
// import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, CalendarIcon, Clock, DollarSign, MapPin, Star, User, Wrench } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

interface ServiceCategory {
  id: string
  name: string
  description: string
  icon: string
}

interface Service {
  id: string
  name: string
  description: string
  price: number
  duration_minutes: number
  category_id: string
  service_categories: ServiceCategory
}

interface ServiceProvider {
  id: string
  user_id: string
  specialties: string[]
  experience_years: number
  rating: number
  total_reviews: number
  is_available: boolean
  profiles: {
    full_name: string
  }
}

export default function BookServicePage() {
  const [step, setStep] = useState(1)
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [providers, setProviders] = useState<ServiceProvider[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)

  const router = useRouter()
  // const supabase = createClient()

  useEffect(() => {
    fetchUser()
    fetchCategories()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      fetchServices(selectedCategory)
    }
  }, [selectedCategory])

  useEffect(() => {
    if (selectedService) {
      fetchProviders(selectedService.id)
    }
  }, [selectedService])

  const fetchUser = async () => {
    // const {
    //   data: { user },
    // } = await supabase.auth.getUser()
    // setUser(user)
    console.log("fetchUser commented out")
  }

  const fetchCategories = async () => {
    // const { data } = await supabase.from("service_categories").select("*").order("name")
    // setCategories(data || [])
    console.log("fetchCategories commented out")
  }

  const fetchServices = async (categoryId: string) => {
    // const { data } = await supabase
    //   .from("services")
    //   .select(`
    //     *,
    //     service_categories (*)
    //   `)
    //   .eq("category_id", categoryId)
    //   .eq("is_active", true)
    //   .order("name")
    // setServices(data || [])
    console.log("fetchServices commented out for category:", categoryId)
  }

  const fetchProviders = async (serviceId: string) => {
    // For simplicity, we'll fetch all available providers
    // In a real app, you'd filter by service specialties
    // const { data } = await supabase
    //   .from("service_providers")
    //   .select(`
    //     *,
    //     profiles (full_name)
    //   `)
    //   .eq("is_available", true)
    //   .order("rating", { ascending: false })
    // setProviders(data || [])
    console.log("fetchProviders commented out for service:", serviceId)
  }

  const handleBooking = async () => {
    if (!selectedService || !selectedProvider || !selectedDate || !selectedTime || !address) {
      alert("Please fill in all required fields")
      return
    }

    setIsLoading(true)

    try {
      const scheduledDateTime = new Date(selectedDate)
      const [hours, minutes] = selectedTime.split(":")
      scheduledDateTime.setHours(Number.parseInt(hours), Number.parseInt(minutes))

      // const { error } = await supabase.from("bookings").insert({
      //   user_id: user.id,
      //   service_id: selectedService.id,
      //   provider_id: selectedProvider.id,
      //   scheduled_date: scheduledDateTime.toISOString(),
      //   total_amount: selectedService.price,
      //   address: address,
      //   notes: notes,
      //   status: "pending",
      // })

      // if (error) throw error

      console.log("Booking would be created:", {
        user_id: user?.id,
        service_id: selectedService.id,
        provider_id: selectedProvider.id,
        scheduled_date: scheduledDateTime.toISOString(),
        total_amount: selectedService.price,
        address: address,
        notes: notes,
        status: "pending",
      })

      router.push("/dashboard/user?booking=success")
    } catch (error) {
      console.error("Booking error:", error)
      alert("Failed to create booking. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <Link href="/dashboard/user">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Book a Service</h1>
              <p className="text-gray-600">Schedule your maintenance service</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, title: "Select Service" },
              { step: 2, title: "Choose Provider" },
              { step: 3, title: "Schedule & Details" },
              { step: 4, title: "Confirm Booking" },
            ].map((item) => (
              <div key={item.step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= item.step ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {item.step}
                </div>
                <span
                  className={`ml-2 text-sm ${step >= item.step ? "text-orange-600 font-semibold" : "text-gray-500"}`}
                >
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Select Service */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select a Service Category</CardTitle>
              <CardDescription>Choose the type of maintenance service you need</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {categories.map((category) => (
                  <Card
                    key={category.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedCategory === category.id ? "ring-2 ring-orange-500 bg-orange-50" : ""
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-orange-500" />
                        {category.name}
                      </CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              {selectedCategory && services.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Available Services</h3>
                  <div className="space-y-4">
                    {services.map((service) => (
                      <Card
                        key={service.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedService?.id === service.id ? "ring-2 ring-orange-500 bg-orange-50" : ""
                        }`}
                        onClick={() => setSelectedService(service)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">{service.name}</h4>
                              <p className="text-gray-600 mb-2">{service.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {service.duration_minutes} min
                                </span>
                                <span className="flex items-center gap-1">
                                  <DollarSign className="w-4 h-4" />${service.price}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {selectedService && (
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => setStep(2)} className="bg-orange-500 hover:bg-orange-600">
                    Continue to Provider Selection
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Choose Provider */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Choose a Service Provider</CardTitle>
              <CardDescription>Select from our qualified technicians</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {providers.map((provider) => (
                  <Card
                    key={provider.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedProvider?.id === provider.id ? "ring-2 ring-orange-500 bg-orange-50" : ""
                    }`}
                    onClick={() => setSelectedProvider(provider)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg">{provider.profiles.full_name}</h4>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="text-sm font-medium">{provider.rating}</span>
                                </div>
                                <span className="text-sm text-gray-500">({provider.total_reviews} reviews)</span>
                                <Badge variant="secondary">{provider.experience_years} years exp.</Badge>
                              </div>
                            </div>
                          </div>
                          {provider.specialties && provider.specialties.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {provider.specialties.map((specialty, index) => (
                                <Badge key={index} variant="outline">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back to Service Selection
                </Button>
                {selectedProvider && (
                  <Button onClick={() => setStep(3)} className="bg-orange-500 hover:bg-orange-600">
                    Continue to Scheduling
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Schedule & Details */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Schedule & Details</CardTitle>
              <CardDescription>Choose your preferred date, time, and provide service details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>Select Time</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="address">Service Address *</Label>
                <Input
                  id="address"
                  placeholder="Enter the address where service is needed"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any specific instructions or details about the service needed..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back to Provider Selection
                </Button>
                {selectedDate && selectedTime && address && (
                  <Button onClick={() => setStep(4)} className="bg-orange-500 hover:bg-orange-600">
                    Review Booking
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirm Booking */}
        {step === 4 && selectedService && selectedProvider && selectedDate && (
          <Card>
            <CardHeader>
              <CardTitle>Confirm Your Booking</CardTitle>
              <CardDescription>Review your service details before confirming</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedService.name}</h3>
                    <p className="text-gray-600">{selectedService.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">${selectedService.price}</p>
                    <p className="text-sm text-gray-500">{selectedService.duration_minutes} minutes</p>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{selectedProvider.profiles.full_name}</p>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm">
                          {selectedProvider.rating} ({selectedProvider.total_reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-gray-500" />
                    <p>
                      {format(selectedDate, "EEEE, MMMM do, yyyy")} at {selectedTime}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <p>{address}</p>
                  </div>

                  {notes && (
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      </div>
                      <p className="text-gray-600">{notes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(3)}>
                  Back to Details
                </Button>
                <Button onClick={handleBooking} disabled={isLoading} className="bg-orange-500 hover:bg-orange-600">
                  {isLoading ? "Booking..." : "Confirm Booking"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}