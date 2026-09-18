import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] bg-atelier px-6 text-center">
      <div className="space-y-8 max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-wide uppercase text-ivory leading-tight">
          THE PERFECT FIT SEEMS TO HAVE GONE MISSING.
        </h1>
        <p className="font-sans text-muted max-w-md mx-auto text-sm tracking-wider uppercase">
          404 - Page not found
        </p>
        <div className="pt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/">RETURN HOME</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
