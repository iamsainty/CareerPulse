'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  const router = useRouter()

  const handleGetStarted = () => {
    // Redirect user to login or signup page
    router.push('/signup') // or '/login' as needed
  }

  return (
    <nav className="flex justify-center items-center w-full mt-10 px-4">
      <div className="flex justify-between items-center w-full max-w-3xl border border-[#6C63FF] shadow-sm bg-[#F3F0FF] px-6 py-3 rounded-lg">
        <h1
          className="text-xl font-semibold tracking-wide text-[#6C63FF] select-none cursor-pointer"
          onClick={() => router.push('/')}
        >
          Career Pulse
        </h1>
        <Button 
          onClick={handleGetStarted}
          className="px-6 py-2 text-sm font-semibold bg-[#F7A072] text-white hover:bg-[#e88c5c] transition-colors duration-300 rounded-md cursor-pointer"
          aria-label="Get started with Career Pulse"
        >
          Get Started
        </Button>
      </div>
    </nav>
  )
}

export default Navbar