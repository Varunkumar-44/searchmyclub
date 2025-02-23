import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get(
          'https://search-my-club-backend.vercel.app/api/event'
        );
        const cleanedEvents = data
          .map(event => ({
            ...event,
            num_participants: Array.isArray(event.participants)
              ? event.participants.length
              : parseInt(event.num_participants, 10) || 0, // Handle array or number
          }))
          .sort((a, b) => b.num_participants - a.num_participants) // Sort by participants
          .slice(0, 5); // Get top 5 events
        setEvents(cleanedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchClubs = async () => {
      try {
        const { data } = await axios.get(
          'https://search-my-club-backend.vercel.app/api/club'
        );
        const cleanedClubs = data
          .map(club => ({
            ...club,
            num_participants: Array.isArray(club.participants)
              ? club.participants.length
              : parseInt(club.num_participants, 10) || 0, // Handle array or number
          }))
          .sort((a, b) => b.num_participants - a.num_participants) // Sort by participants
          .slice(0, 5); // Get top 5 clubs
        setClubs(cleanedClubs);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };

    fetchEvents();
    fetchClubs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {/* Events Table */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Top Events
          </h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-sm font-semibold text-gray-600">
                  Title
                </th>
                <th className="p-3 text-sm font-semibold text-gray-600">
                  Location
                </th>
                <th className="p-3 text-sm font-semibold text-gray-600">
                  Max Participants
                </th>
                <th className="p-3 text-sm font-semibold text-gray-600">
                  Privacy
                </th>
                <th className="p-3 text-sm font-semibold text-gray-600">
                  Participants
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr
                  key={index}
                  className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {event.title}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {event.location}
                  </td>
                  <td className="p-3 text-sm text-gray-700 text-center">
                    {event.max_participants}
                  </td>
                  <td className="p-3 text-sm text-gray-700 text-center">
                    {event.privacy}
                  </td>
                  <td className="p-3 text-sm text-gray-700 text-center">
                    {event.num_participants}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Clubs Table */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Top Clubs
          </h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="p-3 text-sm font-semibold text-gray-600">
                  Category
                </th>
                <th className="p-3 text-sm font-semibold text-gray-600">
                  Description
                </th>
                <th className="p-3 text-sm font-semibold text-gray-600">
                  Participants
                </th>
              </tr>
            </thead>
            <tbody>
              {clubs.map((club, index) => (
                <tr
                  key={index}
                  className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {club.name}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {club.category}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-normal">
                    {club.description}
                  </td>
                  <td className="p-3 text-sm text-gray-700 text-center">
                    {club.num_participants}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
