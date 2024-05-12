import { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchContextProvider = (props) => {
  const [searchQuery, setSearchQuery] = useState({
    input: '',
    videos: [],
  });
  const [showSpecialSearchBar, setShowSpecialSearchBar] = useState(false);

  return (
    <SearchContext.Provider
      value={{ showSpecialSearchBar, setShowSpecialSearchBar, searchQuery, setSearchQuery }}
      {...props}
    />
  );
};
