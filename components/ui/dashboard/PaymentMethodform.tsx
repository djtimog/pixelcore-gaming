"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PaymentMethodForm = () => {
  const [method, setMethod] = useState("card");

  return (
    <Card className="w-full max-w-md border border-neutral-700 bg-black text-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">Payment Method</CardTitle>
        <p className="text-sm text-muted-foreground">
          Add a new payment method to your account.
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <Tabs defaultValue="card" onValueChange={setMethod}>
          <TabsList className="grid grid-cols-3 rounded-lg bg-zinc-900 text-white">
            <TabsTrigger
              value="card"
              className={cn(
                "rounded-lg",
                method === "card" && "bg-white text-black",
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="mb-3 h-6 w-6"
              >
                <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                <path d="M2 10h20"></path>
              </svg>{" "}
              Card
            </TabsTrigger>
            <TabsTrigger
              value="paypal"
              className={cn(
                "rounded-lg",
                method === "paypal" && "bg-white text-black",
              )}
            >
              <svg role="img" viewBox="0 0 24 24" className="mb-3 h-6 w-6">
                <path
                  d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"
                  fill="currentColor"
                ></path>
              </svg>{" "}
              Paypal
            </TabsTrigger>
            <TabsTrigger
              value="apple"
              className={cn(
                "rounded-lg",
                method === "apple" && "bg-white text-black",
              )}
            >
              <svg role="img" viewBox="0 0 24 24" className="mb-3 h-6 w-6">
                <path
                  d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                  fill="currentColor"
                ></path>
              </svg>{" "}
              Apple
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="First Last"
            className="bg-zinc-900 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" className="bg-zinc-900 text-white" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="card">Card number</Label>
          <Input id="card" className="bg-zinc-900 text-white" />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-2">
            <Label htmlFor="month">Expires</Label>
            <Select>
              <SelectTrigger className="bg-zinc-900 text-white">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={i} value={`${i + 1}`.padStart(2, "0")}>
                    {`${i + 1}`.padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Select>
              <SelectTrigger className="bg-zinc-900 text-white">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() + i;
                  return (
                    <SelectItem key={year} value={`${year}`}>
                      {year}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" className="bg-zinc-900 text-white" />
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full bg-white text-black hover:bg-neutral-200">
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentMethodForm;
