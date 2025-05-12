import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Skeleton className="h-9 w-24" />
      </div>

      <div className="w-full rounded-lg border p-6">
        <div className="mb-6 space-y-2">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>

        <div className="mb-4">
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="h-[60vh] rounded-md border p-4">
          <div className="space-y-6">
            <div>
              <Skeleton className="mb-4 h-6 w-1/3" />
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <Skeleton className="mb-2 h-5 w-1/2" />
                <Skeleton className="mb-1 h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>

              <div className="rounded-lg border p-4">
                <Skeleton className="mb-2 h-5 w-1/2" />
                <Skeleton className="mb-1 h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>

            <div>
              <Skeleton className="mb-4 h-6 w-1/3" />
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Skeleton className="mb-4 h-6 w-1/4" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-4">
            <Skeleton className="mb-4 h-5 w-3/4" />
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="h-9 w-28" />
          </div>
          <div className="rounded-lg border p-4">
            <Skeleton className="mb-4 h-5 w-3/4" />
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="h-9 w-28" />
          </div>
          <div className="rounded-lg border p-4">
            <Skeleton className="mb-4 h-5 w-3/4" />
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      </div>
    </div>
  )
}
