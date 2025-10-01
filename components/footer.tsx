import Link from "next/link"

export default function Footer() {
  return (
    <div
      className="relative h-[400px] sm:h-[600px] lg:h-[800px] max-h-[800px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative h-[calc(100vh+400px)] sm:h-[calc(100vh+600px)] lg:h-[calc(100vh+800px)] -top-[100vh]">
        <div className="h-[400px] sm:h-[600px] lg:h-[800px] sticky top-[calc(100vh-400px)] sm:top-[calc(100vh-600px)] lg:top-[calc(100vh-800px)]">
          <div className="bg-gray-900 py-4 sm:py-6 lg:py-8 px-4 sm:px-6 h-full w-full flex flex-col justify-between gap-6">
            
            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 lg:gap-20">
              <div className="flex flex-col gap-2">
                <h3 className="uppercase text-orange-400 text-sm font-semibold mb-2">FAQ</h3>
                <Link
                  href="/faq"
                  className="text-white hover:text-orange-400 transition-colors duration-300 text-sm sm:text-base"
                >
                  Frequently Asked Questions
                </Link>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="uppercase text-orange-400 text-sm font-semibold mb-2">Contact Us</h3>
                <Link
                  href="/contact"
                  className="text-white hover:text-orange-400 transition-colors duration-300 text-sm sm:text-base mb-2"
                >
                  Contact Form
                </Link>
                
                {/* Map */}
                <div className="w-full h-40 sm:h-60 lg:h-72 rounded-md overflow-hidden border border-white/20">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13129247.90098985!2d-73.41504364453126!3d-38.416097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc8db0df43e0b%3A0x3f0f5b6f7dc6d3f2!2sArgentina!5e0!3m2!1sen!2sus!4v1695967262522!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Branding stays the same */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0 mt-6">
              <h1 className="text-[18vw] sm:text-[16vw] lg:text-[14vw] leading-[0.8] text-white font-bold tracking-tight">
                DOLT
              </h1>
              <div className="text-right">
                <p className="text-orange-400 text-sm sm:text-base mb-2">Smart Maintenance Solutions</p>
                <p className="text-gray-400 text-sm sm:text-base">©2024 DOLT. All rights reserved.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
