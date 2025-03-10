"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Get } from "@/lib/action/_get";
import { Post } from "@/lib/action/_post";
import { UserFormValues } from "@/lib/placeholder-data";
import { UserFormSchema } from "@/lib/form-schema";

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

  // Handle image upload preview
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.firstName || "",
        username: user.username || "",
        email: user.emailAddresses[0]?.emailAddress || "",
        imageUrl: user.imageUrl,
        discordHandle: "",
        role: "player",
        isSubscribed: false,
      });
      setPreviewImage(user.imageUrl);
    }
  }, [user, form]);

  useEffect(() => {
    if (user) {
      const currentUsername = user.username;
      const currentEmail = user.emailAddresses[0]?.emailAddress;
      const formUsername = form.getValues("username");
      const formEmail = form.getValues("email");

      if (currentUsername !== formUsername || currentEmail !== formEmail) {
        setIsUserUser(false);
      } else {
        setIsUserUser(true);
      }
    }
  }, [user, form]);

  async function onSubmit(data: UserFormValues) {
    setIsLoading(true);

    try {
      // Handle profile image upload first

      const getUpdatedImage = async () => {
        let newImageUrl = user?.imageUrl;
        if (selectedImageFile && user) {
          await user.setProfileImage({ file: selectedImageFile });
          await new Promise((resolve) => setTimeout(resolve, 3000));
          newImageUrl = user?.imageUrl;
        }
        return newImageUrl;
      };

      const updatedImageUrl = await getUpdatedImage();

      // Prepare user data with Clerk's image URL
      const userData = {
        name: data.name.slice(0, 255),
        username: data.username.slice(0, 255),
        email: data.email.slice(0, 255),
        phoneNumber: data.phoneNumber?.slice(0, 15) || null,
        discordHandle: data.discordHandle?.slice(0, 50) || null,
        role: data.role,
        imageUrl: updatedImageUrl || "", // Use Clerk's CDN URL
        isSubscribed: data.isSubscribed,
        isVerified: false,
        createdAt: new Date(),
      };

      // Check for existing user
      const existingUser = await Get.UserByEmail(userData.email);

      if (!existingUser[0]) {
        await Post.UserData(userData);
        toast({
          title: "Success!",
          description: "Profile created successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "User already exists",
          variant: "destructive",
        });
      }
      router.push("/");
    } catch (error) {
      console.error("Error saving user:", error);
      toast({
        title: "Submission Failed",
        description: "An error occurred while saving user data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 p-6 rounded-lg shadow-md"
        >
          {/* Profile Picture */}
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
                      alt="Profile preview"
                      className="w-20 h-20 rounded-full object-cover overflow-hidden"
                      width={1000}
                      height={1000}
                    />
                  )}
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <SelectItem value="admin">Administrator</SelectItem>
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
              <p className="text-red-500 text-sm mb-4">
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
