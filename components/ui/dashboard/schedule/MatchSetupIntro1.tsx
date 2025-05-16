"use client";
import React, { useState } from "react";
import { Label } from "../../label";
import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";
import { Button } from "../../button";
import { ChevronLeft, ChevronRight, CloudUpload, Pencil } from "lucide-react";
import { Input } from "../../input";
import { Textarea } from "../../textarea";
import { Card, CardHeader, CardTitle } from "../../card";
import { TournamentFormValues } from "@/lib/placeholder-data";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../form";
import { useScheduleStep } from "@/app/dashboard/schedule/page";

const MatchSetupIntro1 = ({
  form
}: {
  form: UseFormReturn<TournamentFormValues>;
}) => {
  const { handleNextStep , handlePreviousStep } = useScheduleStep()
  const fileTypes = ["JPG", "PNG", "GIF"];

  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (file: File) => {
    setImage(file);
  };

  return (
    <div className="mx-auto mt-10 max-w-4xl p-4">
      <Card className="border-primary">
        <CardHeader>
          <CardTitle className="outlined-text text-center text-3xl tracking-wide">
            Match setup
          </CardTitle>
        </CardHeader>
        <div className="space-y-6 p-5">
          <div className="space-y-2">
            <Label htmlFor="image">Upload Game Image</Label>
            <div
              className={`flex items-center justify-center rounded-md text-center text-gray-500 ${image ? "border border-primary" : "border-2 border-dashed"}`}
            >
              <FileUploader
                name="file"
                types={fileTypes}
                handleChange={handleFileChange}
                classes="w-full h-full flex items-center justify-center p-5"
              >
                {image ? (
                  <div className="relative w-full overflow-hidden">
                    <Image
                      src={URL.createObjectURL(image)}
                      alt="Uploaded Preview"
                      className="h-48 w-full rounded-md object-cover"
                      width={200}
                      height={200}
                    />
                    <Button
                      size={"icon"}
                      variant="outline"
                      className="absolute right-2 top-2 rounded-full p-1 shadow-md"
                    >
                      <Pencil className="size-5 font-extrabold text-primary" />
                    </Button>
                  </div>
                ) : (
                  <div className="cursor-pointer">
                    <CloudUpload className="mx-auto h-10 w-10 text-primary" />
                    <p>Drag & drop your game image here</p>
                    <p className="text-sm">or</p>
                    <Button variant="outline" className="mt-2">
                      Upload Image
                    </Button>
                  </div>
                )}
              </FileUploader>
            </div>
          </div>

          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tournament Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Tournament name" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          <div className="space-y-2">
            
          </div>

            <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
              <FormLabel>Game Description</FormLabel>
              <FormControl>
                <Textarea
                {...field}
                placeholder="Describe the match or game here..."
                rows={4}
                />
              </FormControl>
              <FormMessage />
              </FormItem>
            )}
            />
          </div>
          </Card>

          <div className="mt-6 flex items-center justify-between">
          <Button
            className="flex items-center gap-2 rounded-md"
            onClick={handlePreviousStep}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
          <Button
            className="flex items-center gap-2 rounded-md"
            onClick={handleNextStep}
            disabled={!form.watch("name") || !form.watch("description") || !image}
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
      </div>
    </div>
  );
};

export default MatchSetupIntro1;
