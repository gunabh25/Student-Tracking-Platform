// 'use client'

// import React, { useState } from 'react'
// import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'
// import 'react-big-calendar/lib/css/react-big-calendar.css'
// // import { getEvents } from '../utils/events'

// // Setup the localizer for BigCalendar
// const localizer = momentLocalizer(moment)

// export default function Calendar() {
//   const [date, setDate] = useState(new Date())

//   const onNavigate = (newDate) => {
//     setDate(newDate)
//   }

//   return (
//     <div className="h-full">
//       <BigCalendar
//         localizer={localizer}
//         // events={getEvents()}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: '100%' }}
//         date={date}
//         onNavigate={onNavigate}
//         views={['month']}
//         className="shadow-lg rounded-lg"
//       />
//     </div>
//   )
// }

'use client'

import React, { useState } from 'react'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useSession } from 'next-auth/react'

// Setup the localizer for BigCalendar
const localizer = momentLocalizer(moment)

export default function Calendar() {
  const [date, setDate] = useState(new Date())
  const [attendance, setAttendance] = useState({}) // Object to track attendance by date
  const [showPopup, setShowPopup] = useState(false) // Control modal visibility
  const [selectedDate, setSelectedDate] = useState(null) // Date for which attendance is being marked
  const [selectedStudent, setSelectedStudent] = useState(null) // Currently selected student
 const {data: session} = useSession()

  const onNavigate = (newDate) => {
    setDate(newDate)
  }

  const onSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start)
    setShowPopup(true)
  }

  const closePopup = () => {
    setShowPopup(false)
    setSelectedDate(null)
    setSelectedStudent(null)
  }

  const markAttendance = () => {
    if (!selectedStudent) return
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD')
    setAttendance((prev) => ({
      ...prev,
      [formattedDate]: {
        ...prev[formattedDate],
        [selectedStudent]: !prev[formattedDate]?.[selectedStudent],
      },
    }))
    closePopup()
  }

  const students = ['Alice', 'Bob', 'Charlie', 'David'] // Replace with your student list

  return (
    <div className="h-full">
      <BigCalendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={onSelectSlot}
        style={{ height: '100%' }}
        date={date}
        onNavigate={onNavigate}
        views={['month']}
        className="shadow-lg rounded-lg"
      />

      <div className="mt-4">
        <h2 className="text-xl font-bold">Select a student to mark attendance:</h2>
        <ul className="mt-2 grid grid-cols-2 gap-4">
          {students.map((student) => (
            <li key={student}>
              <button
                onClick={() => {
                  setSelectedStudent(student)
                  setShowPopup(true)
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded w-full text-left"
              >
                {student}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {showPopup && (
        <div className="fixed z-10 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className=" bg-background p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Mark Attendance for {selectedStudent} on {moment(selectedDate).format('MMMM Do, YYYY')}
            </h2>
            <button
              onClick={markAttendance}
              className={`px-4 py-2 rounded w-full mb-4 ${
                attendance[moment(selectedDate).format('YYYY-MM-DD')]?.[selectedStudent]
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-black'
              }`}
            >
              {attendance[moment(selectedDate).format('YYYY-MM-DD')]?.[selectedStudent]
                ? 'Mark Absent'
                : 'Mark Present'}
            </button>
            <button
              onClick={closePopup}
              className="mt-4 px-4 py-2 bg-destructive text-primary rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}




