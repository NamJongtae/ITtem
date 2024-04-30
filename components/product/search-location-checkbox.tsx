import useLocation from "@/hooks/commons/useLocation";
import { locationSlice } from "@/store/locationSlice";
import { AppDispatch } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function LocationCheckbox() {
  const { fetchCurrentLocation } = useLocation();

  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleClickCheck = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    if (checked) {
      fetchCurrentLocation();
    } else {
      dispatch(locationSlice.actions.resetLocation());
    }
  }, [checked, fetchCurrentLocation, dispatch]);

  return (
    <div className="inline-flex items-center">
      <label
        className="relative flex cursor-pointer items-center rounded-full"
        htmlFor="location-checkbox"
      >
        <input
          type="checkbox"
          className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-[4px] border border-blue-gray-200 transition-all checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
          id="location-checkbox"
          checked={checked}
          onChange={handleClickCheck}
        />
        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </label>
      <span className="pl-1 text-sm">내 지역 검색</span>
    </div>
  );
}
