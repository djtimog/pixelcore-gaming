"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
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
import { useUser } from "@clerk/nextjs";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      user_name: "",
      email: "",
      phone_number: "",
      discord_handle: "",
      role: "player",
      imageUrl: user?.imageUrl || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.firstName || "",
        user_name: user.username || "",
        email: user.emailAddresses[0]?.emailAddress || "",
        phone_number: user.phoneNumbers[0]?.phoneNumber || "",
        imageUrl: user.imageUrl,
        discord_handle: "",
        role: "player",
      });
    }
  }, [user, form]);

  const getUserName = form.getValues("user_name");
  const getEmail = form.getValues("email");

  useEffect(() => {
    if (user) {
      const userName = user.username;
      const email = user.emailAddresses[0]?.emailAddress;
      if (userName !== getUserName || email !== getEmail) {
        setIsUserUser(false);
      } else {
        setIsUserUser(true);
      }
    }
  }, [user, getUserName, getEmail]);

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
          description: "User added",
        });
        router.push("/");
      } else {
        toast({
          title: "Error",
          description: "User already exists",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving user:", error);
      toast({
        title: "Submission Failed",
        description: "An error occurred while saving USER.",
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
        <div className="max-w-5xl m-auto w-full">
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
                      <FormControl>
                        <PhoneInput
                          {...field}
                          placeholder="Phone number"
                          defaultCountry="ng"
                          inputStyle={{
                            color: "inherit",
                            backgroundColor: "inherit",
                            width: "100%",
                            border: "0.1px gray solid",
                          }}
                          onBlur={field.onBlur}
                          className="border-[0.1px]"
                          onChange={(value) => field.onChange(value)}
                          required
                          countrySelectorStyleProps={{
                            buttonStyle: {
                              color: "inherit",
                              backgroundColor: "inherit",
                              padding: "7px",
                            },
                          }}
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
                          className="w-full border rounded-md px-3 py-2"
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

                {/* Picture */}
                {/* <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field: _field }) => (
                    <FormItem>
                      <FormLabel>Picture</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          className="w-full"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            form.setValue("imageUrl", file); // Store file in form state
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                {/* <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="picture">Picture</Label>
                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
                    className="w-full"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      form.setValue("imageUrl", file); // Store file in form state
                    }}
                  />
                </div> */}
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
