"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-6">
      <div className="flex justify-end items-center gap-4">
        <Link
          href="/auth/login"
          className="text-white hover:text-orange-400 transition-colors duration-300 text-sm font-medium"
        >
          Login
        </Link>
        <Button
          asChild
          className="bg-white text-black hover:bg-gray-100 text-sm px-6 py-2 rounded-full"
        >
          <Link href="/auth/signup">Sign Up</Link>
        </Button>
      </div>
    </header>
  )
}
