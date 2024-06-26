import useProductUploadImgInput from "@/hooks/productUpload/useProductUploadImgInput";
import { ProductImgData } from "@/types/productTypes";
import React, { ForwardedRef, forwardRef } from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  preview: ProductImgData[];
  onChangeImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImgInput = forwardRef<HTMLInputElement, IProps>(
  ({ preview, onChangeImg }, inputRef: ForwardedRef<HTMLInputElement>) => {
    const { register, rest } = useProductUploadImgInput({ onChangeImg });
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
          id="imgData"
          {...rest}
          ref={inputRef}
        />
        <input className="hidden" {...register("prevImgData")} />
      </>
    );
  }
);

ImgInput.displayName = "img-input";

export default ImgInput;
