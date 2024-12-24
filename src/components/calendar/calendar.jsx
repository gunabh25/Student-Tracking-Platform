"use client";
import React, { useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CalendarIcon } from 'lucide-react'
import { toast } from "sonner";


const localizer = momentLocalizer(moment);

const Calendar = ({ attendance = [] }) => {
  const [date, setDate] = useState(new Date());
  const [markedAttendance, setMarkedAttendance] = useState(attendance); // Track attendance by date
  const [showPopup, setShowPopup] = useState(false); // Control modal visibility
  const [selectedDate, setSelectedDate] = useState(null); // Date for which attendance is being marked
  const [showDialog, setShowDialog] = useState(true);

  const onNavigate = (newDate) => {
    setDate(newDate);
  };

  const onSelectSlot = (slotInfo) => {
    const currentDate = new Date();
    const selected = new Date(slotInfo.start);

    // Check if the selected date is today and within the allowed time range
    if (
      selected.toDateString() === currentDate.toDateString() &&
      currentDate.getHours() >= 5 &&
      currentDate.getHours() < 17
    ) {
      setSelectedDate(slotInfo.start);
      setShowPopup(true);
    } else {
      toast.error("You can only mark attendance for today between 9:00 AM and 5:00 PM.");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedDate(null);
  };

  const markAttendance = () => {
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    setMarkedAttendance((prev) => [
      ...prev,
      { date: formattedDate, status: 'Present' },
    ]);
    closePopup();
  };

  const events = markedAttendance.map((att) => ({
    title: att.status === 'Present' ? '✅' : att.status,
    start: new Date(att.date),
    end: new Date(att.date),
    allDay: true,
  }));

  return (
    <div>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onNavigate={onNavigate}
        onSelectSlot={onSelectSlot}
      />
      {showPopup && (
        // <div className="popup">
        //   <p>Mark attendance for: {selectedDate.toDateString()}</p>
        //   <button onClick={markAttendance}>Mark Present</button>
        //   <button onClick={closePopup}>Close</button>
        // </div>
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Mark Attendance
          </AlertDialogTitle>
          <AlertDialogDescription>
            You are about to mark attendance for:
            <span className="block mt-1 font-semibold text-foreground">
              {selectedDate.toDateString()}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={markAttendance}>
            Mark Present
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      )}
    </div>
  );
};

export default Calendar;