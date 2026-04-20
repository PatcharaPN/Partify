"use client";
import Link from "next/link";
import Button from "../ui/Button";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks";
import { logout } from "@/app/store/slices/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

export default function TopBar() {
  const router = useRouter();
  const path = usePathname();
  const isActive = (route: string) => path.startsWith(route);
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.AuthReducer,
  );
  const dispatch = useAppDispatch();

  console.log("Param", path);

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
            className={`${
              isActive("/jobs")
                ? "decoration-primary text-primary underline underline-offset-2 "
                : ""
            } decoration-2 font-headline px-4 py-2`}
            href="/jobs"
          >
            ค้นหางาน
          </Link>
          <Link
            className={`${
              isActive("/dashboard")
                ? "decoration-primary underline underline-offset-2 text-primary"
                : ""
            } decoration-2 font-headline px-4 py-2`}
            href="/dashboard"
          >
            แดชบอร์ด
          </Link>
        </nav>
        <div className="flex items-center gap-5">
          {" "}
          <button className="relative p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors">
            <Icon icon="heroicons:bell" className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>{" "}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link href={"/profile/edit"} className="flex items-center gap-3">
                <img
                  src={user?.profile?.avatarUrl || "/images/default-avatar.png"}
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="text-neutral-700 font-medium">
                  {user?.profile?.name}
                </span>
              </Link>

              <button
                onClick={() => {
                  localStorage.removeItem("access_token");
                  dispatch(logout());
                  router.push("/login");
                }}
                className="text-sm text-red-500 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Button onClick={() => router.push("/login")} variant={"primary"}>
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
