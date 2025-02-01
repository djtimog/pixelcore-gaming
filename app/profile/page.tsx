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
import { Checkbox } from "@/components/ui/checkbox";
import { useUser, useClerk } from "@clerk/nextjs";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import UserSkeleton from "@/components/ui/profile-skeleton";
import { Ban, LogOut, Pencil, Save } from "lucide-react";
import Image from "next/image";

// Reuse the same form schema from sign-up
const FormSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters." })
    .max(255, { message: "Name cannot exceed 255 characters" }),
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters." })
    .max(255, { message: "Username cannot exceed 255 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .max(255, { message: "Email cannot exceed 255 characters" }),
  phoneNumber: z
    .string()
    .max(15, { message: "Phone number cannot exceed 15 characters" }),
  discordHandle: z
    .string()
    .max(50, { message: "Discord handle cannot exceed 50 characters" })
    .optional(),
  role: z.enum(["player", "admin", "team_manager"]).default("player"),
  imageUrl: z
    .string()
    .max(255, { message: "Image URL cannot exceed 255 characters" })
    .optional(),
  isSubscribed: z.boolean().default(false),
});

export default function UserProfilePage() {
  const { user: clerkUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [dbUser, setDbUser] = useState<any>(null);
  const router = useRouter();
  const { signOut } = useClerk();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Fetch user data from database
  useEffect(() => {
    const fetchUserData = async () => {
      if (clerkUser) {
        try {
          const email = clerkUser.emailAddresses[0]?.emailAddress;
          const result = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email!));

          if (result[0]) {
            setDbUser(result[0]);
            form.reset({
              ...result[0],
              phoneNumber: result[0].phoneNumber || "",
              discordHandle: result[0].discordHandle || "",
              role:
                `${
                  result[0].role === "player"
                    ? "player"
                    : result[0].role === "admin"
                    ? "admin"
                    : "team_manager"
                }` || "player",
              imageUrl: clerkUser.imageUrl || result[0].imageUrl || undefined,
              isSubscribed: result[0].isSubscribed ?? false,
            });
            setPreviewImage(result[0].imageUrl);
          } else {
            router.push("user/signUp");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast({
            title: "Error",
            description: "An error occurred while fetching user data",
            variant: "destructive",
          });
          router.push("/");
        }
      } else {
        router.push("/sign-in");
      }
    };

    fetchUserData();
  }, [clerkUser, form, router]);

  // Handle image upload preview
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    try {
      // Update Clerk user data first if needed
      if (clerkUser) {
        const clerkUpdates: {
          username?: string;
          firstName?: string;
        } = {};

        // Check if username changed
        if (data.username !== dbUser.username) {
          clerkUpdates.username = data.username;
        }

        // Check if name changed (assuming name is stored as firstName in Clerk)
        if (data.name !== dbUser.name) {
          clerkUpdates.firstName = data.name;
        }

        // Apply Clerk updates if any
        if (Object.keys(clerkUpdates).length > 0) {
          await clerkUser.update(clerkUpdates);
          // Wait for Clerk updates to propagate
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }

      // Update profile image if new file selected
      if (selectedImageFile && clerkUser) {
        await clerkUser.setProfileImage({ file: selectedImageFile });
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // Prepare updated data including username
      const updatedData = {
        name: data.name.slice(0, 255),
        username: data.username.slice(0, 255),
        phoneNumber: data.phoneNumber?.slice(0, 15) || null,
        discordHandle: data.discordHandle?.slice(0, 50) || null,
        role: data.role,
        imageUrl: clerkUser?.imageUrl || dbUser.imageUrl,
        isSubscribed: data.isSubscribed,
      };

      // Update database
      await db
        .update(usersTable)
        .set(updatedData)
        .where(
          eq(usersTable.email, clerkUser!.emailAddresses[0]?.emailAddress!)
        );

      toast({
        title: "Success!",
        description: "Profile updated successfully",
      });

      setIsEditing(false);
      setDbUser({ ...dbUser, ...updatedData });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update Failed",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      form.reset(dbUser);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 space-y-10">
      <p className="uppercase outlined-text text-lg sm:text-xl md:text-2xl lg:text-3xl text-center">
        User Profile
      </p>
      <section>
        {dbUser ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Profile Image */}
              <FormField
                control={form.control}
                name="imageUrl"
                render={() => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <div className="sm:flex space-y-4 sm:space-y-0 items-center gap-4">
                      {previewImage && (
                        <Image
                          src={previewImage}
                          alt="Profile"
                          className="w-20 h-20 rounded-full object-cover"
                          width={1000}
                          height={1000}
                        />
                      )}
                      {isEditing && (
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </FormControl>
                      )}
                    </div>
                  </FormItem>
                )}
              />

              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!isEditing}
                        placeholder="Your Full Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email (read-only) */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled // Email should not be editable
                        placeholder="Email Address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Username"
                        disabled={!isEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <PhoneInput
                          {...field}
                          defaultCountry="ng"
                          inputStyle={{
                            color: "inherit",
                            backgroundColor: "inherit",
                            width: "100%",
                            border: "0.1px gray solid",
                          }}
                          countrySelectorStyleProps={{
                            buttonStyle: {
                              color: "inherit",
                              backgroundColor: "inherit",
                              padding: "7px",
                            },
                          }}
                          placeholder="Phone Number"
                          onBlur={field.onBlur}
                          className="border-[0.1px]"
                          value={field.value}
                          onChange={(phone) =>
                            field.onChange(phone.replace(/[^0-9]/g, ""))
                          }
                        />
                      ) : (
                        <Input {...field} disabled />
                      )}
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
                      {isEditing ? (
                        <select
                          {...field}
                          className="w-full border rounded-md px-3 py-2"
                        >
                          <option value="player">Player</option>
                          <option value="team_manager">Team Manager</option>
                          <option value="admin">Administrator</option>
                        </select>
                      ) : (
                        <Input {...field} disabled />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discordHandle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discord Handle</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="username#1234"
                        disabled={!isEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Subscription */}
              <FormField
                control={form.control}
                name="isSubscribed"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3">
                    <FormControl className="mt-[8px]">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!isEditing}
                      />
                    </FormControl>
                    <FormLabel>Subscribe to newsletter</FormLabel>
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                {!isEditing ? (
                  <>
                    <Button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                    >
                      Edit Profile
                      <Pencil size={20} />
                    </Button>
                    <Button
                      type="button"
                      onClick={() => signOut({ redirectUrl: "/" })}
                      className="w-full hover:bg-[#14C570] bg-[#00ff00]"
                    >
                      <LogOut size={20} />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-red-500 hover:bg-red-400"
                      onClick={() => {
                        form.reset(dbUser);
                        setIsEditing(false);
                      }}
                    >
                      <Ban size={20} />
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading || !isEditing}
                      className="w-full hover:bg-[#14C570] bg-[#00ff00]"
                    >
                      <Save size={20} />
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </>
                )}
              </div>
            </form>
          </Form>
        ) : (
          <UserSkeleton />
        )}
      </section>
    </main>
  );
}
