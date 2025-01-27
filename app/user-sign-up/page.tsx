"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  user_name: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone_number: z
    .string()
    .min(12, { message: "Phone number must be at least 12 digits." }),
  discord_handle: z.string().optional(),
  role: z.string().optional(),
  imageUrl: z.any().optional(),
});

export default function UserSignUpForm() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isUserUser, setIsUserUser] = useState(true);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      user_name: "",
      email: "",
      phone_number: "",
      discord_handle: "",
      role: "player",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.firstName || "",
        user_name: user.username || "",
        email: user.emailAddresses[0]?.emailAddress || "",
        phone_number: user.phoneNumbers[0]?.phoneNumber || "",
        imageUrl: user.imageUrl || "",
        discord_handle: "",
        role: "player",
      });
    }
  }, [user, form]);

  useEffect(() => {
    if (user) {
      const userName = user.username;
      const email = user.emailAddresses[0]?.emailAddress;
      if (
        userName !== form.getValues("user_name") ||
        email !== form.getValues("email")
      ) {
        setIsUserUser(false);
      } else {
        setIsUserUser(true);
      }
    }
  }, [user, form.getValues("user_name"), form.getValues("email")]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    try {
      const email = user?.emailAddresses[0]?.emailAddress || "";

      // Check if the user exists
      const existingUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      if (!existingUser[0]) {
        // Insert the new user into the database
        await db.insert(usersTable).values({
          name: data.name,
          user_name: data.user_name,
          email: data.email,
          phone_number: data.phone_number,
          discord_handle: data.discord_handle,
          role: data.role,
          imageUrl: data.imageUrl,
        });

        toast({
          title: "Success!",
          description: "User added to the database.",
        });
      } else {
        toast({
          title: "Error",
          description: "User already exists in the database.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving user:", error);
      toast({
        title: "Submission Failed",
        description: "An error occurred while saving user data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      <p className="uppercase outlined-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
        User Sign Up
      </p>
      <section>
        <div className="m-auto w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 p-5 md:p-11"
            >
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your Full Name"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Username */}
                <FormField
                  control={form.control}
                  name="user_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Username" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          placeholder="Email address"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Number */}
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl aria-required>
                        <Controller
                          name="phone_number"
                          control={form.control}
                          render={({ field }) => (
                            <PhoneInput
                              {...field}
                              placeholder="Phone number"
                              country="ng"
                              inputStyle={{
                                backgroundColor: "inherit",
                                width: "100%",
                                border: "0.1px gray solid",
                              }}
                              onBlur={field.onBlur}
                              onChange={(value) => field.onChange(value)}
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Discord Handle */}
                <FormField
                  control={form.control}
                  name="discord_handle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discord Handle</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Discord handle (e.g., user#1234)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Role */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full border rounded-md px-3 py-2 bg-white"
                        >
                          <option value="player">Player</option>
                          <option value="admin">Admin</option>
                          <option value="team_manager">Team Manager</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Picture Upload */}
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="picture">Picture</Label>
                  <Input id="picture" type="file" className="w-full" />
                </div>
              </div>

              <div>
                {!isUserUser && (
                  <p className="text-center text-red-500 mb-3 text-xs">
                    Email or Username does not match User data.
                  </p>
                )}
  
                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full hover:bg-[#14C570] bg-[#00ff00]"
                  disabled={!isUserUser || isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
}
