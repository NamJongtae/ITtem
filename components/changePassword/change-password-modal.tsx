"use client";

import { useRouter } from "next/navigation";
import ModalBackDrop from "../commons/modal-backdrop";
import ChangePasswordForm from "./change-password-form";
import { escKeyClose } from "@/lib/optimizationKeyboard";

export default function ChangePasswordModal() {
  const router = useRouter();

  return (
    <article
      className="fixed z-50 inset-0 backdrop-blur-sm"
      onKeyDown={(e) => escKeyClose({ event: e, closeCb: router.back })}
    >
      <ModalBackDrop />
      <ChangePasswordForm isModal={true} />
    </article>
  );
}
