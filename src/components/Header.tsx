import { trending } from '@/app/Actions';
import Image from 'next/image';
import '@/styles/header.scss';
import Link from 'next/link';
import { FaRegPlayCircle, FaPlus } from 'react-icons/fa';
import ThemeBtn from './ThemeBtn';
const Header = async () => {
  const { results } = await trending('all', 'day');

  const length = results.length;
  const index = Math.floor(Math.random() * length);
  // console.log(results[index]);
  const media = results[index];
  const poster = media?.backdrop_path;
  const mobile_poster = results[index]?.poster_path;
  const src = `https://image.tmdb.org/t/p/original${poster}`;
  const src2 = `https://image.tmdb.org/t/p/w500${mobile_poster}`;

  return (
    <div className="header_container">
      <div className="gg"></div>
      <ThemeBtn />
      <div className="img">
        <Image
          src={src}
          fill
          sizes="(max-width: 570px) 0vw, 100vw"
          alt="poster"
          priority={true}
        />
      </div>
      <div className="img2">
        <Image
          src={src2}
          fill
          sizes="(max-width: 570px) 100vw, 0vw"
          alt="poster"
          priority={true}
        />
      </div>

      <div className="poster_opts">
        <Link href={`/specific/movie/${media.id}`}>
          <div>
            <FaRegPlayCircle />
          </div>
        </Link>
        <div>
          <FaPlus />
        </div>
      </div>
    </div>
  );
};

export default Header;
