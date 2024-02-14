'use client';
import '@/styles/specific_movie_list.scss';
import Media from '@/components/Media';
import { useState, useRef, useEffect, memo } from 'react';
import { getGenres } from '@/app/Actions';
import { FaChevronDown } from 'react-icons/fa';

import MediaStore from '@/store/MediaStore';
type pageType = {
  listType: string;
};
// export function generateMetadata({
//   params: { listType },
// }: {
//   params: pageType;
// }) {
//   return {
//     title: listType,
//   };
// }

function ListPage({ params: { listType } }: { params: pageType }) {
  // start
  const list = listType === 'movies' ? 'movie' : 'tv';

  type typeGenre = {
    id: number;
    name: string;
  };
  type sortBy = {
    value: string;
    label: string;
  };
  const {
    initial,
    url,
    sortBy,
    selectedGenresList,
    updateSpecific,
    setState,
    genres,
    mediaType,
  } = MediaStore();

  const baseURL = 'https://api.themoviedb.org/3/discover/movie?';

  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const initial_ren = useRef(true);

  function selectors() {
    return (
      <div className="selected_items">
        <div className="wrapper">
          {selectedGenresList.map((genre) => {
            const { id, name } = genre;
            return (
              <div className="selected" key={id}>
                {name}{' '}
                <span
                  onClick={(e) => {
                    // e.stopPropagation();
                    updateRemovedGenres(genre);
                  }}
                >
                  X
                </span>
              </div>
            );
          })}
        </div>
        <div
          className="close_all"
          onClick={(e) => {
            // e.stopPropagation();
            // setSelectedGenreList([]);
            updateSpecific('selectedGenresList', []);
            updateRemovedGenres({ id: 2, name: 'all' });
          }}
        >
          X
        </div>
      </div>
    );
  }

  function updateRemovedGenres(genre: typeGenre) {
    let tempSelectedGenreList: typeGenre[] = [];
    let tempGenreList: typeGenre[] = [];
    if (genre.name === 'all') {
      tempGenreList = [...selectedGenresList, ...genres];
    } else {
      const { id } = genre;
      tempSelectedGenreList = selectedGenresList.filter(
        (genre) => genre.id !== id
      );
      tempGenreList = [...genres, genre];
    }

    tempGenreList.sort((a: typeGenre, b: typeGenre) =>
      a.name.localeCompare(b.name)
    );
    setState({
      selectedGenresList: tempSelectedGenreList,
      genres: tempGenreList,
    });
  }

  const type = list === 'tv' ? 'tv shows' : 'movies';
  // const { page } = MediaStore();

  function filterGenre(genre: typeGenre) {
    const newGenres = genres.filter(({ id }: typeGenre) => genre.id !== id);

    setState({
      selectedGenresList: [...selectedGenresList, genre],
      genres: newGenres,
    });
  }
  function updateURL() {
    const genreIds: number[] = selectedGenresList.map((genre) => genre.id);
    const with_genres = JSON.stringify(genreIds).slice(1, -1);

    const temp = `${sortBy.value ? `sort_by=${sortBy.value}&` : ''}${
      with_genres && `with_genres=${with_genres}`
    }`;

    updateSpecific('url', temp);
  }

  useEffect(() => {
    async function fetchGenree() {
      const genres = await getGenres(list);
      // console.log(genres);

      setState({
        initial: false,
        // page: 0,
        // hasMore: false,
        mediaType: list,
        // total_pages: 0,
        // media: [],
        // url: '',
        // back: false,
        genres: genres,
        selectedGenresList: [],
        sortBy: {
          label: 'Sort By',
          value: '',
        },
      });
      // reset(list);
      // console.log(mediaType);
      // console.log(mediaType, list);
      window.scrollTo({ top: 0 });
    }

    if (initial || mediaType !== list) {
      fetchGenree();
    }
  }, []);
  useEffect(() => {
    if (!initial) {
      updateURL();
    }
    // console.log('jj');
  }, [selectedGenresList, sortBy]);
  return (
    <div
      className="specific_list"
      onClick={(e) => {
        // console.log('ff');
        e.preventDefault();
        e.stopPropagation();

        setToggle1(false);
        setToggle2(false);
      }}
    >
      <div className="header">
        <div className="heading">{`Explore ${type}`}</div>
        <div className="filters">
          <div className="select_1">
            <div className="selector">
              <div className="left">
                {selectedGenresList?.length ? selectors() : 'Select Genre'}
              </div>
              <div className="right">
                <div
                  className={toggle1 ? 'active icon' : 'icon'}
                  onClick={(e) => {
                    e.stopPropagation();

                    setToggle1(!toggle1);
                    setToggle2(false);
                  }}
                >
                  <FaChevronDown />
                </div>
              </div>
            </div>
            {toggle1 && (
              <ul
                className="genres opts"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {genres?.map(({ id, name }) => {
                  return (
                    <li
                      key={id}
                      onClick={(e) => {
                        e.stopPropagation();
                        filterGenre({ id, name });
                        // updateURL();
                      }}
                    >
                      {name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className="select_2">
            <div className="selector">
              <div className="selected">
                <div className="left">{sortBy.label}</div>
                {sortBy?.value && (
                  <div
                    className="right"
                    onClick={(e) => {
                      e.stopPropagation();
                      // setSelectedGenreList([]);
                      setToggle2(false);
                      updateSpecific('sortBy', {
                        label: 'Sort By',
                        value: '',
                      });
                    }}
                  >
                    X
                  </div>
                )}
              </div>
              <div
                className={toggle2 ? 'active icon' : 'icon'}
                onClick={(e) => {
                  e.stopPropagation();
                  setToggle1(false);
                  setToggle2(!toggle2);
                }}
              >
                <FaChevronDown />
              </div>
            </div>
            {toggle2 && (
              <ul className="sort opts">
                {sortbyData.map(({ value, label }) => {
                  const isActive = label === sortBy?.label;
                  return (
                    <li
                      key={value}
                      className={isActive ? 'active' : ''}
                      onClick={(e) => {
                        e.stopPropagation();
                        // setSortBy({ value, label });
                        setToggle2(false);
                        updateSpecific('sortBy', { value, label });
                      }}
                    >
                      {label}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>

      <Media search={false} list={list} />
    </div>
  );
}

export default memo(ListPage);

const sortbyData = [
  // { value: '', label: 'Default' },
  { value: 'popularity.desc', label: 'Popularity Descending' },
  { value: 'popularity.asc', label: 'Popularity Ascending' },
  { value: 'vote_average.desc', label: 'Rating Descending' },
  { value: 'vote_average.asc', label: 'Rating Ascending' },
  {
    value: 'primary_release_date.desc',
    label: 'Release Date Descending',
  },
  { value: 'primary_release_date.asc', label: 'Release Date Ascending' },
  { value: 'original_title.asc', label: 'Title (A-Z)' },
];
