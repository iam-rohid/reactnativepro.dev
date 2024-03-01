import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="container my-32 flex flex-col items-center">
        <h1 className="text-center text-6xl font-black md:text-8xl">404</h1>
        <h2 className="mt-4 text-center text-3xl font-semibold md:text-4xl">
          Page not found!
        </h2>
        <Button asChild className="mt-8">
          <Link href="/">
            <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" />
            Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
