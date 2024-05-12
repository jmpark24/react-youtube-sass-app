import React, { useContext } from 'react';
import { ImSearch as SearchIcon } from 'react-icons/im';
import { MdKeyboardVoice as VoiceIcon } from 'react-icons/md';
import useWindowSize from '../../../helpers/useWindowSize';
import { SearchContext } from '../../../context/SearchContext';

const SearchBar = ({ onChange, onSubmit }) => {
  const { width } = useWindowSize();
  const { searchQuery, setShowSpecialSearchBar } = useContext(SearchContext);

  return (
    <div className={`SearchBar ${width <= 640 ? 'smallSearch' : ''}`}>
      {width > 640 ? (
        <form onSubmit={onSubmit}>
          <input type="text" name="search" placeholder="Search" value={searchQuery.input} onChange={onChange} />
          <button type="submit">
            <SearchIcon size={20} data-tooltip-content="Search" data-tooltip-id="navbar" />
          </button>
        </form>
      ) : (
        <button className="icon-container searchIcon" onClick={() => setShowSpecialSearchBar(true)}>
          <SearchIcon size={20} />
        </button>
      )}
      <button className="icon-container voiceIcon">
        <VoiceIcon size={25} data-tooltip-content="Search with your voice" data-tooltip-id="navbar" />
      </button>
    </div>
  );
};

export default SearchBar;
