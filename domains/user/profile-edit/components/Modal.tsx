"use client";

import { escKeyClose } from "@/shared/common/utils/escKeyClose";
import ModalBackdrop from "@/shared/common/components/ModalBackdrop";
import EditForm from "./Form";
import { useRouter } from "next/navigation";

export default function Modal() {
  const router = useRouter();

  return (
    <article
      className="fixed z-50 inset-0 backdrop-blur-sm"
      onKeyDown={(e) => escKeyClose({ event: e, closeCb: router.back })}
    >
      <ModalBackdrop />
      <EditForm isModal={true} />
    </article>
  );
}
