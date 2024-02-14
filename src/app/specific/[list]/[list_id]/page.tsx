import { getSpecificDetails } from '@/app/Actions';
import DetailsHead from '@/components/DetailsHead';
import { getCredits } from '@/app/Actions';
import Cast from '@/components/Cast';
import '@/styles/Details.scss';
import VideosCarousel from '@/components/VideosCarousel';
import SpecificCarousel from '@/components/SpecificCarousel';
import VideoPop from '@/components/VideoPop';
import Back from '@/components/Back';
import Image from 'next/image';
// export async function generateMetadata({
//   params: { list, list_id },
// }: {
//   params: { list: string; list_id: string };
// }) {
//   const { title, name } = await getSpecificDetails(list, list_id);
//   return {
//     title: title || name,
//   };
// }
const MoviePage = async ({
  params: { list, list_id },
  searchParams: { videoId },
}: {
  params: { list: string; list_id: string };
  // searchParams: any;
  searchParams: { videoId: string };
}) => {
  // console.log('vvv');
  const list_type = list === 'movies' ? 'movie' : 'tv';
  const [data, { crew, cast }]: [data: any, obj: any] = await Promise.all([
    await getSpecificDetails(list, list_id),
    await getCredits(list, list_id),
  ]);

  const crewMap = new Map<string, string[]>();
  if (crew) {
    for (const { name, department } of crew) {
      if (department !== 'Directing' && department !== 'Writing') continue;

      if (crewMap.has(name)) {
        const temp = crewMap.get(name) || [];
        temp?.push(department);
        crewMap.set(name, temp);
      } else {
        crewMap.set(name, [department]);
      }
    }

    // mainCrew.length = 5;
  }

  const {
    id,
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
    budget,
    revenue,
    original_title,
    original_name,
    type,
    networks,
  } = data;
  let tv_seasons = [];
  if (list === 'tv') {
    const { seasons } = data;
    tv_seasons = seasons;
  }

  let aside: any[] = [];
  if (list === 'movie') {
    const formate_budget = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    })
      .format(budget)
      .replace(/\.00$/, '');

    const formate_revenue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    })
      .format(revenue)
      .replace(/\.00$/, '');
    aside = [
      { name: 'status', description: status },
      { name: 'budget', description: formate_budget },
      { name: 'revenue', description: formate_revenue },
      { name: 'original title', description: original_title },
    ];
  } else {
    const logo = networks?.[0]?.logo_path;

    aside = [
      { name: 'status', description: status },
      { name: 'type', description: type },
      { name: 'original name', description: original_name },
      { name: 'network', description: logo },
    ];
  }
  const url = `/specific/${list}/${id}`;

  return (
    <div className="media_container">
      {/* <Suspense fallback={<h1>loading....</h1>}> */}
      {/* <VideoPop /> */}
      {videoId && <VideoPop />}

      <DetailsHead
        data={{
          ...data,

          crewMap,
          url,
          list,
        }}
      />

      {/* </Suspense> */}
      {/* <Suspense fallback={<h1>loading....</h1>}> */}
      <div className="second">
        <Cast cast={cast} />
        <Aside det={aside} />
      </div>

      {tv_seasons?.length ? (
        <SpecificCarousel
          heading={'seasons'}
          list={'tv'}
          home={false}
          backdropCard={false}
          seasons={tv_seasons}
        />
      ) : (
        ''
      )}

      <VideosCarousel id={id} listType={list} url={url} />
      <SpecificCarousel
        heading="recommendations"
        list={list}
        url={`${list}/${id}/recommendations`}
        home={false}
        backdropCard={false}
      />
      <SpecificCarousel
        heading="similar"
        list={list}
        url={`${list}/${id}/similar`}
        home={false}
        backdropCard={false}
      />
      <Back list={list} />
    </div>
  );
};

export default MoviePage;

const Aside = ({ det }: any) => {
  // console.log(props);

  return (
    <div className="status">
      {det.map(({ name, description }: any) => {
        if (name === 'network') {
          return (
            <div className="logo" key={name}>
              <div>{name}</div>
              <div className="img">
                {description ? (
                  <Image
                    src={`https://media.themoviedb.org/t/p/h30${description}`}
                    alt="network"
                    fill={true}
                    sizes="100%"
                  />
                ) : (
                  'N/A'
                )}
              </div>
            </div>
          );
        }

        return (
          <div key={name}>
            <div>{name}</div>
            <p>{description}</p>
          </div>
        );
      })}
    </div>
  );
};
