import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, Wrench } from "lucide-react"
import Link from "next/link"

// import { createClient } from "@/lib/supabase/server"

export default async function ServicesPage() {
  // const supabase = await createClient()

  // Get all service categories with their services
  // const { data: categories } = await supabase
  //   .from("service_categories")
  //   .select(`
  //     *,
  //     services (*)
  //   `)
  //   .order("name")

  // Mock data for categories and services
  const categories = [
    {
      id: "1",
      name: "HVAC Services",
      description: "Heating, Ventilation, and Air Conditioning solutions",
      services: [
        {
          id: "1",
          name: "Air Conditioner Maintenance",
          price: 100,
          description: "Full AC maintenance and cleaning service",
          duration_minutes: 60,
        },
        {
          id: "2",
          name: "Heater Inspection",
          price: 80,
          description: "Check and repair your heater",
          duration_minutes: 45,
        },
      ],
    },
    {
      id: "2",
      name: "Electrical Services",
      description: "All your electrical maintenance needs",
      services: [
        {
          id: "3",
          name: "Wiring Checkup",
          price: 120,
          description: "Complete wiring inspection and repair",
          duration_minutes: 90,
        },
      ],
    },
  ]

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
                <h1 className="text-2xl font-bold text-gray-900">Our Services</h1>
                <p className="text-gray-600">Professional maintenance solutions</p>
              </div>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600" asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Smart Maintenance <span className="text-orange-500">Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From HVAC systems to IoT monitoring, our expert technicians provide comprehensive maintenance services
            powered by predictive technology and 24/7 support.
          </p>
        </div>

        {/* Service Categories */}
        <div className="space-y-16">
          {categories?.map((category) => (
            <section key={category.id}>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Wrench className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{category.name}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services?.map((service) => (
                  <Card key={service.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between">
                        <span>{service.name}</span>
                        <Badge variant="secondary" className="ml-2">
                          ${service.price}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {service.duration_minutes} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          Professional Service
                        </span>
                      </div>
                      <Button className="w-full bg-orange-500 hover:bg-orange-600" asChild>
                        <Link href="/auth/signup">Book This Service</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust DOLT for their maintenance needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/auth/signup">Create Account</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
              asChild
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
