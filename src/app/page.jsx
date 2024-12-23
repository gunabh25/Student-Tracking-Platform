import { ThemeToggle } from "@/components/theme-button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  BoxesIcon,
  LucideUsers2,
  MessageCircleQuestionIcon,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen ">
      <div className="absolute z-10 top-0 left-0 p-6">
        <ThemeToggle />
      </div>
      {/* <header className="shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">CRM Application</h1>
          <nav>
            <Link href="/login">
              <Button variant="secondary" className="mr-4">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button>Signup</Button>
            </Link>
          </nav>
        </div>
      </header> */}

      <div className="absolute left-0 right-0 h-screen flex flex-col items-center justify-center bg-gradient-to-b">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <Image
            src="/collegeLogo.png"
            alt="Institution Logo"
            width={420}
            height={420}
            className="mx-auto"
          />
          {/* <h1 className="text-4xl font-bold ">ABES Institute of Technology</h1> */}
        </div>
        <p className="text-xl max-w-md mx-auto">
          Welcome to our online portal. Please select your role to log in.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/student_login">
            <Button size="lg" className="w-full sm:w-auto">
              Student Login
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Teacher Login
            </Button>
          </Link>
        </div>
      </div>
    
    </div>
    </div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <Card className="text-center p-6 border border-gray-200 rounded-lg hover:bg-primary/10 dark:hover:bg-primary-foreground/50 transition-colors">
      <div className="text-6xl mb-4">{icon}</div>
      <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      <CardDescription className="mt-2">{description}</CardDescription>
    </Card>
  );
}
