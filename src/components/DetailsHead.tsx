import Image from 'next/image';

import { getTime, getDate } from '@/app/utils/helper';
import '@/styles/detailsHead.scss';
import { FaHeart, FaBookmark, FaPlay } from 'react-icons/fa';
import { getColorAndRating } from '@/app/utils/helper';
import { getImages, getVideos, getWatchProviders } from '@/app/Actions';
import Link from 'next/link';

const DetailsHead = async ({ data }: any) => {
  const {
    id,
    created_by,
    backdrop_path,
    poster_path,
    title,
    name,
    overview,
    vote_average,
    release_date,
    genres,
    runtime,
    tagline,
    status,
    // key,
    crewMap,
    url,
    list,
    first_air_date,
    number_of_episodes,
    number_of_seasons,
  }: any & { crewMap: any; url: string; list: string } = data;

  //triler

  const videos = await getVideos(id, list);
  const trailer = videos?.find((video: any) => video.type === 'Trailer');

  genres ? (genres.length = 5) : '';

  const { year, month, day } = getDate(release_date || first_air_date);

  const movie = list === 'movie';

  const src = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  const { rating, colorClass } = getColorAndRating(vote_average);

  let crewArray = [];
  // console.log('vv');
  for (let [name, department] of crewMap) {
    department = department.join(',');
    crewArray.push({ name, department });
  }
  if (crewArray.length < 4 && created_by?.length) {
    for (const { name } of created_by) {
      crewArray.push({ name, department: 'Creator' });
    }
  } else {
    crewArray.length = 4;
  }
  let obj1 = {},
    obj2 = {};
  if (movie) {
    const { hours, minutes } = getTime(runtime);

    obj1 = {
      name: 'RunTime',
      department: hours || minutes ? `${hours}h ${minutes}m` : 'N/A',
    };
    obj2 = {
      name: 'Release Date',
      department:
        release_date || first_air_date ? `${month}${day},${year}` : 'N/A',
    };
  } else {
    obj1 = { name: 'Number Of episodes', department: number_of_episodes };
    obj2 = { name: 'number of seasons', department: number_of_seasons };
  }
  crewArray.push(obj1, obj2);

  // console.log(crewArray);
  // watch Providers
  const watch = await getWatchProviders(list, id);

  let provider;
  if (watch) {
    provider =
      watch?.results?.IN?.flatrate ||
      watch?.results?.IN?.rent ||
      watch?.results?.IN?.buy ||
      watch?.results?.US?.buy ||
      watch?.results?.US?.rent;
    provider = provider ? provider[0] : provider;
  }
  const image = await getImages(list, id);
  // console.log(image);

  return (
    <div className="details_container">
      <div className="ff"></div>

      {backdrop_path && (
        <Image
          src={src}
          alt="background"
          fill={true}
          sizes="(max-width: 570px) 100vw, (max-width: 1200px)  70vw, 60vw"
          priority
          // quality={77}
          className="bg"
        />
      )}
      <div className="left">
        <div className="bgg">
          {backdrop_path && (
            <Image
              src={src}
              alt="background"
              fill={true}
              sizes="(max-width: 570px) 100vw, (max-width: 1200px)  70vw, 60vw"
              priority={true}
              // quality={50}
              className="bg_small"
            />
          )}
        </div>
        <div className="content">
          <div className="image">
            <Image
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w400${poster_path}`
                  : '/no-poster.png'
              }
              alt="posterr"
              fill={true}
              sizes="(max-width: 570px) 100vw, (max-width: 1200px)  70vw, 60vw"
            />
          </div>
          {provider && (
            <div className="watch_provider">
              <div className="img">
                <Image
                  src={`https://media.themoviedb.org/t/p/original${provider?.logo_path}`}
                  alt={provider.provider_name}
                  fill
                  sizes="100%"
                />
              </div>
              <div className="text">
                <h3>Streaming On</h3>
                <h2>{provider.provider_name}</h2>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="right">
        <div className="ff"></div>
        {image && (
          <Image
            // {...img}
            src={`https://image.tmdb.org/t/p/original${image?.file_path}`}
            alt="background"
            fill={true}
            sizes="(max-width: 870px) 100vw,0vw"
            // quality={45}
            className="bg_right"
            // blurDataURL={base64}
            // placeholder="blur"
          />
        )}
        <div className="details">
          <div className="one">
            <div className="title">
              {title || name}
              <span>({year})</span>
            </div>
            <div className="genres">
              {genres?.map(({ name }: { name: string }, index: number) => {
                return (
                  <div className="genre" key={index}>
                    {name}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="two">
            <div className={`rating ${colorClass}`}>
              {rating}
              <span>&#37;</span>
            </div>
            <div className="opt">
              <FaHeart />
            </div>
            <div className="opt">
              <FaBookmark />
            </div>
            <Link href={`${url}?videoId=${trailer?.key}`}>
              <div className="opt">
                <FaPlay />
                <span>{trailer?.key ? 'PlayTrailer' : 'N/A'}</span>
              </div>
            </Link>
          </div>
          {tagline && <div className="tagline">{tagline}</div>}
          <div className="three">
            <div className="heading">Overview</div>

            <p>{overview}</p>
          </div>
          <div className="four">
            {crewArray.map(({ name, department }: any) => {
              return (
                <div className="crew" key={name}>
                  <div className="person">{name}</div>
                  <div className="job">{department}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsHead;
