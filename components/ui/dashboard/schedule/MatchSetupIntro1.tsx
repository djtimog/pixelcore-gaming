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

const MatchSetupIntro1 = ({
  nextStep,
  previousStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
}) => {
  const fileTypes = ["JPG", "PNG", "GIF"];

  const [formData, setFormData] = useState({
    tournamentName: "",
    image: null as File | null,
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleFileChange = (file: File) => {
    setFormData((prev) => ({ ...prev, image: file }));
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
              className={`flex items-center justify-center rounded-md text-center text-gray-500 ${formData.image ? "border border-primary" : "border-2 border-dashed"}`}
            >
              <FileUploader
                name="file"
                types={fileTypes}
                handleChange={handleFileChange}
                classes="w-full h-full flex items-center justify-center p-5"
              >
                {formData.image ? (
                  <div className="relative w-full overflow-hidden">
                    <Image
                      src={URL.createObjectURL(formData.image)}
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
          <div className="space-y-2">
            <Label htmlFor="tournamentName">Tournament Name</Label>
            <Input
              id="tournamentName"
              value={formData.tournamentName}
              onChange={handleChange}
              placeholder="Enter Tournament name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Game Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the match or game here..."
              rows={4}
            />
          </div>
        </div>
      </Card>

      <div className="mt-6 flex items-center justify-between">
        <Button
          className="flex items-center gap-2 rounded-md"
          onClick={previousStep}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>
        <Button
          className="flex items-center gap-2 rounded-md"
          onClick={nextStep}
          disabled={formData.tournamentName === "" || formData.description === "" || !formData.image}
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MatchSetupIntro1;
