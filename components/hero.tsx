"use client";
import Image from "next/image";
import Link from "next/link";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Header from "./header";

export default function Hero() {
  // Explicitly type the ref
  const container = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "150vh"]);

  return (
    <div className="h-screen overflow-hidden relative" ref={container}>
      <Header />
      <motion.div style={{ y }} className="relative h-full">
        <Image
          src="/images/mountain-landscape.jpg"
          fill
          alt="Maintenance technology background"
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-black/40 z-5" />

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10"
            >
              {/* Grid Background */}
              {/* <div className="absolute inset-0 pointer-events-none"> */}
                {/* Vertical lines */}
                {/* <div className="w-full h-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.2),rgba(255,255,255,0.2) 1px,transparent 1px,transparent 20px)]" /> */}
                {/* Horizontal lines */}
                {/* <div className="w-full h-full bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.2),rgba(255,255,255,0.2) 1px,transparent 1px,transparent 20px)]" />
              </div> */}

              {/* Content */}
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-orange-600">Your</span>
                &nbsp;
                <span className="text-white">ONE STOP </span>
                <br />
                <span className="text-orange-600">Complete Maintenance </span>
                <br />
                <span className="text-white">SOLUTIONS</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed mb-8 text-gray-200 max-w-3xl mx-auto">
                Professional maintenance services for homes and businesses in
                Latin America.
                <br />
                Predictive technology, IoT monitoring and 24/7 support by expert
                technicians.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg rounded-full font-semibold"
                >
                  Book a Service
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 text-lg rounded-full font-semibold bg-transparent"
                >
                  Request Demo
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg rounded-full font-semibold bg-transparent"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-8 bg-black/30 backdrop-blur-sm rounded-full px-8 py-4 border border-white/10">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">D</span>
            </div>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="/services"
              className="text-orange-400 hover:text-orange-300 transition-colors duration-300 text-sm font-medium"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-orange-400 transition-colors duration-300 text-sm font-medium"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-orange-400 transition-colors duration-300 text-sm font-medium"
            >
              Contact
            </Link>
          </nav>
          <div className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm font-medium">
            ES
          </div>
        </div>
      </div>
    </div>
  );
}
