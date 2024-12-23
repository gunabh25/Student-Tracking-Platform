import { updateUser } from "@/app/lib/actions";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchUser } from "@/app/lib/data";

export const metadata = {
  title: "Edit User | CRM App",
};

export default async function page(params) {
  console.log(params, "is the params");
  const { id } = params.params;
  console.log(id, "is the id");
  const user = await fetchUser(id);
  console.log(user);

  return (
    // Form to update user
    <form action={updateUser} className="py-8 px-4 md:px-0">
    <Card className="mx-auto max-w-7xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.img || "/placeholder.svg?height=96&width=96"} alt={user.username} />
            <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-2xl font-bold">Update user: {user.username}</CardTitle>
        <CardDescription>Enter information to update the user account.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Name*</Label>
              <Input
                id="username"
                placeholder="John Doe"
                name="username"
                required
                defaultValue={user.username}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password*</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                defaultValue={user.email}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="img">Profile Picture URL</Label>
              <Input
                id="img"
                type="url"
                name="img"
                placeholder="https://example.com/image.jpg"
                defaultValue={user.img}
                className="mt-1"
              />
            </div>
          </div>
          <div className="space-y-4">
            {/* <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="isAdmin">Is Admin</Label>
                <Select name="isAdmin" id="isAdmin" defaultValue={user.isAdmin ? "true" : "false"}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label htmlFor="isActive">Is Active</Label>
                <Select name="isActive" id="isActive" defaultValue={user.isActive ? "true" : "false"}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div> */}
              <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="year">Year*</Label>
              <Select id="year" name="year" defaultValue={user.year} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st Year</SelectItem>
                  <SelectItem value="2">2nd Year</SelectItem>
                  <SelectItem value="3">3rd Year</SelectItem>
                  <SelectItem value="4">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="section">Section*</Label>
              <Select id="section" name="section" defaultValue={user.section} required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="D">D</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
            <div>
              <Label htmlFor="admissionNumber">Admission Number</Label>
              <Input
                id="admissionNumber"
                name="admissionNumber"
                type="text"
                placeholder="Enter admission number"
                className="mt-1"
                value={user.admissionNumber}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="rollNumber">Roll Number</Label>
              <Input
                id="rollNumber"
                name="rollNumber"
                type="number"
                placeholder="Enter roll number"
                className="mt-1"
                value={user.rollNumber}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="123-456-7890"
                name="phone"
                defaultValue={user.phone}
                className="mt-1"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              placeholder="Type your address here."
              defaultValue={user.address}
              className="mt-1"
            />
          </div>
        
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-4">
        <Button type="submit" className="w-full md:w-auto">Update user account</Button>
        <p className="text-sm text-muted-foreground">Fields marked with * are required.</p>
      </CardFooter>
    </Card>
  </form>
  );
}
