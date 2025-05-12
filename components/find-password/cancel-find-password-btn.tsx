import useRouterBackToCloseModal from "@/hooks/commons/useRouterBackToCloseModal";
import React from "react";

export default function CancelFindPasswordBtn() {
  const { closeModalHandler } = useRouterBackToCloseModal();

  return (
    <button
      type="button"
      onClick={closeModalHandler}
      className="button_secondary w-full"
    >
      취소
    </button>
  );
}
