import React from "react";
import StudentLoginForm from "./LoginForm";

export const metadata = {
  title: "Student Login | STP",
}

function page() {
  return (
    <div className="h-screen flex items-center justify-center">
      <StudentLoginForm/>
    </div>
  );
}

export default page;
