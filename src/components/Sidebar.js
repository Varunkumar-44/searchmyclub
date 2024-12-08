import React, { useCallback, useEffect } from 'react';
import {
  IoCalendarClearOutline,
  IoHomeOutline,
  IoLogOutOutline,
  IoNotificationsOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoTicketOutline,
} from 'react-icons/io5';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import LogoutLogic from '../Logic/UserLogic.js/Logout.logic';
import { useNotifications } from '../context/notificationContext';
import Brand from './Brand';
import { useUser } from '../context/userContext';

function Sidebar() {
  const { logout } = LogoutLogic();
  // const [userInfo, setUserInfo] = useState(null);

  const { userInfo, setUserInfo } = useUser();

  const { toggleNotificationBar, unreadNotifications } = useNotifications();
  const navigate = useNavigate();

  const getUserInfo = useCallback(async () => {
    try {
      const response = await fetch(
        `https://search-my-club-backend.vercel.app/api/user/${localStorage.getItem('token')}`,
        {
          headers: {
            Authorization: `Bearer YOUR_JWT_TOKEN_HERE`, // Replace with your actual token logic
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch user info: ${response.statusText}`);
      }

      const userData = await response.json();

      if (!userData || !userData.name) {
        throw new Error('Invalid user data received');
      }

      // Set user info in the state and localStorage
      setUserInfo(userData);
      localStorage.setItem('spotlight-user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error fetching user info:', error.message);
      localStorage.removeItem('spotlight-user');
      localStorage.removeItem('token');
      navigate('/');
    }
  }, [setUserInfo, navigate]);

  // const creatorResponse = await fetch(
  //   `https://search-my-club-backend.vercel.app/api/user/${clubData.user_id}`,
  //   {
  //     headers: {
  //       Authorization:
  //         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTczMjYwMjQzNCwiaWF0IjoxNzMyNjAyNDM0fQ.pAERuB5jEl8GzuED6Z9nYEEhfi52GO80mKIwAAyv5D0', // Use the JWT_Key here
  //     },
  //   }
  // );

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return (
    <div className="flex flex-col p-4 border-r border-neutral-200 gap-2 ">
      <div className="sidebar-link hover:bg-transparent hover:shadow-none w-max">
        <Brand />
      </div>
      <Link className="sidebar-link" to="/dashboard/">
        <IoHomeOutline /> Home
      </Link>
      <NavLink className="sidebar-link" to="/dashboard/events?filter=total">
        <IoCalendarClearOutline /> Events
      </NavLink>
      <NavLink className="sidebar-link" to="/dashboard/clubs">
        <IoTicketOutline /> Clubs
      </NavLink>
      <NavLink className="sidebar-link" to="/dashboard/rsvp">
        <IoPeopleOutline /> RSVPs
      </NavLink>
      <button className="sidebar-link" onClick={toggleNotificationBar}>
        <div className="relative">
          <IoNotificationsOutline />
          {unreadNotifications > 0 && (
            <p className="absolute -top-3 p-2 aspect-square -right-2 bg-primary text-white rounded-full text-[10px] text-center w-2 h-2 flex items-center justify-center">
              <span className="w-max h-max">
                {unreadNotifications > 9 ? `9+` : unreadNotifications}
              </span>
            </p>
          )}
        </div>
        Notifications
      </button>
      <div className="mt-auto flex flex-col">
        <NavLink
          title={userInfo?.email}
          className="sidebar-link inline-flex items-center gap-1"
          to="account"
        >
          {userInfo ? (
            <>
              <IoPersonOutline /> {userInfo.name}
            </>
          ) : (
            'Account'
          )}
        </NavLink>
        <button className="sidebar-link" onClick={logout}>
          <IoLogOutOutline /> Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
