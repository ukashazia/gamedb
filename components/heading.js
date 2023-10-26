function Heading(props) {
  return <h1 className={`text-2xl ${props.className}`}>{props.text}</h1>;
}

export default Heading;
