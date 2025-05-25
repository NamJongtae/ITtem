import { useCustomRouter } from "@/shared/common/hooks/useCustomRouter";

export default function CancelBtn() {
  const { navigate } = useCustomRouter();
  return (
    <button
      type="button"
      onClick={() => navigate({ type: "push", url: "/" })}
      className="text-md text-gray-500 font-semibold bg-white border border-gray-400 py-2 w-24"
    >
      취소하기
    </button>
  );
}
