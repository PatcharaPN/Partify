import Link from "next/link";
import Button from "../ui/Button";

export default function TopBar() {
  return (
    <header className="w-full shadow-md  bg-white px-2 py-3">
      <div className="mx-auto flex items-center justify-between">
        <Link
          className="inline-block text-primary text-xl font-bold font-headline px-4 py-2"
          href="/"
        >
          Partify
        </Link>
        <nav className="flex items-center gap-4">
          {" "}
          <Link
            className="underline underline-offset-5 decoration-primary decoration-2 inline-block text-primary text-xl font-bold font-headline px-4 py-2"
            href="/"
          >
            Find Jobs
          </Link>{" "}
          <Link
            className="inline-block text-neutral-600 font-headline px-4 py-2"
            href="/"
          >
            Post a Job
          </Link>
        </nav>{" "}
        <Button>Sign In</Button>
      </div>
    </header>
  );
}
