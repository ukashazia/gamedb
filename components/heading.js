function Heading(props) {
  return <h1 className={`text-2xl ${props.className}`}>{props.children}</h1>;
}

export default Heading;
