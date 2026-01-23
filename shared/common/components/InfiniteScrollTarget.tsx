import React, { forwardRef } from "react";

const InfiniteScrollTarget = forwardRef<
  HTMLDivElement | null,
  { hasNextPage: boolean }
>(({ hasNextPage }, ref) => {
  return hasNextPage ? <div ref={ref} className="h-10" /> : null;
});

InfiniteScrollTarget.displayName = "InfiniteScrollTarget";

export default InfiniteScrollTarget;
