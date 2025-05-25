import useLocationStore from "../store/locationStore";

export default function useLocationChkBoxHandler() {
  const checkedLoacation = useLocationStore((state) => state.checkedLoacation);
  const actions = useLocationStore((state) => state.actions);

  const checked = checkedLoacation;

  const handleClickCheck = () => {
    actions.setCheckLocation(!checked);
  };

  return { handleClickCheck };
}
