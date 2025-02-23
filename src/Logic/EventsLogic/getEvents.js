import { useState, useEffect, useCallback } from 'react';
import {
  useSearchParams,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { toast } from 'react-hot-toast';

function GetEventLogic() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  const filter = searchParams.get('filter');
  const [events, setEvents] = useState(null);
  const [eventCount, setEventCount] = useState(null);
  const [privateEvent, setPrivateEvent] = useState(null);
  const [publicEvent, setPublicEvent] = useState(null);
  const [offlineEvent, setOfflineEvent] = useState(null);
  const [onlineEvent, setOnlineEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const buildQuery = useCallback(() => {
    const userId = localStorage.getItem('token');
    if (filter === 'private' || filter === 'public')
      return { privacy: filter, createdBy: userId };
    if (filter === 'offline' || filter === 'online')
      return { medium: filter, createdBy: userId };
    return {
      createdBy: userId,
      filters: filter?.split(','),
    };
  }, [filter]);

  const getEvents = useCallback(async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('token');
      const query =
        filter === null || filter === 'total'
          ? { createdBy: userId }
          : buildQuery();

      const queryString = new URLSearchParams(query).toString();
      const response = await fetch(
        `https://search-my-club-backend.vercel.app/api/event?${queryString}`
      );
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || 'Failed to fetch events.');

      setEvents(data);
      setEventCount(data.length);
      setPrivateEvent(data.filter(event => event.privacy === 'Private'));
      setPublicEvent(data.filter(event => event.privacy === 'Public'));
      setOfflineEvent(data.filter(event => event.medium === 'In Person'));
      setOnlineEvent(data.filter(event => event.medium === 'Online'));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filter, buildQuery]);

  const getEventById = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://search-my-club-backend.vercel.app/api/event/${id}`
      );
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || 'Failed to fetch the event.');

      if (!pathname.includes('dashboard') && data.privacy === 'Private') {
        throw new Error('This event is private');
      }

      setEvents(data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      navigate(-1);
    } finally {
      setLoading(false);
    }
  }, [id, pathname, navigate]);

  useEffect(() => {
    if (id) getEventById();
    else getEvents();
  }, [getEvents, getEventById]);

  return {
    loading,
    error,
    events,
    eventCount,
    privateEvent,
    publicEvent,
    offlineEvent,
    onlineEvent,
    filter,
    id,
    setSearchParams,
    searchParams,
    getEvents,
  };
}

export default GetEventLogic;
