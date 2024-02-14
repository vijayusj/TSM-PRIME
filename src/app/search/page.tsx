'use client';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '@/styles/search.scss';
import Media from '@/components/Media';
import MediaStore from '@/store/MediaStore';
import { MdMovieFilter } from 'react-icons/md';
const SearchPage = () => {
  const { setState, url, back, mediaType, initial } = MediaStore();
  const re_entry = back && mediaType === 'search' && initial;
  const [query, setQuery] = useState(re_entry ? url : '');
  // console.log(mediaType);
  function grabResults() {
    const initial_store = {
      initial: true,
      page: 0,
      hasMore: false,
      mediaType: 'search',
      total_pages: 0,
      // media: [],
      url: query,
      back: false,
    };

    setState(initial_store);
  }
  // console.log(url, query);

  return (
    <div className="search_container">
      <div className="head">
        <input
          type="text"
          // autoFocus
          placeholder="Search for a movie or tv show...."
          onChange={(e) => {
            // console.log(e.target);
            setQuery(e.target.value);
          }}
          value={query}
          onKeyDown={(e) => {
            e.stopPropagation();

            if (!query.length) return;
            if (e.key && e.key === 'Enter') {
              grabResults();
            }
          }}
        />
        <div
          onClick={(e) => {
            e.stopPropagation();
            grabResults();
          }}
        >
          <FaSearch />
        </div>
      </div>

      <div className="results">
        {url.length ? (
          <Media search={true} list="search" />
        ) : (
          <div className="initial_search">
            <MdMovieFilter className="ic" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
