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

export default function Login() {
  const router = useRouter();
  const hendleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);

    const alldata = Object.fromEntries(formdata.entries()) as {
      email: string;
      password: string
    };
    try {
      const { data, error } = await authClient.signIn.email({
        email: alldata.email,
        password: alldata.password,
      });

      if (error) {
        console.log("Login Error:", error);
      } else {
        console.log("Login Success:", data);
        router.push("/");
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
          <form onSubmit={hendleLogin}>
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
                  Login
                </Button>

                <FieldDescription className="text-center">
                  Have an account? <a href="/signUp">SignUp</a>
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
