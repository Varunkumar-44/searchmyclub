import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoLocation, IoPeopleOutline, IoWalletOutline } from 'react-icons/io5';
import { MdComputer } from 'react-icons/md';
import Border from '../assets/images/eventCard.png';
import Loading from '../components/Loading';
import { toast } from 'react-hot-toast';

const EventDetails = () => {
  const { id } = useParams(); // Event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // Replace this with your API call to fetch the event by ID
        const response = await fetch(`/api/event/${id}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        toast.error('Failed to fetch event details');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <Loading />;
  if (!event)
    return <p className="text-center text-gray-500">Event not found</p>;

  const {
    title,
    description,
    category,
    image,
    location,
    medium,
    start_date,
    end_date,
    price,
    maxParticipants,
    participants,
  } = event;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white overflow-hidden text-black p-4 rounded-[18px] shadow-md">
        {/* Event Banner */}
        <div className="relative">
          <img
            alt={title}
            className="w-full rounded-[18px] h-64 object-cover"
            src={image}
          />
          {/* Category Badge */}
          <div className="absolute left-0 top-0">
            <p className="bg-white p-2 px-4 rounded-tl-[8px] rounded-br-[18px]">
              {category}
            </p>
            <img alt="" className="w-4 h-4 object-cover" src={Border} />
          </div>
          {/* Medium Badge */}
          <div className="absolute right-0 bottom-0">
            <p className="bg-white p-2 px-4 rounded-tl-[18px] rounded-br-[12px] inline-flex items-center gap-1">
              {medium === 'offline' ? <IoLocation /> : <MdComputer />}
            </p>
          </div>
        </div>

        {/* Event Details */}
        <div className="p-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-neutral-600 py-4">{description}</p>

          {/* Event Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              {medium === 'offline' && (
                <p className="flex items-center gap-2 text-lg">
                  <IoLocation /> Location: {location[0]}
                </p>
              )}
              {medium === 'online' && (
                <p className="flex items-center gap-2 text-lg">
                  <MdComputer /> Online Event
                </p>
              )}
              <p className="flex items-center gap-2 text-lg">
                <IoWalletOutline /> Price: {price > 0 ? `₹${price}` : 'Free'}
              </p>
              <p className="flex items-center gap-2 text-lg">
                <IoPeopleOutline /> Participants: {participants?.length || 0}
                {maxParticipants ? ` / ${maxParticipants}` : ''}
              </p>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <p className="flex flex-col gap-1">
                <span className="font-bold">Start Date & Time:</span>
                <span>
                  {new Date(start_date).toDateString()} -{' '}
                  {new Date(start_date).toLocaleTimeString()}
                </span>
              </p>
              <p className="flex flex-col gap-1">
                <span className="font-bold">End Date & Time:</span>
                <span>
                  {new Date(end_date).toDateString()} -{' '}
                  {new Date(end_date).toLocaleTimeString()}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Events Link */}
      <div className="text-center mt-4">
        <Link
          to="/dashboard/events"
          className="text-indigo-600 hover:underline"
        >
          &larr; Back to Events
        </Link>
      </div>
    </div>
  );
};

export default EventDetails;
