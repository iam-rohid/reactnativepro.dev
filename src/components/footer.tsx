import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SITE_NAME, TWITTER_HANDLE } from "@/constants";

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container">
        <div className="grid gap-x-4 gap-y-8 py-8 md:grid-cols-2 md:py-16 lg:grid-cols-3">
          <div>
            <Link
              href="/"
              className="font-semibold transition-opacity hover:opacity-90"
            >
              {SITE_NAME}
            </Link>
          </div>
          <div>
            <p className="font-medium uppercase text-muted-foreground">
              Contacts
            </p>
            <ul className="mt-4 space-y-4">
              {[
                {
                  label: "Twitter",
                  href: `https://twitter.com/${TWITTER_HANDLE}`,
                },
                {
                  label: "Email",
                  href: "mailto:rohid@tinybytelabs.com",
                },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-medium text-muted-foreground hover:text-accent-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="max-lg:col-span-2 max-md:col-span-1">
            <p className="font-medium uppercase text-muted-foreground">
              Newsletter
            </p>
            <div className="mt-4">
              <p className="text-muted-foreground">
                Get all latest React Native content right in your inbox
              </p>
              <form className="mt-2 flex gap-4">
                <Input className="flex-1" placeholder="john@example.com" />
                <Button>Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
