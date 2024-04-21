import { useRef } from 'react';
import { Link } from 'react-router-dom';

import Marketing from '../../assets/images/marketing.png';
import Research from '../../assets/images/research.png';
import Development from '../../assets/images/dev.png';
import Ui from '../../assets/images/uiux.png';
import Card from '../../components/Card';
import Testimonial from '../../components/TestimonialCard';
import Hero from '../../assets/images/pattern1.jpg';
import { Navigation, Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {
  IoArrowBack,
  IoArrowDownCircleOutline,
  IoArrowForward,
  IoCreateOutline,
  IoNotificationsOutline,
  IoPeople,
  IoPeopleOutline,
  IoTicketOutline,
} from 'react-icons/io5';
import {
  MdManageHistory,
  MdOutlineFileDownload,
  MdOutlinePrivacyTip,
  MdRsvp,
} from 'react-icons/md';
import { RiMouseLine, RiSteamLine } from 'react-icons/ri';
import Hero2 from '../../assets/images/3187910.jpg';
import Security from '../../assets/images/security.jpg';
import { InfiniteMovingCards } from './InfiniteCards';

const data = [
  {
    title: 'Simplified Event Creation',
    description:
      'Effortlessly establish and manage events with our user-friendly event creation functionality. Define event specifics such as dates, times, locations, and descriptions to provide attendees with a clear understanding. Customize event configurations, incorporate event visuals, and establish ticketing choices with ease.',
    icon: <IoCreateOutline />,
  },
  {
    title: 'Real-Time Updates',
    description:
      'Stay informed about event developments with our real-time notification system. Receive alerts regarding event changes, attendee responses, and more. Never overlook crucial event information with our notification capability.',
    icon: <IoNotificationsOutline />,
  },
  {
    title: 'Effortless Participant Invitations',
    description:
      'Invite participants effortlessly by disseminating invitation links directly through our application. Share invitation links via email, messaging platforms, or social media channels. Ensure a smooth registration process and monitor attendee responses for effective event coordination.',
    icon: <IoTicketOutline />,
  },
  {
    title: 'Adaptable Event Privacy',
    description:
      'Exercise authority over event visibility with our selection of private and public event alternatives. Arrange private gatherings with restricted access for chosen invitees or arrange public events to engage a broader audience. Tailor privacy settings to accommodate the distinct requirements of each event.',
    icon: <MdOutlinePrivacyTip />,
  },
  {
    title: 'Simple Attendee Management',
    description:
      'Monitor attendees effortlessly with our comprehensive attendee management feature. Easily monitor and manage RSVPs, track attendance, and gather essential participant details. Utilize QR Codes to check-in attendees and ensure a seamless event experience for all participants.',
    icon: <IoPeopleOutline />,
  },
  {
    title: 'Attendee List Download',
    description:
      "In an era of uncertain connectivity, it's crucial to remain connected. Thus, SearchMyClub enables event hosts to download attendee lists for each event through our attendee list download feature. Export attendee lists in XLSX format for convenient access and management.",
    icon: <MdOutlineFileDownload />,
  },
];

function Landing() {
  const swiper = useSwiper();
  const swiperRef = useRef(null);

  const token = JSON.parse(localStorage.getItem('token'));

  return (
    <div className="flex-1 bg-white font-poppins select-none">
      <div className="bg-secondary relative">
        <div className="absolute inset-0 bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
        <section className="flex flex-col text-center w-full items-center py-8 lg:py-16 justify-center gap-8 md:gap-0 container min-h-[75vh] relative">
          <div
            className="flex flex-col gap-4 items-center justify-center z-10"
            style={{ flexBasis: '50%' }}
          >
            <h1 className=" text-xl md:text-4xl lg:text-6xl text-slate-100 font-bold leading-relaxed lg:leading-normal drop-shadow-2xl">
              Ignite Your Creativity
              <br />
              Design Unforgettable Gatherings
            </h1>
            <p className=" md:max-w-[90%] py-2 text-lg text-slate-400">with</p>
            <h1 className=" text-2xl md:text-4xl lg:text-6xl text-slate-100 font-bold leading-relaxed lg:leading-normal drop-shadow-2xl">
              SearchMyClub
            </h1>
            <p className=" md:max-w-[90%] py-4 text-slate-400">
              Effortless RSVP and Coordination for Creators
            </p>
            <div className="inline-flex items-center gap-2">
              <Link
                to={token ? '/dashboard' : '/auth/signup'}
                className="bg-gradient-to-b shadow-xl focus:ring-accent from-accent to-accent/90 rounded-full p-4 text-white text-center"
              >
                {token ? 'Go to Dashboard' : 'Get Started'}
              </Link>
              <Link
                to={'/explore'}
                className="bg-gradient-to-r shadow-xl from-primary to-primary/90 rounded-full p-4 text-white text-center"
              >
                Explore Events
              </Link>
            </div>
          </div>
          <div className=" w-full relative"></div>
        </section>
      </div>
      <section className="flex flex-col-reverse  lg:flex-row w-full py-8 md:py-16 justify-between gap-8 md:gap-0 container">
        <div className="md:pt-16 " style={{ flexBasis: '50%' }}>
          <img className="w-full" src={Hero2} />
        </div>
        <div
          className="flex flex-col gap-4 items-start justify-evenly text-left py-8 lg:pl-16"
          style={{ flexBasis: '50%' }}
        >
          <p className="text-accent tracking-[1px] font-semibold items-center gap-2 flex">
            <hr className="w-20 h-1 bg-accent"></hr>
          </p>
          <h1 className="text-3xl md:text-5xl text-primary font-semibold md:leading-normal">
            Unlock Your Creative Drive
          </h1>
          <hr className="w-full border border-neutral-200"></hr>
          <p className="text-sm leading-[1.4rem] md:max-w-[90%] py-4 text-neutral-500 text-justify">
            Our platform empowers individual creators and artists like you to
            unleash your imagination and orchestrate unforgettable gatherings.
            Whether you're organizing a solo showcase, a live performance, or a
            collaborative workshop, our tools and features equip you to make
            your events a remarkable success.
          </p>
          <Link
            to={token ? 'Go to Dashboard' : '/auth/signup'}
            className="bg-accent rounded-full p-4 text-white text-center"
          >
            {token ? 'Go to Dashboard' : 'Get Started'}
          </Link>
        </div>
      </section>
      <div className="bg-gradient-to-b from-secondary from-100% to-50% to-white pb-10">
        <section className="flex flex-col lg:flex-row w-full items-center py-8 lg:pt-16 lg:pb-0 justify-between gap-4 md:gap-0 container">
          <div className="flex flex-row gap-16">
            <div className="flex-[80%] space-y-4">
              <p className="text-accent tracking-[1px] font-semibold  items-center gap-2 flex">
                <div className="w-20 h-1 bg-accent"></div> Secure
              </p>
              <h1 className="text-3xl md:text-5xl text-white font-semibold md:leading-normal">
                Effortless Event Planning and Coordination
              </h1>
            </div>
          </div>
          <p className="flex-[80%] w-full text-sm leading-[1.4rem] md:max-w-[90%] py-4 text-white text-justify">
            Bid farewell to the complexities of event organization. Our
            intuitive interface simplifies the process, enabling you to
            concentrate on your artistic pursuits. Seamlessly create and oversee
            events, from scheduling dates and venues to furnishing event details
            and ticketing options. Streamline your planning journey and
            transform your vision into reality.
          </p>
        </section>
        <div className="flex flex-row gap-4 py-4 items-center justify-between container">
          <hr className="w-full  border border-neutral-200 opacity-30"></hr>
        </div>
        <div className="w-full h-full rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards items={data} direction="left" speed="slow" />
        </div>
      </div>
      <section className="flex flex-col-reverse lg:flex-row-reverse w-full py-8 md:py-16 justify-between gap-8 md:gap-0 container">
        <div className="" style={{ flexBasis: '50%' }}>
          <img className="w-full" src={Security} />
        </div>
        <div
          className="flex flex-col gap-4 items-start justify-evenly text-left py-8 lg:pr-16"
          style={{ flexBasis: '50%' }}
        >
          <p className="text-accent tracking-[1px] font-semibold items-center gap-2 flex">
            <hr className="w-20 h-1 bg-accent"></hr> Registrations Made Easy
          </p>
          <h1 className="text-3xl md:text-5xl text-primary font-semibold md:leading-normal">
            Safety and Dependability
          </h1>
          <hr className="w-full border border-neutral-200"></hr>
          <p className="text-sm leading-[1.4rem] md:max-w-[90%] py-4 text-neutral-500 text-justify">
            Rest assured that your event information is safeguarded with our web
            application. We prioritize data security and implement
            industry-standard measures to protect your data. Our robust
            infrastructure ensures uninterrupted event management, allowing you
            to concentrate on creating exceptional experiences.
          </p>
          <Link
            to={token ? '/dashboard' : '/auth/signup'}
            className="bg-gradient-to-r from-primary to-primary rounded-full px-6 p-4 text-white text-center"
          >
            {token ? 'Go to Dashboard' : 'Get Started'}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Landing;
