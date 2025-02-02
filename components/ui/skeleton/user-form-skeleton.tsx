import { Skeleton } from "@/components/ui/skeleton";

export default function UserFormSkeleton() {
  return (
    <div className="space-y-6 p-6 rounded-lg shadow-md">
      {/* Profile Picture Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Username */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Discord Handle */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Role */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Subscription Checkbox */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-5 w-5 rounded-md" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}
