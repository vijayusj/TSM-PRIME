'use client';
import '@/styles/_navbar.scss';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MediaStore from '@/store/MediaStore';
import logo1 from '../../public/n1.png';
const Navbar = () => {
  const { setState, mediaType } = MediaStore();
  const pathname = usePathname();

  function reset(list: string) {
    if (mediaType === list) return;
    const initial_store = {
      initial: true,
      loading: true,
      page: 0,
      hasMore: false,
      MediaType: list,
      // total_pages: 0,
      media: [],
      url: '',
      back: false,
      genres: [],
      selectedGenresList: [],
      sortBy: {
        label: 'Sort By',
        value: '',
      },
    };

    setState(initial_store);
    // console.log('dd');
  }

  return (
    <div className="nav_container">
      <Link href="/" className="link_logo">
        <div className="logo">
          <Image src={logo1} alt="logo" fill sizes="100%" priority={true} />
        </div>
      </Link>
      <div className="opts">
        <Link
          href="/search"
          onClick={() => reset('search')}
          prefetch={true}
          className={pathname === '/search' ? 'active icon' : 'icon'}
        >
          <FaSearch />
        </Link>
        <Link
          href="/movies"
          onClick={() => reset('movie')}
          prefetch={true}
          className={pathname === '/movies' ? 'active' : ''}
        >
          Movies
        </Link>
        <Link
          href="/tv_shows"
          onClick={() => reset('tv')}
          prefetch={true}
          className={pathname === '/tv_shows' ? 'active' : ''}
        >
          TV Shows
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
