import React, { useContext } from 'react';
import LeftNav from './LeftNav';
import SearchBar from './SearchBar';
import RightBar from './RightBar';
import { ImSearch as SearchIcon } from 'react-icons/im';
import { MdKeyboardVoice as VoiceIcon } from 'react-icons/md';
import { BiArrowBack as ArrowBack } from 'react-icons/bi';
import { SearchContext } from '../../context/SearchContext';
import useWindowSize from '../../helpers/useWindowSize';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const { width } = useWindowSize();
  const { showSpecialSearchBar, setShowSpecialSearchBar, searchQuery, setSearchQuery } = useContext(SearchContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setSearchQuery({
      ...searchQuery,
      input: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.input !== '') {
      const response = await axios.get(`/search?part=snippet&maxResults=10&q=${searchQuery.input}`);

      setSearchQuery({
        ...searchQuery,
        videos: response.data.items,
      });

      navigate(`/results/${searchQuery.input}`);
    }
  };

  const specialSearchBarMarkUp = (
    <div className="special_searchbar">
      <button onClick={() => setShowSpecialSearchBar(false)}>
        <ArrowBack size={25} />
      </button>
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" placeholder="Search" value={searchQuery.input} onChange={handleChange} />
        <button>
          <SearchIcon size={20} />
        </button>
      </form>
      <button className="icon-container voiceIcon">
        <VoiceIcon size={25} />
      </button>
    </div>
  );

  return (
    <nav className="Navbar">
      {width <= 640 && showSpecialSearchBar ? (
        specialSearchBarMarkUp
      ) : (
        <>
          <LeftNav />
          <SearchBar onChange={handleChange} onSubmit={handleSubmit} />
          <RightBar />
        </>
      )}
    </nav>
  );
};

export default NavigationBar;
