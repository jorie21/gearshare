import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50/30">
      {/* Header Section Skeleton */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl space-y-4">
            <Skeleton className="h-12 w-3/4 md:h-16" />
            <Skeleton className="h-12 w-1/2 md:h-16" />
            <div className="pt-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <main className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Search Bar Skeleton */}
          <div className="h-20 bg-white rounded-3xl border shadow-sm p-4 flex gap-4">
            <Skeleton className="flex-1 h-full rounded-2xl" />
            <Skeleton className="w-32 h-full rounded-2xl" />
            <Skeleton className="w-32 h-full rounded-2xl" />
          </div>

          {/* Filter Pills Skeleton */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-9 w-24 rounded-full" />
            ))}
          </div>

          {/* Grid Skeleton */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i} className="overflow-hidden border-none shadow-md">
                <Skeleton className="aspect-[4/3] w-full" />
                <CardContent className="p-5 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
                <CardFooter className="p-5 pt-0 flex justify-between items-center">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-9 w-24 rounded-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
