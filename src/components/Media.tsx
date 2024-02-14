'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

import Card from './Card';
import '@/styles/media.scss';
import { memo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import MediaStore from '@/store/MediaStore';
import { getDataByGenre } from '@/app/Actions';
import noresults from '../../public/res.png';
import CardLoader from './CardLoader';
import SpecificCarousel from './SpecificCarousel';
import { FaCircleArrowUp } from 'react-icons/fa6';
const Media = memo(({ search, list }: { search: boolean; list: string }) => {
  const baseURL = `https://api.themoviedb.org/3/discover/${list}?include_adult=false&include_video=false&language=en-US&`;

  const [loader, setLoader] = useState(true);

  const { ref, inView } = useInView({
    // rootMargin: '-10px',
  });
  const {
    loading,
    hasMore,
    page,
    media,
    setState,
    total_pages,
    url,
    back,
    mediaType,
  } = MediaStore();

  function scrollToTop(e: any) {
    e.stopPropagation();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  // next
  async function fetchData(url: string) {
    return await getDataByGenre(url);
  }

  const correctPage = mediaType === list;

  const next = async (currentPage: number, newPage: boolean) => {
    const next = currentPage + 1;
    // console.log('next', next);
    let newURL = '';
    const subUrl = correctPage ? url : '';
    if (search) {
      newURL = `https://api.themoviedb.org/3/search/multi?query=${subUrl}&include_adult=false&language=en-US&page=${next}`;
    } else {
      newURL = `${baseURL}page=${next}&${subUrl}`;
    }

    // console.log(newURL);
    //

    const res = await fetchData(newURL);

    const { results, total_pages: tp } = res;

    const newState = {
      loading: false,
      page: next,
      hasMore: next < tp,
      total_pages: newPage ? tp : total_pages,
      media: newPage ? results : [...media, ...results],
    };
    setState(newState);
  };

  useEffect(() => {
    if (back && correctPage) {
      setState({ back: false });
      // setLoader(false);
      return;
    } else if (back) {
      // console.log('tt');
      if (search) {
        setState({ loading: true, back: false, mediaType: list, url: '' });
      } else {
        setState({ loading: true, back: false });
      }
    } else {
      setState({ loading: true });
    }

    next(0, true);
  }, [url]);

  useEffect(() => {
    if (inView) {
      // console.log('1');
      next(page, false);
    }
  }, [inView]);

  // console.log(loading, media.length, mediaType, list, url);
  return (
    <div className="list_container">
      {(loading || media.length > 0) && (
        <div id="toast_result">
          <div className="res">
            {loading ? 'Loading...' : `${page}  / ${total_pages}`}
            <FaCircleArrowUp className="top" onClick={scrollToTop} />
          </div>
        </div>
      )}
      {!loading && correctPage ? (
        <>
          {media.length ? (
            <div className="media">
              {media.map((data: any, index: number) => {
                // if(search)
                const tempList = search ? data?.media_type : list;
                return <Card data={data} list={tempList} key={index} />;
              })}

              {hasMore && (
                <div className={'smallLoader'} ref={ref}>
                  <LoadingSpinner />
                </div>
              )}
            </div>
          ) : (
            <div className="no_results">
              <div className="wrapper_img">
                <div className="no_res_img">
                  <Image
                    src={noresults}
                    alt="nores"
                    fill
                    sizes="100%"
                    placeholder="blur"
                  />
                </div>
              </div>
              <div className="text">
                We didn't find any matches. Browse our Top Rated & Trending TV
                shows and movies.
              </div>
              <SpecificCarousel
                list={'top_rated'}
                heading={'Top Rated'}
                home={true}
                backdropCard={true}
              />
              <SpecificCarousel
                list={'trending'}
                heading={'trending'}
                home={true}
                backdropCard={true}
              />
            </div>
          )}
        </>
      ) : (
        <CardLoader wrap={true} />
      )}
    </div>
  );
});

export default Media;
