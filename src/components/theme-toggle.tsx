"use client"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";


const ThemeToggle = () => {
    const {resolvedTheme, setTheme} = useTheme();

    const [mounted, setMounted] = useState(false);
    
    useEffect(()=>{
        setMounted(true);
    },[])


    if(!mounted){
        return null;
    }

    const handelTheme = ()=>{
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }
    return (
        <Button
      variant="outline"
      size="icon"
      onClick={handelTheme}
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun />
      ) : (
        <Moon />
      )}
    </Button>
    );
};

export default ThemeToggle;