'use client'

import React, { useState } from 'react'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
// import { getEvents } from '../utils/events'

// Setup the localizer for BigCalendar
const localizer = momentLocalizer(moment)

export default function Calendar() {
  const [date, setDate] = useState(new Date())

  const onNavigate = (newDate) => {
    setDate(newDate)
  }

  return (
    <div className="h-full">
      <BigCalendar
        localizer={localizer}
        // events={getEvents()}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        date={date}
        onNavigate={onNavigate}
        views={['month']}
        className="shadow-lg rounded-lg"
      />
    </div>
  )
}

