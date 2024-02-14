import { Actor } from '@/types';
import Image from 'next/image';
import '@/styles/cast.scss';
const Cast = ({ cast }: { cast: [Actor] }) => {
  return (
    <div className="cast_container">
      {cast?.map(({ profile_path, name, character }, index) => {
        let src = `https://image.tmdb.org/t/p/w185/${profile_path}`;

        if (!profile_path) {
          src = '/avatar.png';
          // return;
        }
        return (
          <div className="cast_element" key={index}>
            <div className="profile">
              <Image src={src} sizes="100%" fill alt="cast" />
            </div>
            <div className="details">
              <div className="name">{name}</div>
              <div className="role">{character}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cast;
