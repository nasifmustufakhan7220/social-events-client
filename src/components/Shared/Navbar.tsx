import React from "react";
import { Button } from "../ui/button";
import ThemeToggle from "../theme-toggle";

const Navbar = () => {
  return (
    <div>
      <nav className="flex items-center justify-between">
        <h1 className="text-xl font-bold">My Application</h1>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Button className={`bg-background`}>Get Started</Button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
