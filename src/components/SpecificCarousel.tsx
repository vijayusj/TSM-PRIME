'use client';
import '@/styles/specific_carousel.scss';
import { getDetailLists } from '@/app/Actions';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Card from './Card';
import CardLoader from './CardLoader';

import { Dispatch, SetStateAction } from 'react';
const Carousel = ({
  heading,
  // list,
  url = '',
  home,
  list,

  movieList,
  setMovieList,
  cardListType,
  backdropCard,
  seasons = [],
}: {
  heading: string;
  list?: string;

  url?: string;
  home: boolean;

  movieList: boolean;
  setMovieList: Dispatch<SetStateAction<boolean>>;
  cardListType: string;
  backdropCard: boolean;
  seasons?: any[];
}) => {
  const { ref, inView } = useInView({});
  const seasons_carousel = heading === 'seasons';
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [media, setMedia] = useState<any[]>(seasons_carousel ? seasons : []);

  async function fetch(refresh: boolean) {
    if (!hasMore && !refresh) return;

    const current = refresh ? 1 : page + 1;
    let newURL = url;
    if (
      list !== 'movie' ||
      heading === 'similar' ||
      heading === 'recommendations'
    ) {
      newURL = `${url}?language=en-US&page=${current}`;
    } else {
      newURL = `${url}&page=${current}`;
    }

    const { results: data, total_pages } = await getDetailLists(newURL);
    if (data?.length) {
      if (refresh) {
        setMedia([...data]);
        setPage(current);
        const scrollCont = document.getElementById(heading);
        if (scrollCont) {
          // console.log('vij');
          scrollCont.scrollLeft = 0;
        }
      } else {
        setMedia([...media, ...data]);
        setPage(page + 1);
      }
    }
    setHasMore(current < 4 && current < total_pages);
  }

  useEffect(() => {
    if (seasons_carousel) return;
    setMedia([]);
    setHasMore(true);
    fetch(true);
  }, [url]);

  useEffect(() => {
    if (inView) {
      if (!hasMore) return;
      fetch(false);
    }
  }, [inView]);

  return (
    <div className="specific_carousel_container">
      <div className="carousel_header">
        <h1 className="heading">{heading}</h1>
        {home && (
          <div className="opts">
            <div
              onClick={(e: any) => {
                e.stopPropagation();
                setMovieList(true);
              }}
              className={movieList ? 'active' : ''}
            >
              Movies
            </div>
            <div
              onClick={(e: any) => {
                e.stopPropagation();
                setMovieList(false);
              }}
              className={!movieList ? 'active' : ''}
            >
              TV Shows
            </div>
          </div>
        )}
      </div>
      <div className="carousel curs" id={heading}>
        {media.length > 0 &&
          media.map((data, index) => {
            if (index === media.length - 1 && !seasons_carousel) {
              return (
                <div
                  ref={ref}
                  className={backdropCard ? 'last_backdrop' : 'last'}
                  key={data.id}
                >
                  <Card
                    data={data}
                    key={data.id}
                    list={cardListType}
                    backdropCard={backdropCard}
                  />
                </div>
              );
            }
            return (
              <Card
                data={data}
                key={data.id}
                list={cardListType}
                backdropCard={backdropCard}
                self={seasons_carousel}
              />
            );
          })}
        {hasMore && !seasons_carousel && (
          <CardLoader wrap={false} backdropCard={backdropCard} />
        )}
        {!hasMore && !media.length && (
          <h3 className="empty">We don't have enough data to suggest</h3>
        )}
      </div>
    </div>
  );
};

export default function SpecificCarousel({
  heading,
  list,
  url = '',
  home,

  backdropCard,
  seasons = [],
}: {
  heading: string;
  list: string;

  url?: string;
  home: boolean;

  backdropCard: boolean;
  seasons?: any[];
}) {
  const [movieList, setMovieList] = useState(true);
  // const [updatedURL, setUpdatedURL] = useState(url);
  let updatedURL = url;
  let updatedList = list;
  let cardListType = list;
  if (list === 'trending') {
    updatedList = movieList ? 'now_playing' : 'airing_today';
  } else if (list === 'upcoming' && !movieList) {
    updatedList = 'on_the_air';
  }

  // console.log(updatedURL);
  if (home) {
    cardListType = movieList ? 'movie' : 'tv';
    updatedURL = `${cardListType}/${updatedList}`;
  }

  return (
    <Carousel
      url={updatedURL}
      heading={heading}
      home={home}
      list={list}
      movieList={movieList}
      setMovieList={setMovieList}
      cardListType={cardListType}
      backdropCard={backdropCard}
      seasons={seasons}
    />
  );
}
