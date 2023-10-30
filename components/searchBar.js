function SearchBar(props) {
  return (
    <form
      className={`flex w-full justify-center ${props.formClass}`}
      onSubmit={props.onSubmit}>
      <label htmlFor={props.name}></label>
      <input
        type="search"
        id={props.name}
        placeholder={props.placeholder}
        onBlur={props.onBlur}
        onInput={props.onInput}
        onKeyDown={props.onKeyDown}
        className={`bg-white/80 text-black w-full lg:w-1/2 rounded-l-lg pl-3 py-1 border-l-1 border-t-1 border-b-1 border-gray-300 placeholder:text-gray-400 focus:outline-none ${props.inputClass}`}
      />
      <button
        type={"submit"}
        className={`bg-white/80 rounded-r-lg text-gray-500 py-2 px-4 hover:bg-gray-600 hover:text-white`}>search</button>
    </form>
  );
}

export default SearchBar;
