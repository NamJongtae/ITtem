"use client";

import { useRouter } from "next/navigation";
import ModalBackDrop from "@/shared/common/components/ModalBackdrop";
import Form from "../Form";
import { escKeyClose } from "@/shared/common/utils/escKeyClose";

export default function Modal() {
  const router = useRouter();

  return (
    <article
      className="fixed z-50 inset-0 backdrop-blur-sm"
      onKeyDown={(e) => escKeyClose({ event: e, closeCb: router.back })}
    >
      <ModalBackDrop />
      <Form isModal={true} />
    </article>
  );
}
