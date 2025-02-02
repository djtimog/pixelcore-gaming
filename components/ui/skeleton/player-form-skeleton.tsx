import { Skeleton } from "@/components/ui/skeleton";

export default function PlayerFormSkeleton() {
  return (
    <div className="max-w-5xl m-auto w-full space-y-6 p-5 md:p-11">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Game */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Game Handle */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Rank */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Level */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* UID */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Team Secret Code */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Submit Button */}
      <Skeleton className="h-12 w-full" />
    </div>
  );
}
