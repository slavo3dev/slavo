import { useContext, useMemo, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { Bell, CheckCircle2, MessageSquare, X } from "lucide-react";
import UserInfoContext from "@/context/UserInfoContext";

interface Notification {
  id: string;
  recipient_email: string;
  actor_email: string;
  type: string;
  source_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface NotificationsBellProps {
  fullWidth?: boolean;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return res.json();
};

const formatNotificationDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const NotificationsBell = ({
  fullWidth = false,
}: NotificationsBellProps) => {
  const { userInfo } = useContext(UserInfoContext);
  const [isOpen, setIsOpen] = useState(false);

  const userEmail = userInfo?.email;

  const {
    data: notifications = [],
    mutate,
    isValidating,
  } = useSWR<Notification[]>(
    userEmail
      ? `/api/notifications?email=${encodeURIComponent(userEmail)}`
      : null,
    fetcher,
    {
      refreshInterval: 15000,
      revalidateOnFocus: true,
    },
  );

  const unreadCount = useMemo(
    () =>
      notifications.filter((notification) => !notification.is_read)
        .length,
    [notifications],
  );

  const markAsRead = async (notificationId: string) => {
    try {
      const res = await fetch("/api/notifications/read", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: notificationId }),
      });

      if (!res.ok) {
        throw new Error("Failed to mark notification as read");
      }

      await mutate(
        notifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification,
        ),
        false,
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  if (!userEmail) {
    return null;
  }

  return (
    <div className={`relative ${fullWidth ? "w-full" : ""}`}>
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className={
          fullWidth
            ? "relative flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            : "relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        }
        aria-label="Open notifications"
      >
        <Bell size={20} />

        {fullWidth ? <span>Notifications</span> : null}

        {unreadCount > 0 ? (
          <span
            className={
              fullWidth
                ? "ml-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-xs font-bold text-white"
                : "absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-xs font-bold text-white"
            }
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <div
          className={
            fullWidth
              ? "mt-3 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
              : "absolute right-0 z-50 mt-3 w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl sm:w-[380px]"
          }
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <div>
              <p className="text-sm font-bold text-slate-900">
                Notifications
              </p>
              <p className="text-xs text-slate-500">
                {unreadCount > 0
                  ? `${unreadCount} unread notification${
                      unreadCount === 1 ? "" : "s"
                    }`
                  : "No unread notifications"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Close notifications"
            >
              <X size={16} />
            </button>
          </div>

          <div className="max-h-[420px] overflow-y-auto">
            {isValidating && notifications.length === 0 ? (
              <div className="p-5 text-sm text-slate-500">
                Loading notifications...
              </div>
            ) : null}

            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border-b border-slate-100 p-4 last:border-b-0 ${
                    notification.is_read ? "bg-white" : "bg-blue-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-blue-100 p-2 text-blue-700">
                      <MessageSquare size={16} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900">
                        {notification.message}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {formatNotificationDate(
                          notification.created_at,
                        )}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {!notification.is_read ? (
                          <button
                            type="button"
                            onClick={() =>
                              markAsRead(notification.id)
                            }
                            className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                          >
                            <CheckCircle2 size={14} />
                            Mark read
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500">
                            <CheckCircle2 size={14} />
                            Read
                          </span>
                        )}

                        <Link
                          href="/porch"
                          onClick={() => {
                            markAsRead(notification.id);
                            setIsOpen(false);
                          }}
                          className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          View Porch
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  <Bell size={20} />
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-900">
                  No notifications yet
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  When someone comments on your Porch update, you will
                  see it here.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
