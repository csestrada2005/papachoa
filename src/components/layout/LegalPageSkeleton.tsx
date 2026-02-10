import { Skeleton } from "@/components/ui/skeleton";

const LegalPageSkeleton = () => (
  <div className="min-h-screen bg-background">
    {/* Header placeholder */}
    <div className="h-16" />

    <main className="pt-24 pb-20">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Title area */}
          <div className="text-center mb-12">
            <Skeleton className="h-9 w-64 mx-auto mb-4 rounded-xl" />
            <Skeleton className="h-5 w-80 mx-auto rounded-lg" />
          </div>

          {/* Card with accordion placeholders */}
          <div className="bg-card rounded-3xl p-6 md:p-10 shadow-sm border border-border/30 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="bg-background/50 rounded-2xl border border-border/30 px-5 md:px-6 py-5 md:py-6"
              >
                <Skeleton className="h-6 w-3/5 rounded-lg" />
              </div>
            ))}

            {/* Footer line */}
            <div className="mt-8 pt-6 border-t border-border/50">
              <Skeleton className="h-4 w-48 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default LegalPageSkeleton;
