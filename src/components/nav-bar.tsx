"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/utils";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HamburgerMenuIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ModeToggle } from "./mode-toggle";
import { SITE_NAME, TWITTER_HANDLE } from "@/constants";

export default function NavBar() {
  const pathname = usePathname();

  const links: {
    label: string;
    href: string;
    exact?: boolean;
  }[] = useMemo(
    () => [
      {
        label: "Tutorials",
        href: "/tutorials",
      },
      {
        label: "Tags",
        href: "/tags",
      },
      {
        label: "About",
        href: "/about",
      },
    ],
    [],
  );
  return (
    <header className="sticky top-0 z-10 border-b bg-card">
      <nav className="container flex h-16 items-center gap-8">
        <Link
          href="/"
          className="font-semibold transition-opacity hover:opacity-90"
        >
          {SITE_NAME}
        </Link>
        <div className="flex items-center justify-end gap-6 max-md:hidden">
          {links.map((link) => {
            const isActive = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href);
            return (
              <Link
                href={link.href}
                key={link.href}
                className={cn(
                  "text-muted-foreground transition-colors hover:text-accent-foreground",
                  {
                    "text-accent-foreground": isActive,
                  },
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`https://twitter.com/${TWITTER_HANDLE}`}>
              <TwitterLogoIcon className="h-5 w-5" />
              <p className="sr-only">Twitter</p>
            </Link>
          </Button>
          <ModeToggle />
          <Drawer>
            <DrawerTrigger asChild>
              <Button size="icon" variant="ghost" className="md:hidden">
                <HamburgerMenuIcon className="h-5 w-5" />
                <p className="sr-only">Menu</p>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex flex-col p-2">
                {links.map((link) => {
                  const isActive = link.exact
                    ? pathname === link.href
                    : pathname.startsWith(link.href);
                  return (
                    <DrawerClose asChild key={link.href}>
                      <Button
                        asChild
                        variant="ghost"
                        className={cn("h-auto justify-start p-4 text-left", {
                          "bg-secondary text-secondary-foreground": isActive,
                        })}
                        size="lg"
                      >
                        <Link href={link.href}>{link.label}</Link>
                      </Button>
                    </DrawerClose>
                  );
                })}
                <DrawerClose asChild>
                  <Button
                    variant="ghost"
                    className="h-auto justify-start p-4 text-left"
                    size="lg"
                  >
                    Close
                  </Button>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  );
}
