"use client";

import { escKeyClose } from "@/utils/optimizationKeyboard";
import ModalBackDrop from "@/components/modal-backdrop";
import ProfileEditForm from "./profile-edit-form";
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
