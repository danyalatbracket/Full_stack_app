import { SignedIn, SignedOut, SignIn, SignUp } from "@clerk/clerk-react";
import React from "react";

const AuthenticationPage = () => {
  return (
    <>
      <div className="auth-container">
        <SignedOut>
          <SignIn routing="path" path="/sign-in"></SignIn>
          <SignUp routing="path" path="/sign-up"></SignUp>
        </SignedOut>
        <SignedIn>
          <div className="redirect-message">
            <p>You are already signedIn</p>
          </div>
        </SignedIn>
      </div>
    </>
  );
};

export default AuthenticationPage;
