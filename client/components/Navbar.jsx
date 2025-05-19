'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/signup')
  }

  return (
    <nav className="flex justify-center items-center w-full mt-10 px-4">
      <div className="flex justify-between items-center w-full max-w-3xl bg-blue-100 border border-blue-700 shadow-sm px-6 py-3 rounded-lg">
        <h1
          className="text-blue-900 text-xl font-semibold tracking-wide select-none cursor-pointer"
          onClick={() => router.push('/')}
        >
          Career Pulse
        </h1>
        <Button 
          onClick={handleGetStarted}
          className="bg-blue-400 hover:bg-blue-600 text-white px-6 py-2 text-sm font-semibold rounded transition-colors cursor-pointer"
          aria-label="Get started with Career Pulse"
        >
          Get Started
        </Button>
      </div>
    </nav>
  )
}

export default Navbar
