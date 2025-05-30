import { Skeleton } from "@/components/ui/skeleton";

export const TournamentCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-48 w-full rounded-lg" />

      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-12" />
      </div>

      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-8" />
      </div>

      <Skeleton className="h-4 w-1/2" />

      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-12" />
      </div>

      <div className="flex gap-2">
        <Skeleton className="h-9 w-full rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>
    </div>
  );
};
