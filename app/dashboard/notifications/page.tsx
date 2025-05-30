"use client";

import { useEffect, useState } from "react";
import { BellRing, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus, deserunt. Veniam similique maiores, tempore tenetur distinctio voluptate soluta corporis atque?",
    sentTime: "1 hour ago",
    isRead: true,
  },
  {
    title: "You have a new message!",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus, deserunt. Veniam similique maiores, tempore tenetur distinctio voluptate soluta corporis atque?",
    sentTime: "1 hour ago",
    isRead: true,
  },
  {
    title: "Your subscription is expiring soon!",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus, deserunt. Veniam similique maiores, tempore tenetur distinctio voluptate soluta corporis atque?",
    sentTime: "2 hours ago",
    isRead: true,
  },
];

export default function Notifications() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [readStates, setReadStates] = useState<boolean[]>(notifications.map(n => n.isRead));

 const updateUnreadCount = useCallback(() => {
  const count = readStates.filter((state) => state).length;
  setUnreadCount(count);
}, [readStates]);

  
  useEffect(() => {
    updateUnreadCount();
  }, [updateUnreadCount]);
  

  const markAllAsRead = () => {
    notifications.forEach(notification => notification.isRead = false);
    setReadStates(notifications.map(() => false));
    updateUnreadCount();
  };

  const handleNotificationClick = (index: number) => {
    if (!readStates[index]) return;
  
    const newReadStates = [...readStates];
    newReadStates[index] = false;
    setReadStates(newReadStates);
    updateUnreadCount();
  };
  

  return (
    <Card className="min-h-screen border-0 bg-inherit">
      <CardHeader>
        <CardTitle className="outlined-text truncate text-2xl tracking-wide">
          Notifications
        </CardTitle>
        <CardDescription>
          You have {unreadCount} unread message{unreadCount >= 1 && "s"}.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Push Notifications</p>
            <p className="text-sm text-muted-foreground">Send notifications to your Email.</p>
          </div>
          <Switch id="pushNotification" />
        </div>

        <div className="w-full border border-primary" />

        <Accordion type="single" collapsible className="w-full p-3">
          {notifications.map((notification, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-md mb-3 p-4"
            >
              <AccordionTrigger
                onClick={() => handleNotificationClick(index)}
                className="space-x-2"
              >
                <div className="flex items-start space-x-2">
                  <span
                    className={`h-2 w-2 translate-y-2 rounded-full ${readStates[index] ? "bg-primary" : "bg-gray-500"}`}
                  />
                  <div className="text-start">
                    <p className="text-md font-medium leading-none">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.sentTime}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">{notification.description}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          <Check className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
}
