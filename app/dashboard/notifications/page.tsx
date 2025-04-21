"use client";
import { BellRing, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus, deserunt. Veniam similique maiores, tempore tenetur distinctio voluptate soluta corporis atque?",
    sentTime: "1 hour ago",
    isRead: true,
  },
  {
    title: "You have a new message!",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus, deserunt. Veniam similique maiores, tempore tenetur distinctio voluptate soluta corporis atque?",
    sentTime: "1 hour ago",
    isRead: false,
  },
  {
    title: "Your subscription is expiring soon!",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus, deserunt. Veniam similique maiores, tempore tenetur distinctio voluptate soluta corporis atque?",
    sentTime: "2 hours ago",
    isRead: true,
  },
];

export default function Notifications() {
  const [unReadMessage, setUnReadMessage] = useState(0);

  const getUnReadNotifications = () => {
    const unReadNotifications = notifications.filter(
      (notification) => notification.isRead === true,
    );
    setUnReadMessage(unReadNotifications.length);
  };

  useEffect(() => {
    getUnReadNotifications();
  }, []);

  const markAllRead = () => {
    // db more funcation
    notifications.forEach((notification) => (notification.isRead = false));
    getUnReadNotifications()
  };

  return (
    <Card className={"min-h-screen border-0 bg-inherit"}>
      <CardHeader>
        <CardTitle className="outlined-text text-2xl tracking-wide truncate">Notifications</CardTitle>
        <CardDescription>
          You have {unReadMessage} unread messages.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <label htmlFor="pushNotification">
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <BellRing />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Push Notifications
              </p>
              <p className="text-sm text-muted-foreground">
                Send notifications to device.
              </p>
            </div>
            <Switch id="pushNotification"/>
          </div>
        </label>

        <div className="w-full border" />

        <div>
          {notifications.map((notification, index) => {
            const [readNotification, setReadNotification] = useState(
              notification.isRead,
            );

            useEffect(() => {
              if(!notification.isRead){
                setReadNotification(false)
              }
            }, [notification.isRead]);

            const readNotificationHandler = () => {
              // more functions
              setReadNotification(false);
            };

            return (
              <div
                key={index}
                className="mb-4 grid cursor-pointer grid-cols-[25px_1fr] items-start rounded-md border p-2 pb-4"
                onClick={readNotificationHandler}
              >
                <span
                  className={`flex h-2 w-2 translate-y-1 rounded-full ${readNotification ? "bg-sky-500" : "bg-gray-500"}`}
                />
                <div className="space-y-1">
                  <p className="text-md font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-sm font-medium leading-none">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.sentTime}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={markAllRead} disabled={unReadMessage === 0}>
          <Check /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
}
