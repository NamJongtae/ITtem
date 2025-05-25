import React, { forwardRef } from "react";

const InfiniteScrollTarget = forwardRef<
  HTMLDivElement | null,
  { hasNextPage: boolean }
>(({ hasNextPage }, ref) => {
  return hasNextPage ? (
    <li>
      <div ref={ref} className="h-10" />
    </li>
  ) : null;
});

InfiniteScrollTarget.displayName = "InfiniteScrollTarget";

export default InfiniteScrollTarget;
