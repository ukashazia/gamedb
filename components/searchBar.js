function SearchBar(props) {
  return (
    <input
      type="search"
      id={props.id}
      placeholder="Search anything ..."
      onBlur={props.onBlur}
      onInput={props.onInput}
      onKeyDown={props.onKeyDown}
      className={`bg-white/80 text-black rounded-lg pl-2 py-1 border border-gray-300 placeholder:text-gray-400 ${props.className}`}
    />
  );
}

export default SearchBar;
