"use client";

import { RequirementCard } from "@/components/ui/dashboard/requirement-card";
import {
  ScheduleImageProvider,
  ScheduleStepProvider,
} from "@/app/_components/context/schedule";
import { HostMatchForm } from "@/app/_components/form/host-match-form";
import {
  useDbUser,
  UserProfile,
} from "@/app/_components/context/DbUserProvider";
import { useEffect, useState } from "react";
import { Get } from "@/lib/action/_get";
import { useSearchParams } from "next/navigation";
import { DbTournamentDataType } from "@/lib/placeholder-data";

export default function Schedule() {
  const { user } = useDbUser();
  const [referrals, setReferrals] = useState<UserProfile[]>([]);
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");
  const [tournament, setTournament] = useState<DbTournamentDataType | null>(
    null,
  );

  useEffect(() => {
    const fetchReferrals = async () => {
      const referralsByUserId = await Get.UsersByReferredBy(user.id);
      setReferrals(referralsByUserId);
    };

    fetchReferrals();

    if (uid) {
      const fetchTournamentDetails = async () => {
        try {
        } catch (error) {}
        const data = await Get.TournamentByUid(uid);
        setTournament(data);
      };
      fetchTournamentDetails();
    }
  }, []);

  const isVerified = user.isVerified;
  const hasNoBans = true;
  const profileCompleted = !!user.phoneNumber;

  const requirements = [
    {
      text: "You must have at least 10 referrals",
      met: referrals.length >= 0,
      fixLink: "/dashboard/refers",
    },
    {
      text: "Your account must be verified",
      met: isVerified ?? false,
      fixLink: "/user-sign-up",
    },
    {
      text: "No active bans on your account",
      met: hasNoBans,
    },
    {
      text: "Complete your profile",
      met: profileCompleted,
      fixLink: "/profile",
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
          <ScheduleImageProvider imageUrl={tournament?.imageUrl}>
            <HostMatchForm tournament={tournament} />
          </ScheduleImageProvider>
        </ScheduleStepProvider>
      )}
    </div>
  );
}
