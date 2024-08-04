"use client";

import Image, { ImageProps } from "next/image";
import React, { useState } from "react";

interface IProps extends ImageProps {
  fallbackSrc?: string;
}

export default function FallbackImage({
  fallbackSrc = "/images/no-image.png",
  ...props
}: IProps) {
  const [isImgError, setIsImgError] = useState<boolean>(false);

  return (
    <Image
      {...props}
      src={isImgError ? fallbackSrc : props.src}
      onError={() => {
        setIsImgError(true);
      }}
    />
  );
}
