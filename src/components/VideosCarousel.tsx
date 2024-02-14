import '@/styles/videosCarousel.scss';

import Image from 'next/image';
import { getVideos } from '@/app/Actions';
import { FaRegPlayCircle } from 'react-icons/fa';
import Link from 'next/link';
const VideosCarousel = async ({
  id,
  listType,
  url,
}: {
  id: number;
  listType: string;
  url: string;
}) => {
  const videos = await getVideos(id, listType);
  return (
    <div className="videos_container">
      {videos?.map((video: any) => {
        return (
          <div className="video" key={video.key}>
            <Link
              href={{
                pathname: url,
                query: { videoId: video.key },
              }}
              scroll={false}
              // prefetch={true}
            >
              <div className="img">
                <Image
                  src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  alt={video.name}
                  fill
                  sizes="100%"
                />
                <div className="icon">
                  <FaRegPlayCircle className="main_icon" />
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default VideosCarousel;
