"use client";

import { RequirementCard } from "@/components/ui/dashboard/requirement-card";
import {
  ScheduleImageProvider,
  ScheduleStepProvider,
  useScheduleStep,
} from "@/app/_components/context/schedule";

export default function Schedule() {
  const referrals = 11;
  const isVerified = true;
  const hasNoBans = true;
  const profileCompleted = true;

  const requirements = [
    {
      text: "You must have at least 10 referrals",
      met: referrals >= 10,
      fixLink: "/refers",
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
        <ScheduleStepProvider>
          <ScheduleImageProvider>
            <HostMatchForm />
          </ScheduleImageProvider>
        </ScheduleStepProvider>
      )}
    </div>
  );
}
