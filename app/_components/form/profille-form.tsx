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
import { useRouter } from "next/navigation";
import { Ban, LogOut, Pencil, Save } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { cn } from "@/lib/utils";
import { Update } from "@/lib/action/_post";
import { DatabaseUser, ProfileFormValues } from "@/lib/placeholder-data";
import { ProfileFormSchema, roleEnum } from "@/lib/form-schema";
import { Get } from "@/lib/action/_get";

export default function UserProfilePage() {
  const router = useRouter();
  const { user: clerkUser } = useUser();
  const { signOut } = useClerk();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [databaseUser, setDatabaseUser] = useState<DatabaseUser | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      role: "player",
      isSubscribed: false,
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!clerkUser) return;

      try {
        const email = clerkUser.primaryEmailAddress?.emailAddress;
        if (!email) throw new Error("No email associated with account");

        const [user] = await Get.UserByEmail(email);

        if (!user) throw new Error("User not found in database");

        setDatabaseUser(user);
        form.reset({
          ...user,
          phoneNumber: user.phoneNumber ?? "",
          discordHandle: user.discordHandle ?? "",
          role:
            user.role === "player"
              ? "player"
              : user.role === "admin"
              ? "admin"
              : "team_manager",
          imageUrl: clerkUser.imageUrl ?? user.imageUrl ?? "",
          isSubscribed: user.isSubscribed ?? false,
        });
        setPreviewImage(clerkUser.imageUrl ?? user.imageUrl);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        toast({
          title: "Error",
          description: "Failed to load user profile",
          variant: "destructive",
        });
        router.push("/");
      }
    };

    fetchUserData();
  }, [clerkUser, form, router]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = async (values: ProfileFormValues) => {
    if (!clerkUser || !databaseUser) return;
    setIsLoading(true);

    try {
      // Update Clerk profile image first if needed
      if (selectedImageFile) {
        await clerkUser.setProfileImage({ file: selectedImageFile });
      }

      // Prepare update data
      const updateData = {
        name: values.name.slice(0, 255),
        username: values.username.slice(0, 255),
        phoneNumber: values.phoneNumber?.slice(0, 15) || null,
        discordHandle: values.discordHandle?.slice(0, 50) || null,
        role: values.role,
        imageUrl: clerkUser.imageUrl ?? databaseUser.imageUrl,
        isSubscribed: values.isSubscribed,
      };

      // Update database
      await Update.UserData(databaseUser.id, updateData);

      // Update local state
      setDatabaseUser((prev) => ({ ...prev!, ...updateData }));
      setPreviewImage(clerkUser.imageUrl);
      setSelectedImageFile(null);

      toast({
        title: "Success!",
        description: "Profile updated successfully",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update failed:", error);
      toast({
        title: "Update Failed",
        description:
          error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      form.reset();
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    form.reset({
      ...databaseUser,
      phoneNumber: databaseUser?.phoneNumber ?? "",
      discordHandle: databaseUser?.discordHandle ?? "",
      role: databaseUser?.role as (typeof roleEnum)[number],
      imageUrl: clerkUser?.imageUrl ?? databaseUser?.imageUrl ?? undefined,
      isSubscribed: databaseUser?.isSubscribed ?? false,
    });
    setPreviewImage(clerkUser?.imageUrl ?? databaseUser?.imageUrl ?? null);
    setSelectedImageFile(null);
    setIsEditing(false);
  };

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-6"
        >
          {/* Profile Image Field */}
          <FormField
            name="imageUrl"
            render={() => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <div className="flex items-center gap-4">
                  {previewImage && (
                    <Image
                      src={previewImage}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="rounded-full object-cover w-24 h-24 border"
                    />
                  )}
                  {isEditing && (
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="cursor-pointer"
                      />
                    </FormControl>
                  )}
                </div>
              </FormItem>
            )}
          />

          {/* Form Fields */}
          {(["name", "email", "username", "discordHandle"] as const).map(
            (field) => (
              <FormField
                key={field}
                control={form.control}
                name={field}
                render={({ field: { value, ...rest } }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {field.replace(/([A-Z])/g, " $1").trim()}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...rest}
                        value={value ?? ""}
                        disabled={!isEditing || field === "email"}
                        placeholder={
                          field === "discordHandle"
                            ? "username#1234"
                            : undefined
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          )}

          {/* Phone Number Field */}
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
                    <Input {...field} disabled value={field.value ?? ""} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role Selection */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Type</FormLabel>
                <FormControl>
                  {isEditing ? (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleEnum.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role.replace(/_/g, " ").toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input {...field} disabled value={field.value} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Newsletter Subscription */}
          <FormField
            control={form.control}
            name="isSubscribed"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={!isEditing}
                    className="mt-0.5"
                  />
                </FormControl>
                <FormLabel>Subscribe to newsletter</FormLabel>
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            {!isEditing ? (
              <>
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="gap-2"
                >
                  <Pencil size={18} />
                  Edit Profile
                </Button>
                <ConfirmationDialog
                  title="Confirm Sign Out"
                  description="Are you sure you want to sign out?"
                  onConfirm={() => signOut({ redirectUrl: "/" })}
                  triggerText="Sign Out"
                  triggerIcon={<LogOut size={18} />}
                  className="w-full bg-[#14C570]"
                />
              </>
            ) : (
              <>
                <ConfirmationDialog
                  title="Cancel Edit"
                  description={"Are you sure you want to cancel Edit"}
                  onConfirm={resetForm}
                  triggerText="Cancel"
                  triggerIcon={<Ban size={18} />}
                  className="bg-red-500 hover:bg-red-600 gap-2"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "gap-2 w-full bg-[#14C570]",
                    isLoading && "opacity-75 cursor-not-allowed"
                  )}
                >
                  <Save size={18} />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </section>
  );
}
