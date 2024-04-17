import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Brand from './Brand';
import { footerLinks } from '../static/footerLinks';

function Footer() {
  return (
    <div className="flex flex-col gap-4 md:gap-8 py-12 bg-secondary text-neutral-200 font-poppins border-t border-neutral-400">
      <div className="w-full flex flex-row items-start uppercase gap-4 justify-center container">
        <div className="flex items-center gap-2">
          <Brand />
          {/* <p className='font-medium capitalize text-md '>Subtitle Lorem Ipsum!</p> */}
        </div>
      </div>
      <ul className="md:w-full flex flex-row flex-wrap items-center justify-center gap-4">
        {footerLinks.map((link, index) => (
          <li className="border flex items-center justify-center rounded-full p-2 text-2xl hover:scale-125 transition-all">
            <Link
              className=""
              rel="noopener noreferrer"
              target={'_blank'}
              to={link.link}
              title={link.title}
            >
              {link.icon}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <p className="text-neutral-300 text-xs md:text-sm text-center">
          &copy; SearchMyClub {new Date().getFullYear()} | All rights reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
