"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Eye, EyeOff } from "lucide-react";
import { signIn } from "@/app/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [submit, setSubmit] = useState(false);
  const [validate, setValidate] = useState("");
  const [toggle, setToggle] = useState(false);

  const hasMinLength = validate.length >= 6;
  const hasOneUpperCase = /[A-Z]/.test(validate);
  const hasOneLowerCase = /[a-z]/.test(validate);
  const hasOneDigitCase = /[0-9]/.test(validate);
  const handelSignIn = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const signInData = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    if (
      !hasMinLength ||
      !hasOneUpperCase ||
      !hasOneLowerCase ||
      !hasOneDigitCase
    ) {
      return toast.add({
        title: `Fullfill the password requirements`,
        description: "Please try again",
      });
    }

    setSubmit(true);
    const { data, error } = await signIn.email({
      email: signInData.email,
      password: signInData.password,
    });

    setSubmit(false);
    if (data?.user) {
      toast.add({
        title: "Welcome back!",
        description: "You've logged in successfully.",
        type: "success",
      });
      console.log(data);

      router.push("/up-comming");
    } else {
      toast.add({
        title: `${error?.message}`,
        description: "Please try again later",
        type:"error"
      });
      console.log(error);
    }
  };
  return (
    <div>
      {/* Heading */}
      <h1 className="text-3xl leading-tight font-black uppercase tracking-tight text-card-foreground lg:text-4xl">
        Welcome back traveler
      </h1>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Ready to continue your adventure? Sign in to your Traveler account and
        pick up right where you left off.
      </p>

      {/* Login form (UI only, no functionality) */}
      <form className="mt-8 space-y-5" onSubmit={handelSignIn}>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-card-foreground">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Input email"
            className="h-11 rounded-lg px-3"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-card-foreground">
            Password
          </Label>
          {/* Wrapper so we can place the eye icon inside the input */}
          <div className="relative">
            <Input
              id="password"
              name="password"
              value={validate}
              onChange={(e) => setValidate(e.target.value)}
              type={toggle ? "text" : "password"}
              placeholder="password"
              className="h-11 rounded-lg px-3 pr-10"
            />
            <button
              type="button"
              onClick={() => setToggle(!toggle)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {toggle ? (
                <EyeOff className="size-3.5" />
              ) : (
                <Eye className="size-3.5" />
              )}
            </button>
          </div>

          {validate.length > 0 && (
            <div className="space-y-1 pt-1 text-[10px]">
              <p
                className={`flex items-center gap-2 ${hasMinLength ? "text-brand" : "text-slate-400"}`}
              >
                <Check size={11} />
                At least 6 characters
              </p>
              <p
                className={`flex items-center gap-2 ${hasOneUpperCase ? "text-brand" : "text-slate-400"}`}
              >
                <Check size={11} />
                One uppercase letter
              </p>
              <p
                className={`flex items-center gap-2 ${hasOneLowerCase ? "text-brand" : "text-slate-400"}`}
              >
                <Check size={11} />
                One lowercase letter
              </p>
              <p
                className={`flex items-center gap-2 ${hasOneDigitCase ? "text-brand" : "text-slate-400"}`}
              >
                <Check size={11} />
                One Digit
              </p>
            </div>
          )}
        </div>

        {/* Submit button (UI only, no functionality) */}
        <Button
          type="submit"
          disabled={submit}
          className="h-11 w-full rounded-lg bg-brand text-white hover:bg-brand/90"
        >

          {submit ? (
            <Spinner className="size-5 text-white" />
          ) : (
            "Login here"
          )}
        </Button>

        {/* Link to the register page */}
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-card-foreground hover:underline"
          >
            Rigister Free
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
