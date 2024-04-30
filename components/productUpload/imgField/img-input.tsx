import { ProductImgData } from "@/types/productTypes";
import React, { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  preview: ProductImgData[];
  onChangeImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImgInput = forwardRef<HTMLInputElement, IProps>(
  ({ preview, onChangeImg }, inputRef) => {
    const { register } = useFormContext();
    const { ref, ...rest } = register("img", {
      onChange: onChangeImg,
    });

    return (
      <>
        <label className="sr-only" htmlFor="img">
          상품이미지
        </label>
        <h3 className="text-lg font-semibold">
          상품이미지 {`(${preview.length}/5)`}{" "}
          <span className="text-red-500">*</span>
        </h3>
        <input
          className="hidden"
          multiple
          type="file"
          accept="image/jpeg, image/png, image/svg+xml"
          id="img"
          {...rest}
          ref={(e) => {
            ref(e);
            if (typeof inputRef === "function") {
              inputRef(e);
            } else if (inputRef) {
              inputRef.current = e;
            }
          }}
        />
      </>
    );
  }
);

ImgInput.displayName = "img-input";

export default ImgInput;
