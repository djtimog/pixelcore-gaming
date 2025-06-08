import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TournamentFormSchema } from "@/lib/form-schema";
import {
  DbTournamentDataType,
  TournamentFormValues,
} from "@/lib/placeholder-data";
import { useScheduleStep } from "@/app/_components/context/schedule";

import GamePicker from "@/components/ui/dashboard/schedule/GamePicker";
import MatchSetupIntro1 from "@/components/ui/dashboard/schedule/MatchSetupIntro1";
import MatchSetupIntro2 from "@/components/ui/dashboard/schedule/MatchSetupIntro2";
import MatchSetupIntro3 from "@/components/ui/dashboard/schedule/MatchSetupIntro3";
import TournamentConfirmation from "@/components/ui/dashboard/schedule/Confirmation";
import PaymentMethodForm from "@/components/ui/dashboard/PaymentMethodform";
import { useEffect } from "react";

export const HostMatchForm = ({
  tournament,
}: {
  tournament: DbTournamentDataType | null;
}) => {
  const form = useForm<TournamentFormValues>({
    resolver: zodResolver(TournamentFormSchema),
    defaultValues: {
      name: tournament?.name || "",
      description: tournament?.description || "",
      imageUrl: tournament?.imageUrl || "",
      maxPlayersPerTeam: tournament?.maxPlayersPerTeam || 0,
      maxTeams: tournament?.maxTeams || 0,
      gameId: tournament?.gameId || 0,
      organizerId: tournament?.organizerId || 0,
      prizePool: tournament?.prizePool || "",
      rules: tournament?.rules || "",
    },
  });

  useEffect(() => {
    if (tournament) {
      form.reset({
        name: tournament.name || "",
        description: tournament.description || "",
        imageUrl: tournament.imageUrl || "",
        maxPlayersPerTeam: tournament.maxPlayersPerTeam || 0,
        maxTeams: tournament.maxTeams || 0,
        gameId: tournament.gameId || 0,
        organizerId: tournament.organizerId || 0,
        prizePool: tournament.prizePool || "",
        rules: tournament.rules || "",
        startDate: new Date(tournament.startDate || ""),
        endDate: new Date(tournament.endDate || ""),
        registrationStartDate: new Date(tournament.registrationStartDate || ""),
        registrationEndDate: new Date(tournament.registrationEndDate || ""),
        time: tournament.time || "",
        timezone: tournament.timezone || "",
      });
    }
  }, [tournament, form]);

  const { step } = useScheduleStep();

  // Map step numbers to components
  const stepComponents = [
    <GamePicker form={form} key={1} />,
    <MatchSetupIntro1 form={form} key={2} />,
    <MatchSetupIntro2 form={form} key={3} />,
    <MatchSetupIntro3 form={form} key={4} />,
    <TournamentConfirmation key={5} tournament={tournament} />,
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
