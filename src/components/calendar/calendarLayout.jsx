import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Calendar from './Calendar'

export default function CalendarLayout() {
  return (
    <div className="flex flex-col h-screen">
   
      <main className="flex-grow p-4 ">
        <Calendar />
      </main>
    </div>
  )
}

