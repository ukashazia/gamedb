import { Suspense } from "react";
// import React from "react";
import ImageComponent from "./imageComponent";
// const ImageComponent = React.lazy(() => import("@/components/imageComponent"));

import Loading from "@/app/loading";

function GalleryComponent(props) {
  return props.data.map((item) => (
    <GalleryCard
      src={item.image}
      alt={props.name}
      key={item.id}
      itemsWrapperClass={props.itemsWrapperClass}
    />
  ));
}

function GalleryCard(props) {
  return (
    <Suspense fallback={<Loading />}>
      <div className={`${props.itemsWrapperClass} cursor-pointer`}>
        <ImageComponent
          src={props.src}
          alt={props.alt}
          width={300}
          height={169}
          className={props.className}
        />
      </div>
    </Suspense>
  );
}

export default GalleryComponent;
