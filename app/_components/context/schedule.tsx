"use client";
import { createContext, useContext, useEffect, useState } from "react";

type SchdeuleStepType = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
};

const ScheduleStep = createContext<SchdeuleStepType | null>(null);

export const ScheduleStepProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step, setStep] = useState(0);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };
  return (
    <ScheduleStep.Provider
      value={{ step, setStep, handleNextStep, handlePreviousStep }}
    >
      {children}
    </ScheduleStep.Provider>
  );
};

export const useScheduleStep = () => {
  const context = useContext(ScheduleStep);

  if (!context) {
    throw Error("You have to be in the provider");
  }
  return context;
};

type ScheduleImageType = {
  image: File | null;
  previewUrl: string | null;
  handleFileChange: (file: File) => void;
};

const ScheduleImage = createContext<ScheduleImageType | null>(null);

export const ScheduleImageProvider = ({
  children,
  imageUrl,
}: {
  children: React.ReactNode;
  imageUrl?: string;
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(imageUrl || null);

  useEffect(() => {
    if (imageUrl) {
      setPreviewUrl(imageUrl);
    }
  }, [imageUrl]);

  const handleFileChange = (file: File) => {
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <ScheduleImage.Provider value={{ image, previewUrl, handleFileChange }}>
      {children}
    </ScheduleImage.Provider>
  );
};

export const useScheduleImage = () => {
  const context = useContext(ScheduleImage);
  if (!context) throw Error("You must use ScheduleImage inside its provider");
  return context;
};
