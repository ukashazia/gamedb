import ImageComponent from "./imageComponent";

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
    <div className={`${props.itemsWrapperClass} cursor-pointer`}>
      <ImageComponent
        src={props.src}
        alt={props.alt}
        width={300}
        height={169}
        className={props.className}
      />
    </div>
  );
}

export default GalleryComponent;
