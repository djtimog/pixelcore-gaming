import { Skeleton } from "@/components/ui/skeleton";

function BlogSkeleton() {
  return (
    <section>
        <div className="w-full h-80">
            <Skeleton className="h-full w-full" />
        </div>
        <div className="space-y-5 px-7 py-3 sm:px-11 sm:py-5">
            <Skeleton className="h-4 w-24" />
            <div>
                <Skeleton className="mb-5 h-11 w-full sm:w-1/3 md:w-1/2"/>
                <Skeleton className="w-full h-80" />
            </div>
        </div>
    </section>
  )
}

export default BlogSkeleton;