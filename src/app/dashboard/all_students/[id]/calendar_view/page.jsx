import React from "react";
import CalendarLayout from "@/components/calendar/calendarLayout";
import { fetchStudentById, fetchUser } from "@/app/lib/data";
import { Button } from "@/components/ui/button";
import Calendar from "@/components/calendar/calendar";

export const metadata = {
  title: "View Attendance | STP",
};

export default async function page(params) {
  console.log(params, "is the params");
  const { id } = params.params;
  console.log(id, "is the id");
  const student = await fetchStudentById(id);
  console.log(student);

  return (
    <div className="h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 border-b">
        <div className="flex flex-col space-x-4">
          <h1 className="text-2xl font-bold">
            View Attendace for: {student.username}
          </h1>
          <p className="text-sm font-semibold">
            Admission Number: {student.admissionNumber}
          </p>
        </div>
        <div className="text-lg font-semibold">
          {new Date().toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </div>
      </header>
      {/* <CalendarLayout /> */}
      <div className="flex-grow p-4 h-full">
        <Calendar />
      </div>
    </div>
  );
}
