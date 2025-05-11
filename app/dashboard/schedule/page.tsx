"use client";

import { useState } from "react";
import { RequirementCard } from "@/components/ui/dashboard/requirement-card";
import MatchSetupIntro1 from "@/components/ui/dashboard/schedule/MatchSetupIntro1";
import MatchSetupIntro2 from "@/components/ui/dashboard/schedule/MatchSetupIntro2";
import GamePicker from "@/components/ui/dashboard/schedule/GamePicker";
import MatchSetupIntro3 from "@/components/ui/dashboard/schedule/MatchSetupIntro3";

export function HostMatchForm() {
  const [step, setStep] = useState(0);

  const handleNextStep = () => {
    setStep(step + 1);
  }

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="space-y-6">
      {step === 0 && (
        <GamePicker nextStep={handleNextStep} />
      )}
      {step === 1 && (
        <MatchSetupIntro1 nextStep={handleNextStep} previousStep={handlePreviousStep} />
      )}

      {step === 2 && (
        <MatchSetupIntro2 nextStep={handleNextStep} previousStep={handlePreviousStep} />
      )}
      {step === 3 && (
        <MatchSetupIntro3 nextStep={handleNextStep} previousStep={handlePreviousStep} />
      )}
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
        <HostMatchForm />
      )}
    </div>
  );
}
