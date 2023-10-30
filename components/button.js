function Button(props) {
  return (
    <button
      className={`bg-black text-white py-2 px-4 rounded-lg ${props.className}`}
      type={props.type}
      onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default Button;
