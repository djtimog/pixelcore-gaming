import { toast } from "@/hooks/use-toast";
import { Get } from "@/lib/action/_get";
import { Post } from "@/lib/action/_post";
import { uploadedImageUrl } from "@/lib/image-upload";
import { UserFormValues } from "@/lib/placeholder-data";
import { useUser } from "@clerk/nextjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";


export const onSubmitForm = {
    User: async (
        data: UserFormValues,
        user: ReturnType<typeof useUser>["user"],
        setIsLoading: Dispatch<SetStateAction<boolean>>,
        selectedImageFile: File | null,
        router: AppRouterInstance
      ) => {
        setIsLoading(true);
        const updatedImageUrl = await uploadedImageUrl(user, selectedImageFile);
      
        try {
          const userData = {
            name: data.name.slice(0, 255),
            username: data.username.slice(0, 255),
            email: data.email.slice(0, 255),
            phoneNumber: data.phoneNumber?.slice(0, 15) || null,
            discordHandle: data.discordHandle?.slice(0, 50) || null,
            role: data.role,
            imageUrl: updatedImageUrl!,
            isSubscribed: data.isSubscribed,
            isVerified: false,
            createdAt: new Date(),
          };
      
          const existingUser = await Get.UserByEmail(userData.email);
      
          if (!existingUser) {
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
      },
}