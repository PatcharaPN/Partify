"use client";
import Link from "next/link";
import Button from "../ui/Button";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks";
import { logout } from "@/app/store/slices/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import NotificationContainer from "../ui/NotificationContainer";
import { useState } from "react";
import { useNotification } from "@/app/hooks/useNotification";
import AvatarProfilePrefix from "../ui/AvatarProfilePrefix";
import { motion } from "framer-motion";

export default function TopBar() {
  const router = useRouter();
  const path = usePathname();
  const [openNotification, setOpenNotification] = useState(false);
  const { notification, handleReadAll, handleReadOne, error } =
    useNotification(openNotification);
  const isActive = (route: string) => path.startsWith(route);
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.AuthReducer,
  );
  const dispatch = useAppDispatch();

  const [openMenu, setOpenMenu] = useState(false);
  return (
    <header className="sticky top-0 z-20 w-full shadow-md bg-white px-2 py-3">
      <div className="mx-auto grid grid-cols-3">
        <Link
          className="inline-block text-primary text-xl font-bold font-headline px-4 py-2"
          href="/"
        >
          Partify
        </Link>

        <nav className="flex items-center justify-center">
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
          {user?.role === "EMPLOYER" ? (
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
          ) : null}
        </nav>
        <div className="flex items-center justify-end gap-5">
          {" "}
          <div className="relative">
            {isAuthenticated && (
              <button
                onClick={() => setOpenNotification(!openNotification)}
                className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Icon icon="heroicons:bell" className="w-5 h-5" />

                {notification?.some((n) => !n.isRead) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                )}
              </button>
            )}

            {openNotification && (
              <NotificationContainer
                onReadAll={handleReadAll}
                onReadOne={handleReadOne}
                onClose={() => setOpenNotification(!openNotification)}
                notifications={notification || []}
              />
            )}
          </div>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link href={"/profile/info"} className="flex items-center gap-3">
                {user?.profile?.avatarUrl ? (
                  <img
                    src={
                      user?.profile?.avatarUrl || "/images/default-avatar.jpg"
                    }
                    alt="avatar"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <AvatarProfilePrefix
                    firstName={user?.profile?.firstName ?? "?"}
                  />
                )}
                <span className="text-neutral-700 font-medium">
                  {user?.profile?.firstName}
                </span>
              </Link>
              <div className="relative">
                {" "}
                <button
                  className="flex items-center justify-center"
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  <Icon icon={"ep:arrow-down"} width={24} height={24} />
                </button>
                {openMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50"
                  >
                    <Link
                      href="/profile/info"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Icon icon="mdi:account-outline" className="w-4 h-4" />
                      โปรไฟล์
                    </Link>
                    <div className="h-px bg-gray-100 my-1" />
                    <button
                      onClick={() => {
                        localStorage.removeItem("access_token");
                        try {
                          dispatch(logout());
                          router.replace("/login");
                          router.refresh();
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                    >
                      <Icon icon="mdi:logout" className="w-4 h-4" />
                      ออกจากระบบ
                    </button>
                  </motion.div>
                )}
              </div>
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
