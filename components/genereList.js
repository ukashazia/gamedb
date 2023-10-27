function GenreList(props) {
  return props.data.map((item) => (
    <li className={props.elementsClass} key={item.id}>
      {item.name}
    </li>
  ));
}

export default GenreList;
