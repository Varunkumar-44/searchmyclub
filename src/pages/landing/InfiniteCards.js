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
        'scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
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
            className="flex w-96 flex-col rounded-lg bg-white backdrop-blur-xl shadow-lg shadow-accent/20 gap-4 items-start justify-center p-6 group text-secondary outline outline-1 outline-neutral-100/40 hover:scale-105 transition-all"
          >
            <div className="text-5xl">{item.icon}</div>
            <h3 className="font-bold text-xl">{item.title}</h3>
            <p className="text-slate-600 text-sm">{item.description}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
};
