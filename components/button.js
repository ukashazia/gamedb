function Button(props) {
  return (
    <button
      className="color-secondary text-white p-2 rounded-lg"
      type={props.type}
      onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default Button;
