import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import BackBtn from '../../components/BackBtn';

function ClubDetails() {
  const { id } = useParams(); // Get club ID from the URL
  const [club, setClub] = useState(null);
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        setLoading(true);
        // Fetch club details
        const clubResponse = await fetch(
          `https://search-my-club-backend.vercel.app/api/club/${id}`
        );

        if (!clubResponse.ok) {
          throw new Error('Failed to fetch club details');
        }

        const clubData = await clubResponse.json();
        setClub(clubData);

        // Fetch creator details
        const creatorResponse = await fetch(
          `https://search-my-club-backend.vercel.app/api/user/${clubData.user_id}`,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTczMjYwMjQzNCwiaWF0IjoxNzMyNjAyNDM0fQ.pAERuB5jEl8GzuED6Z9nYEEhfi52GO80mKIwAAyv5D0', // Use the JWT_Key here
            },
          }
        );

        if (!creatorResponse.ok) {
          throw new Error('Failed to fetch creator details');
        }

        const creatorData = await creatorResponse.json();
        setCreator(creatorData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClubDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="w-full h-screen bg-white rounded-lg shadow-lg p-6">
        <BackBtn to={'/dashboard/clubs'} />
        {/* Club Details Card */}
        <div className="border-b py-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{club.name}</h1>
          <p className="text-gray-600">
            <strong>Description:</strong> {club.description}
          </p>
          <p className="text-gray-600">
            <strong>Category:</strong> {club.category}
          </p>
          <p className="text-gray-600">
            <strong>Created At:</strong>{' '}
            {new Date(club.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Creator Card */}
        {creator && (
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Created By
            </h2>
            <div className="flex items-center">
              <img
                src={creator.profile_picture || '/default-avatar.png'}
                alt="Creator Avatar"
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <p className="text-gray-800 font-bold">{creator.name}</p>
                <p className="text-gray-600 text-sm">{creator.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Members Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Members</h2>
          {club.members.length > 0 ? (
            <ul className="list-disc pl-6 mt-2 text-gray-700">
              {club.members.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mt-2">No members yet.</p>
          )}
        </div>

        {/* Events Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Events</h2>
          {club.events.length > 0 ? (
            <ul className="list-disc pl-6 mt-2 text-gray-700">
              {club.events.map((event, index) => (
                <li key={index}>{event}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mt-2">No events yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClubDetails;
