import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import React, { useEffect, useState, useRef } from 'react';

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        '--animation-direction',
        direction === 'left' ? 'forwards' : 'reverse'
      );
    }
  };

  const getSpeed = () => {
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

  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20 max-w-6xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex min-w-full shrink-0 gap-8 py-4 w-max flex-nowrap',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.map((item, idx) => (
          <Link
            to={item.link}
            key={idx}
            className="flex w-96 flex-col rounded-lg bg-white backdrop-blur-xl shadow-lg shadow-accent/20 gap-4 items-start justify-center p-6 group text-secondary outline outline-1 outline-neutral-100/40 hover:scale-105 transition-all border-2 border-blue-300 hover:bg-custom-gradient"
          >
            <div className="text-5xl bg-secondary rounded-full text-white p-2">
              {item.icon}
            </div>
            <h3 className="mt-4 font-semibold text-gray-900">{item.title}</h3>
            <p className="text-gray-900 text-sm mt-2 leading-relaxed">
              {item.description}
            </p>
          </Link>
        ))}
      </ul>
    </div>
    // <div className="flex justify-center space-x-4 p-8 ">
    //   <div className="bg-white shadow-md rounded-2xl p-6 text-left w-60 hover:bg-custom-gradient hover:transition-transform duration-500 ease-in-out transform scale-100 group-hover:scale-105 border-2 border-blue-300">
    //     <div className="bg-secondary rounded-full w-12 h-12 flex items-center justify-center">
    //       <svg
    //         className="w-6 h-6 text-white"
    //         fill="none"
    //         stroke="currentColor"
    //         viewBox="0 0 24 24"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           strokeWidth={2}
    //           d="M5.121 19.428l2.828-2.829m4.95-4.95l2.829-2.829m4.243-4.243a6 6 0 00-8.485 8.485l-2.829 2.829a2 2 0 002.829 2.829l2.828-2.828m2.829-2.829l2.828-2.829"
    //         />
    //       </svg>
    //     </div>
    //     <h3 className="mt-4 font-semibold text-gray-900">Manufactures</h3>
    //     <p className="text-gray-600 mt-2">
    //       Manufacturers play a pivotal role in the production and creation of
    //       goods.
    //     </p>
    //   </div>
    // </div>
  );
};
