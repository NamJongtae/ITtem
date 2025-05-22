"use client";

import { useRouter } from "next/navigation";
import SigninForm from "../signin-form";
import ModalBackDrop from "@/components/modal-backdrop";
import { escKeyClose } from "@/utils/optimizationKeyboard";

export default function SigninModal() {
  const router = useRouter();

  return (
    <article
      className="fixed z-50 inset-0 backdrop-blur-sm"
      onKeyDown={(e) => escKeyClose({ event: e, closeCb: router.back })}
    >
      <ModalBackDrop />
      <h2 className="sr-only">로그인</h2>
      <SigninForm isModal={true} />
    </article>
  );
}
