"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handelTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  return (
    <button
      type="button"
      onClick={handelTheme}
      aria-label="Toggle theme"
      className="flex h-10 w-10 items-center justify-center rounded-full border  bg-background text-foreground hover:bg-muted"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-5 w-5 text-sun cursor-pointer" />
      ) : (
        <Moon className="h-5 w-5 text-brand cursor-pointer" />
      )}
    </button>
  );
};

export default ThemeToggle;
