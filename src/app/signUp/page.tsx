"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";



export default function SignUp() {
    const router = useRouter();
  const hendleSubmited = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);

    const alldata = Object.fromEntries(formdata.entries()) as {
      name: string;
      email: string;
      image: string;
      password: string;
    };

    try {
      const { data, error } = await authClient.signUp.email({
        name: alldata.name,
        email: alldata.email,
        password: alldata.password,
        image: alldata.image,
      });

      if (error) {
        console.log("Signup Error:", error);
      } else {
        router.push('/')
      }
    } catch (err) {
      console.log("Unexpected Error:", err);
    }
  };
  return (
    <div className="flex flex-col gap-6 max-w-[400px] mx-auto py-5">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={hendleSubmited}>
            <FieldGroup>
              <Field>
                <Button variant="outline" type="button">
                  Login with Apple
                </Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name?"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="image">Image URL</FieldLabel>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="Image URL..."
                  required
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </Field>

              <Field>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>

                <FieldDescription className="text-center">
                  Have an account? <a href="/login">Login</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
