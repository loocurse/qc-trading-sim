import React from "react";

interface SearchBarProps {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = ({ keyword, setKeyword }: SearchBarProps): JSX.Element => {
	return (
		<input 
			key="random1"
			value={keyword}
			className="ticker-search"
			placeholder={"Search ticker"}
			onChange={(e) => setKeyword(e.target.value)}
		/>
	);
};

export default SearchBar;