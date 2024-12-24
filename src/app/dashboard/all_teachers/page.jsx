import React from "react";
import { fetchUsers } from "@/app/lib/data";
import { auth } from "@/auth";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/dashboard/all_teachers/userTableColumns";

export const metadata = {
  title: "All Teachers | STP",
};

// Define the page component
export default async function page() {
  // Authenticate the user
  const session = await auth();
  const companyID = session?.user?.companyID;

  // Function to fetch and format user data
  async function getData() {
    const response = await fetchUsers("", companyID);
    
    console.log(response, "mil gaya");

    const formattedData = response.users.map((user) => ({
      role: user.isAdmin ? "Administrator" : "not admin",
      email: user.email,
      name: user.username,
      profile_Picture: user.img,
      status: user.isActive ? "active" : "inactive",
      createdDate: user.createdAt,
      id: user._id.toString(),
      teacherId: user.teacherId,
      phone: user.phone,
    }));
    // console.log(formattedData, "aa gaya");
    return formattedData;
  }

  // Fetch the data
  const data = await getData();

  // Render the page
  return (
    <div className="min-h-screen">
      {/* Page title */}
      <div className="text-4xl tracking-wider font-semibold"> All Teachers</div>
      {/* Page description */}
      <div>
        <p className="text-sm text-muted-foreground">
          View all faculty members present in your department:{" "}
          {session.user.companyID}
        </p>
        {/* <p>Total members: {data?.count} </p> */}
      </div>

      {/* User table */}
      <DataTable
        data={data}
        columns={columns}
        // addNewLink="/dashboard/all_students/add/"
        // addNewText="Add new student"
      />
    </div>
  );
}
