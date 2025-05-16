"use client";

import React, { createContext, useContext, useState } from "react";
import { RequirementCard } from "@/components/ui/dashboard/requirement-card";
import MatchSetupIntro1 from "@/components/ui/dashboard/schedule/MatchSetupIntro1";
import MatchSetupIntro2 from "@/components/ui/dashboard/schedule/MatchSetupIntro2";
import GamePicker from "@/components/ui/dashboard/schedule/GamePicker";
import MatchSetupIntro3 from "@/components/ui/dashboard/schedule/MatchSetupIntro3";
import { zodResolver } from "@hookform/resolvers/zod";
import { TournamentFormSchema } from "@/lib/form-schema";
import { TournamentFormValues } from "@/lib/placeholder-data";
import { FormProvider, useForm } from "react-hook-form";
import TournamentConfirmation from "@/components/ui/dashboard/schedule/Confirmation";

type SchdeuleStepType = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
};

const ScheduleStep = createContext<SchdeuleStepType | null>(null);

const ScheduleProvider = ({ children }: { children: React.ReactNode }) => {
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

export function HostMatchForm() {
  const form = useForm<TournamentFormValues>({
    resolver: zodResolver(TournamentFormSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      maxPlayersPerTeam: 0,
      maxTeams: 0,
      gameId: 0,
      organizerId: 0,
      prizePool: "",
      rules: "",
    },
  });

  const { step } = useScheduleStep();

  return (
    <div className="space-y-6">
      {step === 0 && (
        <FormProvider {...form}>
          <GamePicker form={form} />
        </FormProvider>
      )}
      {step === 1 && (
        <FormProvider {...form}>
          <MatchSetupIntro1 form={form} />
        </FormProvider>
      )}

      {step === 2 && (
        <FormProvider {...form}>
          <MatchSetupIntro2 form={form} />
        </FormProvider>
      )}
      {step === 3 && (
        <FormProvider {...form}>
          <MatchSetupIntro3 form={form} />
        </FormProvider>
      )}

      {step === 4 && (
        <FormProvider {...form}>
          <TournamentConfirmation />
        </FormProvider>
      )

      }
    </div>
  );
}

export default function Schedule() {
  const referrals = 11;
  const isVerified = true;
  const hasNoBans = true;
  const profileCompleted = true;

  const requirements = [
    {
      text: "You must have at least 10 referrals",
      met: referrals >= 10,
      fixLink: "/invite-friends",
    },
    {
      text: "Your account must be verified",
      met: isVerified,
      fixLink: "/verify-account",
    },
    {
      text: "No active bans on your account",
      met: hasNoBans,
    },
    {
      text: "Complete your profile",
      met: profileCompleted,
      fixLink: "/complete-profile",
    },
  ];

  const isEligible = requirements.every((req) => req.met);

  return (
    <div>
      {!isEligible ? (
        <div className="mx-auto mt-10 max-w-3xl p-4">
          <RequirementCard
            title="Not Eligible to Host"
            details="You need to meet the following requirements:"
            buttonText="Cannot Host Match"
            requirements={requirements}
          />
        </div>
      ) : (
        <ScheduleProvider>
          <HostMatchForm />
        </ScheduleProvider>
      )}
    </div>
  );
}
