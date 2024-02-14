'use client';
import React from 'react';
import { useEffect } from 'react';
import MediaStore from '@/store/MediaStore';
const Back = ({ list }: { list: string }) => {
  const { setState } = MediaStore();
  useEffect(() => {
    function init() {
      const newState = {
        back: true,
      };
      setState(newState);
    }
    init();
    if (list !== 'home') {
      window.scrollTo({ top: 0 });
    }
  }, []);
  return <div></div>;
};

export default Back;
