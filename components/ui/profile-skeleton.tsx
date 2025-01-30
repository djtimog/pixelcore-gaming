// components/ui/user/skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function UserSkeleton() {
  return (
    <div className="space-y-6">
      {/* Profile Picture Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
        </div>
      </div>

      {/* Form Fields Skeleton */}
      <div className="space-y-6">
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

        {/* Role */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Discord Handle */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Subscription Checkbox */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 rounded-md" />
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
}