"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SpringModal } from "./Modal";

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

type SwipeCarouselProps = {
  data: string[];
};

export const SwipeCarousel: React.FC<SwipeCarouselProps> = ({ data }) => {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      setImgIndex((pv) => {
        if (pv === data.length - 1) {
          return 0;
        }
        return pv + 1;
      });
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, []);

  return (
    <div className="relative overflow-hidden py-5 bg-transparent">
      <motion.div
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        className="flex items-center cursor-pointer"
      >
        <Images data={data} imgIndex={imgIndex} />
      </motion.div>

      <Dots imgIndex={imgIndex} data={data} setImgIndex={setImgIndex} />
    </div>
  );
};

type ImagesProps = {
  data: string[];
  imgIndex: number;
};

const Images = ({ imgIndex, data }: ImagesProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(data[0]);

  const handleClick = (src: string) => {
    setSelectedImg(src);
    setIsOpen(true);
  };

  return (
    <>
      {data.map((imgSrc, idx) => {
        return (
          <motion.div
            key={idx}
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            animate={{
              scale: imgIndex === idx ? 0.95 : 0.85,
            }}
            onClick={() => handleClick(imgSrc)}
            transition={SPRING_OPTIONS}
            className="image aspect-video w-full min-h-[25rem] h-full shrink-0 rounded-lg object-contain"
          />
        );
      })}
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} coverWholeScreen>
        {selectedImg && (
          <div className="flex h-full">
            <img src={selectedImg} className="m-auto max-h-full" alt="idk" />
          </div>
        )}
      </SpringModal>
    </>
  );
};

const Dots = ({
  imgIndex,
  setImgIndex,
  data,
}: {
  imgIndex: number;
  data: string[];
  setImgIndex: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="mt-2 flex w-full justify-center gap-2">
      {data.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === imgIndex
                ? "bg-washed-teal dark:bg-neon-pink"
                : "bg-neutral-500"
            }`}
          />
        );
      })}
    </div>
  );
};
