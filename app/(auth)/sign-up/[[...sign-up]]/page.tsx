import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <main>
      <main className="flex-center h-screen">
        <SignUp />
      </main>
    </main>
  );
};

export default SignUpPage