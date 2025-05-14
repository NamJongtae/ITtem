import React from "react";

interface IProps {
  price: number;
}

export default function ProductDetailContentInfoPrice({ price }: IProps) {
  return (
    <div className="mt-3 text-gray-700 font-semibold">
      <span className="text-3xl md:text-4xl ">{price.toLocaleString()}</span>
      <span className="ml-1 text-2xl">원</span>
    </div>
  );
}
