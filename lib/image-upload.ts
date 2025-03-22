import { toast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const handleImageUpload = (
  event: ChangeEvent<HTMLInputElement>,
  setSelectedImageFile: Dispatch<SetStateAction<File | null>>,
  setPreviewImage: Dispatch<SetStateAction<string | null>>
) => {
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

export const uploadedImageUrl = async (user: ReturnType<typeof useUser>["user"], selectedImageFile: File | null) => {
  let newImageUrl = user?.imageUrl;

  if (!selectedImageFile) {
    return newImageUrl;
  }
  try {
    await user!.setProfileImage({ file: selectedImageFile });
    newImageUrl = user?.imageUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    toast({
      title: "Error",
      description: "Error uploading image:",
      variant: "destructive",
    });
  }
  return newImageUrl;
};
