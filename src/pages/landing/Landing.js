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
import background from '../../../src/assets/images/background.png';

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
      <div
        className="bg-{background} relative md:h-[calc(100vh-6rem)] flex items-center justify-center"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto flex flex-col justify-center items-center -my-6">
          <section className="flex flex-col md:flex-row items-center justify-center">
            <div className="md:w-3/5 text-left flex flex-col">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-normal">
                IGNITE YOUR CREATIVITY, DESIGN
              </h1>
              <span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl rounded-xl px-2 my-2 text-secondary bg-white font-bold leading-normal w-fit">
                  UNFORGETTABLE
                </h1>
              </span>
              <span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-normal mb-6">
                  GATHERINGS
                </h1>
              </span>
              <p className="text-lg text-white mb-8">
                Discover the free Order Time Inventory tool! Seamlessly sync
                with QuickBooks, optimizing inventory control and marketplace
                links for smoother business expansion.
              </p>
              <div className="flex space-x-4">
                <Link
                  to={token ? '/dashboard' : '/auth/signup'}
                  className="bg-white rounded-xl p-4 text-secondary text-center font-semibold"
                >
                  {token ? 'Go to Dashboard' : 'Get Started'}
                </Link>
                <Link
                  to={'/explore'}
                  className="bg-none rounded-xl p-4 text-white text-center border-2 border-white font-semibold"
                >
                  Explore Events
                </Link>
              </div>
            </div>
            <div className="md:w-2/5 mt-12 md:mt-0 flex">
              <img
                src={Hero2}
                alt="Enterprise Software"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </section>
        </div>
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
          <div className="text-3xl md:text-5xl text-primary font-bold md:leading-normal tracking-wide">
            <h1>UNLOCK YOUR </h1>
            <h1 className=" bg-secondary rounded-xl px-2 inline-flex text-white">
              CREATIVE
            </h1>
            <h1 className="inline-flex">DRIVE</h1>
          </div>
          <hr className="w-full border border-neutral-200"></hr>
          <p className="text-md leading-relaxed md:max-w-[90%] py-4 text-black text-justify">
            Our platform empowers individual creators and artists like you to
            unleash your imagination and orchestrate unforgettable gatherings.
            Whether you're organizing a solo showcase, a live performance, or a
            collaborative workshop, our tools and features equip you to make
            your events a remarkable success.
          </p>
          <Link
            to={token ? 'Go to Dashboard' : '/auth/signup'}
            className="bg-secondary rounded-xl p-4 text-white text-center"
          >
            {token ? 'Go to Dashboard' : 'Get Started'}
          </Link>
        </div>
      </section>
      <div className="pb-10">
        <section className="flex flex-col lg:flex-row w-full items-center py-8 lg:pt-16 lg:pb-0 justify-between gap-4 md:gap-0 container">
          <div className="flex flex-row gap-16">
            <div className="flex-[80%] space-y-4">
              <p className="text-accent tracking-[1px] font-semibold  items-center gap-2 flex">
                <div className="w-20 h-1 bg-accent"></div> SECURE
              </p>
              <div className="text-3xl md:text-5xl text-black font-semibold md:leading-normal tracking-wide">
                <h1>
                  EFFORTLESS EVENT
                  <span className="inline-flex">
                    <span className="bg-secondary rounded-xl px-2 text-white">
                      PLANNING
                    </span>
                  </span>
                  AND COORDINATION
                </h1>
              </div>
            </div>
          </div>
          <p className="flex-[80%] w-full text-md leading-relaxed md:max-w-[90%] py-4 text-black text-justify">
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
            <hr className="w-20 h-1 bg-accent"></hr> REGISTRATIONS MADE EASY
          </p>
          <div className="text-3xl md:text-5xl text-primary font-semibold md:leading-normal tracking-wide">
            <h1 className="inline-flex">SAFETY AND </h1>
            <h1 className="inline-flex bg-secondary rounded-xl px-2 text-white">
              DEPENDABILITY
            </h1>
          </div>
          <hr className="w-full border border-neutral-200"></hr>
          <p className="text-md leading-relaxed md:max-w-[90%] py-4 text-black text-justify">
            Rest assured that your event information is safeguarded with our web
            application. We prioritize data security and implement
            industry-standard measures to protect your data. Our robust
            infrastructure ensures uninterrupted event management, allowing you
            to concentrate on creating exceptional experiences.
          </p>
          <Link
            to={token ? '/dashboard' : '/auth/signup'}
            className="bg-secondary rounded-xl px-6 p-4 text-white text-center"
          >
            {token ? 'Go to Dashboard' : 'Get Started'}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Landing;
