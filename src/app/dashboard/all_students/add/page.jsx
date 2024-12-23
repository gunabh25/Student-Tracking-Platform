import Link from "next/link";
import { addUser } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { auth } from "@/auth";

export const metadata = {
  title: "Add New Student | STP"
}

// Define the page component
export default async function page() {

  // Authenticate the user
  const session = await auth();
  const companyID = session?.user?.companyID;

  return (
    <form action={addUser}>
    <Card className="mx-auto max-w-4xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Add new user</CardTitle>
        <CardDescription>
          Enter information to create a new user account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 flex flex-col items-center space-y-4">
            <Avatar className="w-40 h-40">
              <AvatarImage src='/noavatar.png' alt="User avatar" />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <Label htmlFor="img">Profile Picture URL</Label>
              <Input
                id="img"
                type="url"
                name="img"
                placeholder="https://example.com/image.jpg"
                // onChange={(e) => setAvatarUrl(e.target.value)}
              />
            </div>
          </div>
          <div className="md:w-2/3 grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Name*</Label>
                <Input id="username" placeholder="John Doe" name="username" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="password">Password*</Label>
                <Input id="password" type="password" name="password" placeholder="••••••••" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="123-456-7890" name="phone" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="admissionNumber">Admission Number</Label>
            <Input
              id="admissionNumber"
              name="admissionNumber"
              type="text"
              placeholder="Enter admission number"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="rollNumber">Roll Number</Label>
            <Input
              id="rollNumber"
              name="rollNumber"
              type="number"
              placeholder="Enter roll number"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="branch">Branch (if applicable)</Label>
            <Select name="branch" id="branch">
              <SelectTrigger>
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CSE">CSE</SelectItem>
                <SelectItem value="CSE_AI">CSE-AI</SelectItem>
                <SelectItem value="CSE_DS">CSE-DS</SelectItem>
                <SelectItem value="CSE_IT">IT</SelectItem>
                <SelectItem value="CSE_IoT">CSE-IoT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <div className="grid gap-2 align-top">
            <Label htmlFor="year">Year</Label>
            <Select name="year" id="year">
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1st Year</SelectItem>
                <SelectItem value="2">2nd Year</SelectItem>
                <SelectItem value="3">3rd Year</SelectItem>
                <SelectItem value="4">4th Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="section">Section</Label>
            <Select name="section" id="section">
              <SelectTrigger>
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="C">C</SelectItem>
                <SelectItem value="D">D</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              placeholder="Type your address here."
            />
          </div>
        </div>
        
        <div className="hidden gap-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="isAdmin">Is Admin</Label>
            <Select name="isAdmin" id="isAdmin" required defaultValue="true">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="isActive">Is active</Label>
            <Select name="isActive" id="isActive" required>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Input
          id="companyID"
          name="companyID"
          type="hidden"
          value={companyID}
          required
        />
        
        <Button type="submit" className="w-full">
          Create user account
        </Button>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">Fields marked with * are required.</p>
      </CardFooter>
    </Card>
  </form>
  );
}
