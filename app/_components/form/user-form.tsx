"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
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
import { useUser } from "@clerk/nextjs";
import { BookmarkCheck } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { UserFormValues } from "@/lib/placeholder-data";
import { UserFormSchema } from "@/lib/form-schema";
import { handleImageUpload } from "@/lib/action/image-upload";
import { onSubmitForm } from "@/lib/action/_onSubmit-form";

export default function UserSignUpForm() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isUserUser, setIsUserUser] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const router = useRouter();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      discordHandle: "",
      role: "player",
      imageUrl: "",
      isSubscribed: false,
    },
  });

  useEffect(() => {
    if (!user) return;

    const { firstName, username, emailAddresses, imageUrl } = user;

    form.reset({
      name: firstName || "",
      username: username || "",
      email: emailAddresses[0]?.emailAddress || "",
      imageUrl,
      discordHandle: "",
      role: "player",
      isSubscribed: false,
    });

    setPreviewImage(imageUrl);
  }, [user, form]);

  useEffect(() => {
    if (!user) return;

    const { username: currentUsername, emailAddresses } = user;
    const currentEmail = emailAddresses[0]?.emailAddress;
    const { username: formUsername, email: formEmail } = form.getValues();

    setIsUserUser(
      currentUsername === formUsername && currentEmail === formEmail,
    );
  }, [user, form]);

  return (
    <section className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            onSubmitForm.User(
              data,
              user,
              setIsLoading,
              selectedImageFile,
              router,
            ),
          )}
          className="space-y-6 rounded-lg p-6 shadow-md"
        >
          {/* Profile Picture */}
          <FormField
            control={form.control}
            name="imageUrl"
            render={() => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <div className="items-center justify-center gap-4 space-y-4 sm:flex sm:space-y-0">
                  {previewImage && (
                    <Image
                      src={previewImage}
                      alt="Profile preview"
                      className="h-20 w-20 overflow-hidden rounded-full object-cover"
                      width={1000}
                      height={1000}
                    />
                  )}
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleImageUpload(
                          event,
                          setSelectedImageFile,
                          setPreviewImage,
                        )
                      }
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your Full Name" required />
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
                      placeholder="Email Address"
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
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
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Discord Handle */}
            <FormField
              control={form.control}
              name="discordHandle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discord Handle</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="username#1234" />
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
                  <FormLabel>Account Type</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pick a Role" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="player">Player</SelectItem>
                        <SelectItem value="team_manager">
                          Team Manager
                        </SelectItem>
                        {/* <SelectItem value="admin">Administrator</SelectItem> */}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
                  />
                </FormControl>
                <FormLabel>Subscribe to newsletter and updates</FormLabel>
              </FormItem>
            )}
          />

          <div className="text-center">
            {!isUserUser && (
              <p className="mb-4 text-sm text-red-500">
                Email or Username does not match authentication provider data
              </p>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={!isUserUser || isLoading}
            >
              {isLoading ? "Creating Profile..." : "Complete Registration"}
              <BookmarkCheck size={20} />
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
