"use client";
import Link from "next/link";
import Button from "../ui/Button";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks";
import { logout } from "@/app/store/slices/authSlice";

export default function TopBar() {
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.AuthReducer,
  );
  const dispatch = useAppDispatch();

  console.log(user);

  return (
    <header className="w-full shadow-md bg-white px-2 py-3">
      <div className="mx-auto flex items-center justify-between">
        <Link
          className="inline-block text-primary text-xl font-bold font-headline px-4 py-2"
          href="/"
        >
          Partify
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            className="underline underline-offset-5 decoration-primary decoration-2 inline-block text-primary text-xl font-bold font-headline px-4 py-2"
            href="/"
          >
            Find Jobs
          </Link>
          <Link
            className="inline-block text-neutral-600 font-headline px-4 py-2"
            href="/"
          >
            Post a Job
          </Link>
        </nav>

        {isLoading ? (
          // skeleton ตรงนี้แทน flash
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
            <div className="w-20 h-4 rounded bg-gray-200 animate-pulse" />
          </div>
        ) : isAuthenticated ? (
          <div className="flex items-center gap-3">
            <img
              src={user?.profile?.avatarUrl ?? undefined}
              alt="avatar"
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="text-neutral-700 font-medium">
              {user?.profile?.name}
            </span>
            <button
              onClick={() => {
                localStorage.removeItem("access_token");
                dispatch(logout());
              }}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>
        ) : (
          <a href="http://localhost:3001/auth/line">
            <Button>Sign In</Button>
          </a>
        )}
      </div>
    </header>
  );
}
