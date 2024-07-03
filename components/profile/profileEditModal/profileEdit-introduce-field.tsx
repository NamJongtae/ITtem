import useIntroduceField from "@/hooks/changeProfileModal/useIntroduceField";
import { MutableRefObject } from "react";

interface IProps {
  introduceRef: MutableRefObject<HTMLTextAreaElement | null>;
}

export default function IntroductField({ introduceRef }: IProps) {
  const { ref, rest } = useIntroduceField();

  return (
    <div>
      <label className="sr-only" htmlFor="introduce">
        소개글
      </label>
      <textarea
        className="root_input resize-none mt-3"
        rows={6}
        id="introduce"
        placeholder="판매상품이나 자기를 소개해 주세요."
        maxLength={2000}
        {...rest}
        ref={(e) => {
          ref(e);
          if (introduceRef) introduceRef.current = e;
        }}
      />
    </div>
  );
}
