"use client";
import { signUp } from "@/app/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { Check, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


const RegisterPage = () => {
  const router = useRouter();
  const [submit, setSubmit] = useState(false);
  const [validate, setValidate] = useState("");
  const [toggle, setToggle] = useState(false);

  const hasMinLength = validate.length >= 6;
  const hasOneUpperCase = /[A-Z]/.test(validate);
  const hasOneLowerCase = /[a-z]/.test(validate);
  const hasOneDigitCase = /[0-9]/.test(validate);

  const handelSignUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const signUpdata = Object.fromEntries(formData.entries()) as Record<
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

    const { data, error } = await signUp.email({
      name: signUpdata.username,
      email: signUpdata.email,
      image: signUpdata.image
        ? signUpdata.image
        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      password: signUpdata.password,
    });

    setSubmit(false);

    if (data?.user) {
      toast.add({
        title: "Account register successfully!",
        description: "Welcome to Upswell.",
        type: "success",
      });

      router.push("/up-comming");
    } else {
      toast.add({
        title: `${error?.message}`,
        description: "Please try again later",
        type: "error",
      });
      console.log(error);
    }
  };
  return (
    <div>
      {/* Heading */}
      <h1 className="text-3xl leading-tight font-black uppercase tracking-tight text-card-foreground lg:text-4xl">
        Create Account
      </h1>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Join the community and start driving social change
      </p>

      {/* Register form (UI only, no functionality) */}
      <form className="mt-8 space-y-5" onSubmit={handelSignUp}>
        <div className="space-y-2">
          <Label htmlFor="username" className="text-card-foreground">
            Username
          </Label>
          <Input
            id="username"
            name="username"
            required
            type="text"
            placeholder="Input username"
            className="h-11 rounded-lg px-3"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-card-foreground">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            required
            type="email"
            placeholder="Input email"
            className="h-11 rounded-lg px-3"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-card-foreground">
            Image
          </Label>
          <Input
            id="image"
            name="image"
            type="text"
            placeholder="https://...."
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

          <Button
          type="submit"
          disabled={submit}
          className="h-11 w-full mt-8 rounded-lg bg-brand text-white hover:bg-brand/90"
        >
          {submit ? (
            <Spinner className="size-5 text-white" />
          ) : (
            "Register - Start your Journey"
          )}
        </Button>

          
        </div>

        {/* Terms text */}
        <p className="text-sm leading-relaxed text-center text-muted-foreground">
          Already have an account?
          <Link
            href={"sign-in"}
            className="font-medium ml-2 text-card-foreground hover:underline"
          >
            Login here
          </Link>
        </p>

        {/* Submit button (UI only, no functionality) */}
        
      </form>
    </div>
  );
};

export default RegisterPage;
