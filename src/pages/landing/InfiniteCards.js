import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import React, { useEffect, useState, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import {
  IoCreateOutline,
  IoNotificationsOutline,
  IoTicketOutline,
  IoPeopleOutline,
} from 'react-icons/io5';
import { MdOutlinePrivacyTip, MdOutlineFileDownload } from 'react-icons/md';

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current.appendChild(duplicatedItem);
      });

      setDirection();
      setSpeed();
      setStart(true);
    }
  }

  const setDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        '--animation-direction',
        direction === 'left' ? 'forwards' : 'reverse'
      );
    }
  };

  const setSpeed = () => {
    if (containerRef.current) {
      const speeds = {
        fast: '20s',
        normal: '40s',
        slow: '80s',
      };
      containerRef.current.style.setProperty(
        '--animation-duration',
        speeds[speed]
      );
    }
  };

  // Array of colors for the card backgrounds
  const colors = [
    'bg-blue-400',
    'bg-green-400',
    'bg-purple-400',
    'bg-yellow-400',
    'bg-red-400',
    'bg-indigo-400',
  ];

  return (
    <section className="w-full py-6 bg-white relative z-10">
      <div className="container mx-auto px-4">
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay]}
          className="h-full w-full flex justify-center items-center my-auto"
        >
          {items.map((item, idx) => (
            <SwiperSlide
              key={idx}
              className="flex justify-center mx-44 md:mx-0"
            >
              <Link
                to="#"
                key={idx}
                className={`flex flex-col w-60 h-80 rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 bg-indigo-700 p-6 group border border-gray-200 hover:shadow-xl px-8`}
              >
                <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-gradient-to-br from-purple-50 to-violet-100 flex items-center justify-center shadow-lg">
                  <div className="text-4xl text-black">{item.icon}</div>
                </div>
                <h3 className="mt-20 font-bold text-lg text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-100 text-sm">{item.description}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
