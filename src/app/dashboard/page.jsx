import React from "react";
import {
  CircleUser,
  CreditCard,
  DollarSign,
  PhoneIcon,
  Users,
  UsersRoundIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchUsers } from "../lib/data";
import { fetchCustomers } from "../lib/data";
import { fetchProducts } from "../lib/data";
import { fetchEnquiries } from "../lib/data";
import { auth } from "@/auth";
import { columns } from "./all_teachers/userTableColumns";
import HomePageGreeting from "@/components/ui/homePageGreeting";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTable } from "@/components/ui/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CalendarLayout from "@/components/calendar/calendarLayout";
import LocationAccessPopup from "@/components/locationAccessPopup";

export const metadata = {
  title: "Dashboard | STP",
};

async function page() {
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
      roll_Number: user.rollNumber,
      admission_Number: user.admissionNumber,
      year: user.year,
      section: user.section,
    }));
    console.log(formattedData, "aa gaya");
    return formattedData;
  }

  // Fetch the data
  const data = await getData();

  // Render the page

  return (
    <div className="space-y-4 min-h-screen">
      {/* <h1 className="text-3xl md:text-5xl font-semibold">Dashboard</h1> */}
      <HomePageGreeting />

      {session.user.isStudent ? (
        <div>
          {/* Render a different UI for students */}
          <CalendarLayout />
          <LocationAccessPopup />
        </div>
      ) : (
        <DataTable
          data={data}
          columns={columns}
          addNewLink="/dashboard/all_students/add/"
          addNewText="Add new user"
        />
      )}
    </div>
  );
}

export default page;
