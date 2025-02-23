import React, { useEffect, useState } from 'react';
import GetEventLogic from '../../Logic/EventsLogic/getEvents';
import { Link } from 'react-router-dom';
import { MdComputer, MdDelete, MdEdit } from 'react-icons/md';
import { ColorExtractor } from 'react-color-extractor';

import {
  IoCopy,
  IoLocation,
  IoPeopleOutline,
  IoPersonOutline,
  IoWalletOutline,
} from 'react-icons/io5';

import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import GetUsersLogic from '../../Logic/UserLogic.js/GetUsers.logic';
import UserList from '../../components/UserList';

function calculateLightness(rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  return (max + min) / 2;
}

function compareLightness(color1, color2) {
  const lightness1 = calculateLightness(color1);
  const lightness2 = calculateLightness(color2);

  if (lightness1 < lightness2) {
    return 1;
  } else if (lightness1 > lightness2) {
    return -1;
  } else {
    return 0;
  }
}

function Event() {
  const { loading, error, events, id } = GetEventLogic();

  const {
    users,
    toggleShowUsers,
    showUsers,
    loading: fetchingUsers,
  } = GetUsersLogic();

  const [colors, setColors] = useState([]);

  const navigate = useNavigate();

  const deleteEvent = async () => {
    try {
      // Fetch the user details
      const token = localStorage.getItem('token'); // Assuming token is stored in local storage
      const userResponse = await fetch(
        `https://search-my-club-backend.vercel.app/api/user/${token}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user details');
      }

      const userData = await userResponse.json();

      // Check if the user has the admin role
      if (userData.role !== 'admin') {
        toast.error('You do not have permission to delete this event');
        return;
      }

      // Proceed to delete the event
      const response = await fetch(
        `https://search-my-club-backend.vercel.app/api/event/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      toast.success('Event deleted successfully');
      navigate('/dashboard/events?filter=total');
    } catch (error) {
      toast.error(error.message || 'Error deleting event');
    }
  };

  const copyTeamId = e => {
    e?.preventDefault();
    navigator.clipboard.writeText(events?.event_id);
    toast.success('Invitation ID copied to clipboard');
  };

  const deleteEventToast = e => {
    e?.preventDefault();
    toast.custom(t => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-[18px] overflow-hidden pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Are you sure you want to delete this event?
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Once you delete this event, it cannot be recovered.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col border-l border-gray-200">
          <button
            onClick={async () => {
              await deleteEvent();
              toast.dismiss(t.id);
            }}
            className="w-full border border-transparent rounded-none p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white focus:outline-none"
          >
            Delete
          </button>
          <button
            onClick={async e => {
              e?.preventDefault();
              toast.dismiss(t.id);
            }}
            className="w-full border border-transparent rounded-none border-t border-neutral-300 p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:bg-indigo-500 hover:text-white focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    // This subscription logic was tied to Appwrite. Since it's removed, we no longer need it.
    // Here you can implement any needed real-time updates or polling if required.
  }, []);

  if (loading) return <Loading />;

  if (error) return <p>{error}</p>;

  return (
    !loading &&
    events && (
      <div
        className="w-full grid md:grid-cols-4 lg:grid-cols-5 gap-4"
        style={{
          color: `rgb(${colors[5]?.join(',')})`,
        }}
      >
        <section
          className={`py-4 ${
            showUsers
              ? 'md:col-span-3 lg:col-span-4'
              : 'md:col-span-4 lg:col-span-5'
          } grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all`}
        >
          <div className="relative h-full lg:col-span-2">
            <div className="absolute top-4 left-4 inline-flex gap-2 flex-wrap">
              {/* <Link
                to={`/dashboard/create?id=${events?.event_id}`}
                className="shadow-md primary-btn group overflow-hidden transition-all"
                style={{
                  background: `rgb(${colors[4]?.join(',')})`,
                }}
              >
                <MdEdit />
                <p className="transition-all translate-x-[0px] hidden lg:block group-hover:translate-x-0">
                  Edit Event
                </p>
              </Link> */}
              <button
                onClick={deleteEventToast}
                className="shadow-md primary-btn group overflow-hidden transition-all"
                style={{
                  background: `rgb(${colors[4]?.join(',')})`,
                }}
              >
                <MdDelete />
                <p className="transition-all translate-x-[0px] hidden lg:block group-hover:translate-x-0">
                  Delete Event
                </p>
              </button>
              <button
                onClick={copyTeamId}
                className="shadow-md primary-btn group overflow-hidden transition-all"
                style={{
                  background: `rgb(${colors[4]?.join(',')})`,
                }}
              >
                <IoCopy />
                <p className="transition-all translate-x-[0px] hidden lg:block group-hover:translate-x-0">
                  Copy Invite ID
                </p>
              </button>
              <button
                onClick={toggleShowUsers}
                className="shadow-md primary-btn group overflow-hidden transition-all"
                style={{
                  background: `rgb(${colors[4]?.join(',')})`,
                }}
              >
                <IoPeopleOutline />
                <p className="transition-all translate-x-[0px] hidden lg:block group-hover:translate-x-0">
                  Invite Users
                </p>
              </button>
            </div>
            <ColorExtractor
              rgb
              getColors={colors =>
                setColors(prev => colors?.sort(compareLightness))
              }
            >
              <img
                alt="event"
                className="h-full max-h-[65vh] rounded-[18px] object-cover w-full object-center"
                src={events?.image}
              />
            </ColorExtractor>
          </div>

          <div
            className="p-2 py-3 rounded-[18px] overflow-auto max-h-[65vh] space-y-4"
            style={{
              backgroundColor: `rgb(${colors[4]?.join(',')})`,
            }}
          >
            <div
              className="p-4 flex flex-col gap-4"
              style={{
                color: `rgb(${colors[0]?.join(',')})`,
              }}
            >
              {events?.medium === 'In Person' && (
                <>
                  <iframe
                    title="map"
                    className="w-full h-max outline outline-1 outline-neutral-300 shadow-md rounded-[18px]"
                    src={`https://maps.google.com/maps?q=${events.latitude},${events.longitude}&hl=en&output=embed`}
                  ></iframe>
                  <h2 className="text-base inline-flex items-center gap-2">
                    <IoLocation /> {events?.location}
                  </h2>
                </>
              )}
              {events?.medium === 'Online' && (
                <h2 className="text-lg inline-flex items-center gap-2">
                  <MdComputer /> Online
                </h2>
              )}
              <h2 className="text-lg inline-flex items-center gap-2">
                <IoWalletOutline />{' '}
                {events?.price > 0 ? `Rs. ${events?.price}` : 'Free'}
              </h2>
              <h2
                onClick={toggleShowUsers}
                className="text-lg inline-flex items-center gap-2 cursor-pointer"
              >
                <IoPersonOutline />{' '}
                {events?.participants?.length > 0
                  ? `${events.participants.length} Participant(s)`
                  : 'No participants'}
              </h2>
              <h2 className="text-lg inline-flex items-center gap-2 cursor-pointer">
                <IoPeopleOutline />{' '}
                {events?.max_participants
                  ? `Max Limit of ${events.max_participants} members`
                  : 'No max participation limit'}
              </h2>
            </div>
          </div>
          <div
            className="col-span-3 p-4 rounded-[18px]"
            style={{
              backgroundColor: `rgb(${colors[0]?.join(',')})`,
            }}
          >
            <h2 className="text-3xl font-bold">{events?.title}</h2>
            <pre className="display-linebreak text-sm text-neutral-600 py-4">
              {events?.description}
            </pre>
          </div>
        </section>
        {showUsers && (
          <UserList
            toggleShowUsers={toggleShowUsers}
            users={users}
            fetchingUsers={fetchingUsers}
            createMembership={null} // Adjusted as membership logic might need review with new API
            id={id}
            events={events}
            checkMembership={null} // Adjusted as membership logic might need review with new API
            colors={colors}
          />
        )}
      </div>
    )
  );
}

export default Event;
