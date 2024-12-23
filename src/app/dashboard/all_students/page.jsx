import React from "react";
import { fetchStudents } from "@/app/lib/data";
import { auth } from "@/auth";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/dashboard/all_teachers/userTableColumns";

export const metadata = {
  title: "All Students | STP",
};

// Define the page component
export default async function page() {
  // Authenticate the user
  const session = await auth();
  const companyID = session?.user?.companyID;

  // Function to fetch and format user data
  async function getData() {
    const response = await fetchStudents();
  
    console.log(response, "mil gaya");
  
    const formattedData = response.filter(student => student.companyID.toString() === companyID).map((student) => ({
      // firstName: student.firstName,
      // lastName: student.lastName,
      name: student.username,
      profile_Picture: student.img,
      // branch: student.companyID,
      year: student.year,
      section: student.section,
      admissionNumber: student.admissionNumber,
      rollNumber: student.rollNumber,
      address: student.address,
      phone: student.phone,
      attendance: student.attendance.toString(),
      id: student._id.toString(),
    }));
  
    console.log(formattedData, "aa gaya");
    return formattedData;
  }

  // Fetch the data
  const data = await getData();

  // Render the page
  return (
    <div>
      {/* Page title */}
      <div className="text-4xl tracking-wider font-semibold"> All Students</div>
      {/* Page description */}
      <p className="text-sm text-muted-foreground">
      View and edit attendance records for all students in your classes{" "}
      </p>

      {/* User table */}
      <DataTable
        data={data}
        columns={columns}
        addNewLink="/dashboard/all_students/add/"
        addNewText="Add new student"
      />
    </div>
  );
}
