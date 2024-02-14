import Header from '@/components/Header';
import SpecificCarousel from '@/components/SpecificCarousel';
import Back from '@/components/Back';
export default function Home() {
  return (
    <div style={{ position: 'relative' }} className="home">
      <Header />

      <Back list={'home'} />
      <SpecificCarousel
        list={'trending'}
        heading={'Trending'}
        home={true}
        backdropCard={true}
      />

      <SpecificCarousel
        list={'movie'}
        heading={'Telugu Movies'}
        home={false}
        backdropCard={false}
        url={
          'discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_origin_country=IN&with_original_language=te'
        }
      />

      <SpecificCarousel
        list={'top_rated'}
        heading={'Top Rated'}
        home={true}
        backdropCard={true}
      />
      <SpecificCarousel
        list={'movie'}
        heading={'Hindi Movies'}
        home={false}
        backdropCard={false}
        url={
          'discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_origin_country=IN&with_original_language=hi'
        }
      />
      <SpecificCarousel
        list={'upcoming'}
        heading={"Whats's Upcoming"}
        home={true}
        backdropCard={false}
      />
      <SpecificCarousel
        list={'movie'}
        heading={'Tamil Movies'}
        home={false}
        backdropCard={false}
        url={
          'discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_origin_country=IN&with_original_language=ta'
        }
      />

      <SpecificCarousel
        list={'movie'}
        heading={'Telugu Golden Movies'}
        home={false}
        backdropCard={false}
        url={
          '/discover/movie?include_adult=false&include_video=false&language=en-US&release_date.lte=2000-04-29&sort_by=popularity.desc&with_origin_country=IN&with_original_language=te'
        }
      />
    </div>
  );
}
