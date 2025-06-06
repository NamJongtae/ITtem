interface IProps {
  prevStepHandler: () => void;
}

export default function StepBtns({ prevStepHandler }: IProps) {
  return (
    <div className="w-full flex flex-col gap-3 absolute bottom-3">
      <button className="button_primary">회원가입</button>
      <button
        type="button"
        onClick={prevStepHandler}
        className="button_secondary"
      >
        이전
      </button>
    </div>
  );
}
