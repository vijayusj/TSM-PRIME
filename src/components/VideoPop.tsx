'use client';
import React from 'react';
import YouTubePlayer from 'react-player/youtube';
import { IoIosCloseCircle } from 'react-icons/io';

import '@/styles/videoPopUp.scss';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
const VideoPop = () => {
  const searchParams = useSearchParams();
  const videoId = searchParams.get('videoId');
  // console.log(videoId);

  const router = useRouter();

  const hidePopup = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    router.back();
  };
  return (
    <div className={`video_pop_up`} onClick={hidePopup}>
      <div className="media">
        <YouTubePlayer
          url={`https://www.youtube.com/embed/${videoId}`}
          playing={true}
          // light={true}
          width="100%"
          height="100%"
          controls={true}
        />
      </div>
      <div className="close">
        <IoIosCloseCircle onClick={hidePopup} />
      </div>
    </div>
  );
};

export default VideoPop;
