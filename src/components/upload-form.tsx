'use client';

import axios from 'axios';
import Image from 'next/image';
import React from 'react';

export const UploadForm = () => {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const res = await axios.postForm('/api/upload', { file });

    console.log(res?.data)
  };

  return (
    <label className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
      <input onChange={handleUpload} type="file" />
      <button className="flex">
        <Image
          className="dark:invert"
          src="/vercel.svg"
          alt="Vercel logomark"
          width={20}
          height={20}
        />
        Upload now
      </button>
    </label>
  );
};
