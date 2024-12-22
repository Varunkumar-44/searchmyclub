import React, { useEffect, useState, useCallback } from 'react';
import Loading from '../../components/Loading';
import { IoLocation } from 'react-icons/io5';
import { MdComputer } from 'react-icons/md';

function Rsvps() {
  const [events, setEvents] = useState([]);
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventId, setEventId] = useState(null);

  const userId = localStorage.getItem('token');

  // Fetch all events from the API
  const getAllEvents = useCallback(async () => {
    if (userId) {
      try {
        setLoading(true);
        const response = await fetch(
          'https://search-my-club-backend.vercel.app/api/event'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setEvents(data); // Store all events in the events state
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [userId]);

  // Filter events based on whether the user is in the participants list
  const getUserRsvps = useCallback(() => {
    if (userId && events.length > 0) {
      const filteredRsvps = events.filter(event =>
        event.participants?.includes(userId)
      );
      setRsvps(filteredRsvps); // Set filtered events
    }
  }, [events, userId]);

  useEffect(() => {
    if (userId) {
      getAllEvents(); // Fetch all events
    }
  }, [getAllEvents, userId]);

  useEffect(() => {
    getUserRsvps(); // Filter events after they are fetched
  }, [events, getUserRsvps]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="max-w-screen-xl mx-auto">
        {rsvps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rsvps.map(rsvp => (
              <div
                key={rsvp.event_id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105"
              >
                <div
                  className="relative h-48 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${rsvp.image || 'https://placehold.co/400x400'})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                </div>
                <div className="p-5">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {rsvp.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{rsvp.description}</p>
                  <div className="flex items-center mt-4 gap-3 text-gray-500">
                    {rsvp.medium === 'In Person' ? (
                      <IoLocation className="text-lg" />
                    ) : (
                      <MdComputer className="text-lg" />
                    )}
                    <p className="text-sm">{rsvp.location || 'Online'}</p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      <p>{new Date(rsvp.start_date).toLocaleString()}</p>
                      <p>{new Date(rsvp.end_date).toLocaleString()}</p>
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      {rsvp.participants.length} / {rsvp.max_participants}{' '}
                      Participants
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-neutral-500">
            You haven't RSVP'd to any events yet.
          </p>
        )}

        {/* Show details for the specific event if the user clicks on an event */}
        {eventId && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
            <h4 className="text-xl font-semibold">
              Users attending{' '}
              {rsvps.find(event => event.event_id === eventId)?.title}
            </h4>
            <p>Display list of users here...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rsvps;
