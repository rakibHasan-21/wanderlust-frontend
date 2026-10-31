"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Destinations", href: "/destinations" },
  { name: "Add Destination", href: "/add-destination" },
  { name: "My Booking", href: "/my-booking" },
  { name: "Admin", href: "/admin" },
] as const;

const Header = () => {
  const router = useRouter();
  const { data: sesstion } = authClient.useSession();
  const user = sesstion?.user;
  console.log(user);
  return (
    <div>
      <header className="grid h-14 grid-cols-[1fr_auto_1fr] items-center bg-white px-4 sm:px-10">
        {/* Navigation Links */}
        <nav className="hidden items-center gap-7 text-sm md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-foreground/75 transition-colors hover:text-foreground",
                link.name === "Home" &&
                  "border-primary pb-0.5 font-medium text-primary",
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Logo */}
        <Link href="/" className="justify-self-center">
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={126}
            height={24}
            className="h-auto"
            priority
          />
        </Link>

        {/* Profile & Authentication */}
        <div className="flex items-center justify-self-end gap-4 text-sm sm:gap-7">
          <Link
            href="/profile"
            className="flex items-center gap-1.5 text-foreground/75 transition-colors hover:text-foreground"
          >
            <User className="size-4" />
            <span className="hidden sm:inline">Profile</span>
          </Link>

          {user ? (
            <Popover>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Open user menu"
                  >
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user.image ?? ""}
                        alt={user.name ?? "User"}
                      />
                      <AvatarFallback>
                        {user.name?.charAt(0).toUpperCase() ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                }
              />

              <PopoverContent className="w-64">
                <PopoverHeader>
                  <PopoverTitle>{user.name}</PopoverTitle>
                  <PopoverDescription>{user.email}</PopoverDescription>
                </PopoverHeader>

                <Button
                  variant="outline"
                  className="mt-3 w-full"
                  onClick={async () => {
                    const { error } = await authClient.signOut();

                    if (error) {
                      console.error("SignOut Error:", error);
                      return;
                    }

                    router.push("/login");
                    router.refresh();
                  }}
                >
                  Sign Out
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Link
                href="/login"
                className="text-foreground/75 transition-colors hover:text-foreground"
              >
                Login
              </Link>

              <Link
                href="/signUp"
                className="text-foreground/75 transition-colors hover:text-foreground"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
