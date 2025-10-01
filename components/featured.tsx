import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Wrench, Wifi, Shield, Clock } from "lucide-react"
import { motion } from "framer-motion"

const images = [
  "/images/tech1.jpg",
  "/images/tech2.jpg",
  "/images/tech3.jpg",
]

export default function Featured() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Smart Maintenance <span className="text-orange-500">Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionary maintenance services powered by IoT technology, predictive analytics, and expert technicians
            across Latin America.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Wifi className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">IoT Monitoring</h3>
                <p className="text-gray-600">
                  Real-time monitoring of your systems with smart sensors that predict issues before they occur.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Predictive Technology</h3>
                <p className="text-gray-600">
                  Advanced algorithms analyze data patterns to prevent costly breakdowns and extend equipment life.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Wrench className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Technicians</h3>
                <p className="text-gray-600">
                  Certified professionals with years of experience in HVAC, plumbing, electrical, and IoT systems.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600">
                  Round-the-clock monitoring and emergency response for critical maintenance issues.
                </p>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg rounded-full font-semibold"
            >
              Learn More About Our Services
            </Button>
          </div>

          {/* Sliding Images Card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 overflow-hidden">
              <motion.div
                className="flex w-[300%] h-80"
                animate={{ x: ["0%", "-33.33%", "-66.66%", "0%"] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                {images.map((src, i) => (
                  <div key={i} className="w-1/3 h-80 relative flex-shrink-0">
                    <Image
                      src={src}
                      alt={`Slide ${i}`}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-xl"
                    />
                  </div>
                ))}
              </motion.div>

              <div className="absolute -bottom-4 -right-4 bg-white p-6 rounded-xl shadow-lg border">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime Guarantee</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-xl text-center">
            <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Residential</h3>
            <p className="text-gray-600">
              Complete home maintenance solutions including HVAC, plumbing, electrical, and smart home integration.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl text-center">
            <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Commercial</h3>
            <p className="text-gray-600">
              Enterprise-grade maintenance services for offices, retail spaces, and commercial buildings.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl text-center">
            <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wifi className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Industrial</h3>
            <p className="text-gray-600">
              Heavy-duty maintenance and IoT monitoring solutions for manufacturing and industrial facilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
