import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TournamentFormSchema } from "@/lib/form-schema";
import { TournamentFormValues } from "@/lib/placeholder-data";
import { useScheduleStep } from "@/app/_components/context/schedule";

import GamePicker from "@/components/ui/dashboard/schedule/GamePicker";
import MatchSetupIntro1 from "@/components/ui/dashboard/schedule/MatchSetupIntro1";
import MatchSetupIntro2 from "@/components/ui/dashboard/schedule/MatchSetupIntro2";
import MatchSetupIntro3 from "@/components/ui/dashboard/schedule/MatchSetupIntro3";
import TournamentConfirmation from "@/components/ui/dashboard/schedule/Confirmation";
import PaymentMethodForm from "@/components/ui/dashboard/PaymentMethodform";

export const HostMatchForm = () => {
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

  // Map step numbers to components
  const stepComponents = [
    <GamePicker form={form} />,
    <MatchSetupIntro1 form={form} />,
    <MatchSetupIntro2 form={form} />,
    <MatchSetupIntro3 form={form} />,
    <TournamentConfirmation />,
  ];

  return (
    <div className="space-y-6">
      {step === 5 ? (
        <PaymentMethodForm />
      ) : (
        <FormProvider {...form}>{stepComponents[step]}</FormProvider>
      )}
    </div>
  );
};
