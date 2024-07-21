"use client";

import { escKeyClose } from "@/lib/optimizationKeyboard";
import ModalBackDrop from "../commons/modal-backdrop";
import ProfileEditForm from "./profie-edit-form";
import { useRouter } from "next/navigation";

export default function ProfileEditModal() {
  const router = useRouter();

  return (
    <article
      className="fixed z-50 inset-0 backdrop-blur-sm"
      onKeyDown={(e) => escKeyClose({ event: e, closeCb: router.back })}
    >
      <ModalBackDrop />
      <ProfileEditForm isModal={true} />
    </article>
  );
}
