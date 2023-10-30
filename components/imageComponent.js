import Image from "next/image";
import { useState } from "react";

function ImageComponent(props) {
  const [loading, setLoading] = useState(true);

  return (
    <Image
      height={props.height}
      width={props.width}
      sizes={props.sizes}
      src={props.src}
      alt={props.alt}
      fill={props.fill}
      className={`${props.className} rounded-lg shadow-2xl ${
        loading ? `animate-pulse bg-gray-500 min-h-[${props.height}px]` : ""
      }`}
      onLoad={() => setLoading(false)}
    />
  );
}

export default ImageComponent;
