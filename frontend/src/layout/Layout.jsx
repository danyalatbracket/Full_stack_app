import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import React from "react";
import { Navigate, Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="app-layout">
        <header className="app-header">
          <div className="header-content">
            <h1
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}
            >
              Code Challenge Generator
            </h1>
            <nav>
              <SignedIn>
                <Link to="/">Generate Challenge</Link>
                <Link to="/history">History</Link>
                <UserButton></UserButton>
              </SignedIn>
            </nav>
          </div>
        </header>
        <main className="app-main">
          <SignedOut>
            <Navigate to="sign-in" replace></Navigate>
          </SignedOut>
          <SignedIn>
            <Outlet>
              {/* Here the content of layout component 
                dynamically added from app.jsx routes */}
            </Outlet>
          </SignedIn>
        </main>
      </div>
    </>
  );
};

export default Layout;
