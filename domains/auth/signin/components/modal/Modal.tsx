"use client";

import { useRouter } from "next/navigation";
import Form from "../Form";
import ModalBackDrop from "@/shared/common/components/ModalBackdrop";
import { escKeyClose } from "@/shared/common/utils/optimizationKeyboard";

export default function Modal() {
  const router = useRouter();

  return (
    <article
      className="fixed z-50 inset-0 backdrop-blur-sm"
      onKeyDown={(e) => escKeyClose({ event: e, closeCb: router.back })}
    >
      <ModalBackDrop />
      <h2 className="sr-only">로그인</h2>
      <Form isModal={true} />
    </article>
  );
}
