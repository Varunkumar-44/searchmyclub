import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { IoPeopleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' or 'following'
  const [followedClubs, setFollowedClubs] = useState([]);

  const userId = localStorage.getItem('token');

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch(
          'https://search-my-club-backend.vercel.app/api/club'
        );
        if (!response.ok) throw new Error('Failed to fetch clubs');
        const data = await response.json();
        setClubs(data || []); // Ensure data.clubs is used if wrapped
      } catch (err) {
        setError('Failed to load clubs');
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const handleFollow = async clubId => {
    try {
      const club = clubs.find(club => club._id === clubId);
      if (!club) throw new Error('Club not found');

      const updatedMembers = [...club.members, userId];
      const response = await fetch(
        `https://search-my-club-backend.vercel.app/api/club/${clubId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ members: updatedMembers }),
        }
      );

      if (!response.ok) throw new Error('Failed to follow club');

      setClubs(
        clubs.map(club =>
          club._id === clubId ? { ...club, members: updatedMembers } : club
        )
      );

      setFollowedClubs([...followedClubs, clubId]);
      toast.success('Followed club successfully');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filteredClubs =
    filter === 'following'
      ? clubs.filter(club => followedClubs.includes(club._id))
      : clubs;

  if (loading) return <Loading />;

  return (
    <div>
      {error && <p>{error}</p>}
      <div className="flex justify-end mb-4">
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All Clubs</option>
          <option value="following">Following</option>
        </select>
      </div>
      {filteredClubs.length > 0 ? (
        <div className="flex w-full flex-col py-6 group">
          {filteredClubs.map(club => (
            <div
              key={club._id}
              className="flex py-4 justify-between border-b border-neutral-300 group gap-2 items-center"
            >
              <Link
                to={`/club/${club.club_id}`}
                className="font-semibold cursor-pointer"
              >
                <h3 className="font-semibold cursor-pointer">{club.name}</h3>
              </Link>
              <button className="sidebar-link ml-auto flex gap-2 items-center text-neutral-500 my-0">
                <IoPeopleOutline />
                <p>{club.members?.length || 0} Member(s)</p>
              </button>
              {!followedClubs.includes(club._id) ? (
                <button
                  onClick={() => handleFollow(club._id)}
                  className="primary-btn ml-4"
                >
                  Follow
                </button>
              ) : (
                <button
                  disabled
                  className="primary-btn ml-4 bg-gray-500 cursor-not-allowed"
                >
                  Following
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-neutral-500">You don't have any Clubs yet</p>
      )}
    </div>
  );
}

export default Clubs;
