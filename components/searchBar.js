import Button from "@/components/button";

function SearchBar(props) {
  return (
    <form
      className={`flex gap-2 w-full justify-center ${props.formClass}`}
      onSubmit={props.onSubmit}>
      <label htmlFor={props.name}></label>
      <input
        type="search"
        id={props.name}
        placeholder={props.placeholder}
        onBlur={props.onBlur}
        onInput={props.onInput}
        onKeyDown={props.onKeyDown}
        className={`bg-white/80 text-black rounded-lg pl-2 py-1 border border-gray-300 placeholder:text-gray-400 ${props.inputClass}`}
      />
      <Button text={props.searchButtonText} type={"submit"} />
    </form>
  );
}

export default SearchBar;
