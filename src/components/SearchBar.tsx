import React from "react";

interface SearchBarProps {
  filterList: (query: string) => void;
}

const SearchBar = ({ filterList }: SearchBarProps): JSX.Element => {
  return (
    <input
      key="random1"
      className="ticker-search"
      placeholder={"Search ticker"}
      onChange={(e) => filterList(e.target.value)}
    />
  );
};

export default SearchBar;
