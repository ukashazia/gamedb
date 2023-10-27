import Image from "next/image";
import { useState } from "react";

function ImageComponent(props) {
  const [loading, setLoading] = useState(true);

  return (
    <Image
      height={props.height}
      width={props.width}
      src={props.src}
      alt={props.alt}
      className={`${props.className} rounded-lg shadow-2xl ${
        loading ? "animate-pulse bg-gray-500" : ""
      }`}
      onLoadingComplete={() => setLoading(false)}
    />
  );
}

export default ImageComponent;
