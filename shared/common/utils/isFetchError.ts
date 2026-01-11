import { FetchError } from "@/shared/common/types/errorTypes";

export function isFetchError(error: unknown): error is FetchError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "message" in error &&
    typeof (error as any).status === "number" &&
    typeof (error as any).message === "string"
  );
}
