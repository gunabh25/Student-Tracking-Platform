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
import {Badge} from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchUser } from "@/app/lib/data";

export const metadata = {
  title: "Teacher Profile | STP",
};

export default async function page(params) {
  console.log(params, "is the params");
  const { id } = params.params;
  console.log(id, "is the id");
  const user = await fetchUser(id);
  console.log(user);

  return (
    // Form to update user
    <form action={updateUser} className="py-12 px-4 md:px-6 lg:px-8">
    <Card className="mx-auto max-w-6xl">
      <CardHeader className="pb-8 pt-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-24 h-24 border-2 border-border">
            <AvatarImage src={user.img || "/placeholder.svg?height=96&width=96"} alt={user.username} />
            <AvatarFallback className="text-2xl">{user.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">{user.username}</h2>
            <p className="text-muted-foreground">{user.companyID}</p>
            <Badge className="mt-2" variant={user.isActive ? "default" : "secondary"}>
              {user.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-sm font-medium">Name</Label>
              <Input
                id="username"
                placeholder="Full Name"
                name="username"
                required
                defaultValue={user.username}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                defaultValue={user.email}
                disabled
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
              <Input
                id="phone"
                placeholder="Phone Number"
                name="phone"
                defaultValue={user.phone}
                className="mt-1"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="teacherId" className="text-sm font-medium">Teacher ID</Label>
              <Input
                id="teacherId"
                name="teacherId"
                defaultValue={user.teacherId}
                disabled
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="companyID" className="text-sm font-medium">Department</Label>
              <Input
                id="companyID"
                name="companyID"
                defaultValue={user.companyID}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-medium">New Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Leave blank to keep current"
                className="mt-1"
              />
            </div>
          </div>
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <div>
              <Label htmlFor="address" className="text-sm font-medium">Address</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Enter your address"
                defaultValue={user.address}
                className="mt-1"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="img" className="text-sm font-medium">Profile Picture URL</Label>
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
        </div>
      </CardContent>
      <CardFooter className="flex justify-end pt-6">
        <Button type="submit">
          Update Profile
        </Button>
      </CardFooter>
    </Card>
  </form>
)
}

