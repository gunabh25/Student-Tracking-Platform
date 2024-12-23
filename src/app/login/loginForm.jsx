"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue, } from "@/components/ui/select";

const LoginForm = () => {
  const [state, formAction] = useFormState(authenticate, undefined);

  return (
    <div>
      {/* The outer form element */}
      <form action={formAction}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Teacher Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                {/* Label and input for username */}
                <Label htmlFor="username">Name</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="grid gap-2">
                {/* Label and input for company ID */}
                <Label htmlFor="companyid">Department</Label>
                {/* <Input
                  id="companyid"
                  name="companyid"
                  type="text"
                  placeholder="Enter department ID"
                  required
                /> */}
               <Select name="companyid" id="companyid" required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                  <SelectItem value="BBA">BBA</SelectItem>
                  <SelectItem value="BPharma">B.Pharma</SelectItem>
                    <SelectItem value="CSE">CSE</SelectItem>
                    <SelectItem value="CSE-AI">CSE-AI</SelectItem>
                    <SelectItem value="CSE-DS">CSE-DS</SelectItem>
                    <SelectItem value="CSE-IOT">CSE-IOT</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="MCA">MCA</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  {/* Label and input for password */}
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="******"
                  required
                />
              </div>
              {/* Login button */}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
             Are you a student?{" "}
              <Link href="/student_login" className="underline">
                Login as student
              </Link>
            </div>
          </CardContent>
        </Card>
        {/* Display state if available */}

        <div className="hidden">
          {state && toast.error(state)}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
