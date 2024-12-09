import Border from '../assets/images/eventCard.png';
import { IoLocation } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { MdComputer } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const EventCard = ({
  event: {
    title,
    description,
    category,
    image,
    location,
    event_id,
    medium,
    start_date,
    end_date,
    participants = [],
    max_participants,
  },
}) => {
  const [eventParticipants, setEventParticipants] = useState(participants);
  const userId = localStorage.getItem('token'); // Assuming the user ID is stored in localStorage

  const handleRSVP = async () => {
    // Check if the user is already RSVP'd
    if (eventParticipants.includes(userId)) {
      toast.error('You have already RSVP’d for this event!');
      return;
    }

    // Check if the event has reached the maximum number of participants
    if (eventParticipants.length >= max_participants) {
      toast.error('The event has reached maximum capacity.');
      return;
    }

    try {
      // Update the participants list
      const updatedParticipants = [...eventParticipants, userId];

      // Create the updated event object with new participants
      const updatedEventData = {
        ...{
          // Spread the current event data to avoid using `event`
          title,
          description,
          category,
          image,
          location,
          event_id,
          medium,
          start_date,
          end_date,
          participants: updatedParticipants,
          max_participants,
        },
      };

      // Send the entire updated event object in the request
      const response = await fetch(
        `https://search-my-club-backend.vercel.app/api/event/${event_id}`,
        {
          method: 'PATCH', // Use OPTIONS request
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedEventData), // Pass the entire updated event object
        }
      );

      if (!response.ok) {
        throw new Error('Failed to RSVP for the event');
      }

      // Update the local event data with the new participants
      setEventParticipants(updatedParticipants); // Update the state with the new participants
      toast.success('RSVP Successful');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="bg-white overflow-hidden text-black p-2 rounded-[18px] mr-2 outline outline-1 outline-neutral-100 shadow-sm hover:shadow-lg transition-all">
      <Link to={`/dashboard/event/${event_id}`} className="block">
        <div className="relative">
          <img
            alt="event"
            className="w-full rounded-[18px] h-48 object-cover"
            src={image}
          />
          <div className="w-max absolute left-0 top-0 flex flex-row justify-between">
            <div>
              <p className="bg-white p-2 px-4 rounded-tl-[8px] rounded-br-[18px]">
                {category}
              </p>
              <img alt="" className="w-4 h-4 object-cover" src={Border} />
            </div>
            <img alt="" className="w-4 h-4 object-cover" src={Border} />
          </div>
          <div className="w-max absolute right-0 bottom-0 flex flex-row items-end justify-end">
            <img
              alt=""
              className="w-4 h-4 object-cover rotate-180"
              src={Border}
            />
            <div className="flex flex-col items-end">
              <img
                alt=""
                className="w-4 h-4 object-cover rotate-180"
                src={Border}
              />
              <p className="bg-white p-2 px-4 rounded-tl-[18px] rounded-br-[12px] inline-flex items-center gap-1">
                {medium === 'offline' ? <IoLocation /> : <MdComputer />}
              </p>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 p-2">
        <div className="flex flex-col items-start md:max-w-[75%] lg:max-w-[78%] xl:max-w-[80%]">
          <p className="text-xl font-bold">{title}</p>
          <p className="text-xs text-neutral-600 line-clamp-5 pt-2">
            {description}
          </p>
        </div>
        <div className="flex md:flex-col gap-2 items-center md:items-end h-full justify-evenly">
          <p>
            {new Date(start_date?.split('+')[0]).toTimeString().slice(0, 5)}
          </p>
          <p className="text-xs text-neutral-600">
            {new Date(start_date?.split('+')[0]).toDateString().slice(4)}
          </p>
          <hr className="w-[1px] h-full md:w-full md:h-[1px]" />
          <p>{new Date(end_date?.split('+')[0]).toTimeString().slice(0, 5)}</p>
          <p className="text-xs text-neutral-600">
            {new Date(end_date?.split('+')[0]).toDateString().slice(4)}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 px-2">
        <p className="text-sm text-neutral-600">
          {eventParticipants.length} / {max_participants} Participants
        </p>
        {eventParticipants.includes(userId) ? (
          <button
            disabled
            className="bg-gray-500 text-white py-2 px-4 rounded cursor-not-allowed"
          >
            RSVP’d
          </button>
        ) : (
          <button
            onClick={handleRSVP}
            disabled={eventParticipants.length >= max_participants}
            className={`${
              eventParticipants.length >= max_participants
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white py-2 px-4 rounded transition-all`}
          >
            RSVP Now
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
