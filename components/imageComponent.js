import Image from "next/image";

function ImageComponent(props) {
  return (
    <Image
      height={props.height}
      width={props.width}
      src={props.src}
      alt={props.alt}
      className={`${props.className} rounded-lg shadow-2xl`}
    />
  );
}

export default ImageComponent;
