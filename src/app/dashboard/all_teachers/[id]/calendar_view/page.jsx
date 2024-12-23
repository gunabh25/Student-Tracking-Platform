import React from "react";
import CalendarLayout from "@/components/calendar/calendarLayout";
import { fetchUser } from "@/app/lib/data";
import { Button } from "@/components/ui/button";

export const metadata = {  
    title: "View Attendance | STP",
    };  


export default async function page(params) {
  console.log(params, "is the params");
  const { id } = params.params;
  console.log(id, "is the id");
  const user = await fetchUser(id);
  console.log(user);

  return (
    <div>
      <header className="flex justify-between items-center p-4 border-b">
        <div className="flex flex-col space-x-4">
          <h1 className="text-2xl font-bold">View Attendace for: {user.username}</h1>
         <p className='text-sm font-semibold'>Admission Number: {user.admissionNumber}</p>
        </div>
        <div className="text-lg font-semibold">
          {new Date().toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </div>
      </header>
      <CalendarLayout />
    </div>
  );
}
