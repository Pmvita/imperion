import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center">
      <div className="text-5xl font-bold">
        <span className="text-accent">Imperion</span>
      </div>
      <p className="max-w-xl text-muted-foreground">
        Banking, payments, and crypto in a single unified account. Web and mobile,
        one identity, one balance.
      </p>
      <div className="flex gap-3">
        <Link href="/login"><Button>Log in</Button></Link>
        <Link href="/signup"><Button variant="secondary">Create account</Button></Link>
      </div>
    </div>
  );
}
