import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Home,
  PanelLeft,
  Search,
  Settings,
  User,
  Mail,
  LogOut,
  Building,
  Package,
  ContactRoundIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import { auth, signOut } from "@/auth";

export default async function Header() {
  const { user } = await auth();



  const studentSidebarItems = [
    // Define sidebar items for students
    // { id: 1, name: 'Student Dashboard', link: '/dashboard/student' },
    // { id: 2, name: 'Attendance', link: '/attendance' },
  ];
  
  const nonStudentSidebarItems = [
    // Define sidebar items for non-students
    { id: 1, name: 'All Students', link: '/dashboard/all_students' },
    { id: 2, name: 'All Teachers', link: '/dashboard/all_teachers' },
    // Add more non-student-specific items here
  ];
  
  const sidebarItems = user.isStudent ? studentSidebarItems : nonStudentSidebarItems;

  
  return (
    <>
      <nav className=" py-4 sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-transparent text-lg font-semibold text-primary-foreground md:text-base"
              >
                <div>
                  <LayoutDashboardIcon className="h-8 w-8 bg-primary text-white dark:text-black p-1 rounded-full inline mx-2 md:mx-0" />
                </div>
                <span className="sr-only">company logo</span>
              </Link>
              {sidebarItems.map((item, index) => (
                <Link
                  href={item.link}
                  key={item.id}
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  {item.logo} {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex">
          {" "}
          {/* This div is for breadcrumbs */}
          <nav className="flex gap-6 text-lg font-medium">
              <Link
                href="#"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-transparent text-lg font-semibold text-primary-foreground md:text-base"
              >
                <Link href="/">
                  <LayoutDashboardIcon className="h-8 w-8 bg-primary text-white dark:text-black p-1 rounded-full inline mx-2 md:mx-0" />
                </Link>
                <span className="sr-only">company logo</span>
              </Link>
            
              {sidebarItems.map((item) => (
      <Link
        href={item.link}
        key={item.id}
        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
      >
        {item.name}
      </Link>
    ))}
            </nav>
        </div>

        {/* <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          />
        </div> */}
        <div className="relative flex ml-auto flex-1 md:grow-0 w-full space-x-4">       
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.img || "/noavatar.png"} alt={user.username} />
            <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit" align="end" forceMount>
        {/* <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>{user.username}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Mail className="mr-2 h-4 w-4" />
            <span>{user.email}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Building className="mr-2 h-4 w-4" />
            <span>{user.companyID}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* {user?.isStudent ? (
          <DropdownMenuItem>
          <Link href={`/dashboard/student/${user?._id.toString()}`}>
                <User className="mr-2 h-4 w-4" />
                <span>view Profile</span>
            </Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
     <Link href={`/dashboard/student/${user?._id.toString()}`} className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>view Profile</span>
            </Link>
          </DropdownMenuItem>
        )} */}
        <DropdownMenuItem>
          <form
            className="w-full"
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="w-full text-left flex items-center">
              <LogOut className="mr-2 h-4 w-4 transition hover:text-destructive" />
              <span>Log out</span>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
        <ThemeToggle />
        </div>
      </nav>
    </>
  );
}
