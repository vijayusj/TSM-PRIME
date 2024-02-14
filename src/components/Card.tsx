'use client';
import { CardType } from '@/types';
import Image from 'next/image';
import '@/styles/card.scss';
import Link from 'next/link';
import { getDate } from '@/app/utils/helper';
import { getColorAndRating } from '@/app/utils/helper';
import { useState, memo } from 'react';
const Card = ({
  data,
  list,
  backdropCard,
  self,
}: {
  data?: any;
  list: string;
  backdropCard?: boolean;
  self?: boolean;
}) => {
  const loading = list === 'loading';
  const [isLoading, setLoading] = useState(true);
  const backdrop = `https://image.tmdb.org/t/p/original${data?.backdrop_path}`;
  const poster = `https://image.tmdb.org/t/p/w400${data?.poster_path}`;
  const ImageAvailable = backdropCard ? data?.backdrop_path : data?.poster_path;
  return (
    <>
      {!loading ? (
        <div className={backdropCard ? 'backdrop_card' : 'card'} key={data?.id}>
          <Link
            href={self ? '' : `/specific/${list}/${data?.id}`}
            className="nav"
            // scroll={true}
            prefetch={false}
          >
            <div className="img">
              {ImageAvailable ? (
                <Image
                  src={backdropCard ? backdrop : poster}
                  alt="poster"
                  fill
                  sizes="(max-width: 570px) 100vw, (max-width: 1200px)  70vw, 60vw"
                  className={isLoading ? 'isLoading' : ''}
                  onLoad={() => setLoading(false)}
                />
              ) : (
                <Image
                  src={
                    backdropCard ? '/No_Image_Available.jpg' : '/no-poster.png'
                  }
                  alt="poster"
                  fill
                  sizes="100%"
                  priority
                  className={isLoading ? 'isLoading' : ''}
                  onLoad={() => setLoading(false)}
                />
              )}
            </div>
          </Link>
        </div>
      ) : (
        <div className={`${backdropCard ? 'backdrop_card' : 'card'} loading`}>
          <div className=""></div>
        </div>
      )}
    </>
  );
};

export default memo(Card);
