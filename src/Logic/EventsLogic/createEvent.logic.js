import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import { categories } from './categories';

function CreateEventLogic() {
  const [validateMessage, setValidateMessage] = useState(null);
  const [signingin, setSigningin] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [userId, setUserId] = useState(null);

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState(null);
  const [language, setLanguage] = useState(null);
  const [maxParticipants, setMaxParticipants] = useState(null);
  const [category, setCategory] = useState('');
  const [medium, setMedium] = useState('offline');
  const [meetLink, setMeetLink] = useState('');
  const [meetId, setMeetId] = useState('');
  const [meetPassword, setMeetPassword] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [fetchedDoc, setFetchedDoc] = useState(null);
  const [fetchingDoc, setFetchingDoc] = useState(false);
  const [tnc, setTnc] = useState(null);
  const [acceptingAttendance, setAcceptingAttendance] = useState(false);
  const [acceptingRsvp, setAcceptingRsvp] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  // To fetch clubs created by the user
  const fetchClubs = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/club`, {
        headers: {
          Authorization: `Bearer ${process.env.JWT_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch clubs.');
      }

      const clubsData = await response.json();
      setClubs(clubsData); // Assuming the API returns an array of clubs
    } catch (err) {
      toast.error(err.message);
    }
  }, [API_BASE_URL]);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(`${API_BASE_URL}/user/${token}`, {
          headers: {
            Authorization: `Bearer ${process.env.JWT_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data.');
        }

        const userData = await response.json();
        setUserId(userData.id);
      } catch (err) {
        toast.error(err.message);
      }
    }
  }, [API_BASE_URL]);
  useEffect(() => {
    fetchClubs();
    fetchUser();
  }, [fetchClubs, fetchUser]);

  const handleImage = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageError('');
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const getEventById = useCallback(async () => {
    try {
      setFetchingDoc(true);
      const response = await fetch(`${API_BASE_URL}/event/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch event data.');
      }

      const event = await response.json();

      const {
        title,
        description,
        location,
        startDate,
        endDate,
        maxParticipants,
        category,
        medium,
        meet,
        privacy,
        image,
        duration,
        language,
        tnc,
        acceptingAttendance,
        acceptingRsvp,
      } = event;

      setFetchedDoc(event);
      setTitle(title);
      setDescription(description);
      setLocation(location[0]);
      setLatitude(location[1]);
      setLongitude(location[2]);
      setStartDate(startDate);
      setEndDate(endDate);
      setDuration(duration);
      setLanguage(language);
      setMaxParticipants(maxParticipants);
      setCategory(category);
      setMedium(medium);
      setMeetLink(meet[0]);
      setMeetId(meet[1]);
      setMeetPassword(meet[2]);
      setPrivacy(privacy);
      setImage(image);
      setImagePreview(image);
      setTnc(tnc);
      setAcceptingAttendance(acceptingAttendance);
      setAcceptingRsvp(acceptingRsvp);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setFetchingDoc(false);
    }
  }, [id, API_BASE_URL]);

  useEffect(() => {
    if (id) getEventById();
  }, [getEventById]);

  const getUpdatedValues = value => {
    const updatedObj = {};
    if (value.title !== fetchedDoc?.title) {
      updatedObj.title = title;
    }
    if (value?.acceptingAttendance !== fetchedDoc?.acceptingAttendance) {
      updatedObj.acceptingAttendance = acceptingAttendance;
    }
    if (value?.acceptingRsvp !== fetchedDoc?.acceptingRsvp) {
      updatedObj.acceptingRsvp = acceptingRsvp;
    }
    if (value.tnc !== fetchedDoc?.tnc) {
      updatedObj.tnc = tnc;
    }
    if (value.description !== fetchedDoc?.description) {
      updatedObj.description = description;
    }
    if (
      new Date(value.startDate).toUTCString() !==
      new Date(fetchedDoc?.startDate?.split('+')[0]).toUTCString()
    ) {
      updatedObj.startDate = startDate.length > 0 ? startDate : null;
    }
    if (
      new Date(value.endDate).toUTCString() !==
      new Date(fetchedDoc?.endDate?.split('+')[0]).toUTCString()
    ) {
      updatedObj.endDate = endDate?.length > 0 ? endDate : null;
    }
    if (value?.maxParticipants !== fetchedDoc?.maxParticipants) {
      updatedObj.maxParticipants = maxParticipants;
    }
    if (value?.duration !== fetchedDoc?.duration) {
      updatedObj.duration = duration;
    }
    if (value?.language !== fetchedDoc?.language) {
      updatedObj.language = language;
    }
    if (value.category !== fetchedDoc?.category) {
      updatedObj.category = category;
    }
    if (value.privacy !== fetchedDoc?.privacy) {
      updatedObj.privacy = privacy;
    }
    if (value.imageId !== fetchedDoc?.imageId) {
      updatedObj.imageId = value.imageId;
      updatedObj.image = value.image;
    }
    if (value.medium !== fetchedDoc?.medium) {
      updatedObj.medium = medium;
    }
    updatedObj.location = value.location;
    updatedObj.meet = value.meet;
    return updatedObj;
  };

  const handleCreateEvent = async e => {
    e?.preventDefault();
    const token = localStorage.getItem('token');

    setSigningin(true);
    setValidateMessage(null);

    try {
      // Validate required fields
      if (!title) throw new Error('Please provide a title for your event.');
      if (!description)
        throw new Error('Please provide a description for your event.');
      if (!privacy) throw new Error('Please provide privacy for your event.');
      if (!startDate)
        throw new Error('Please provide a start date for your event.');
      if (endDate && new Date(endDate) < new Date(startDate))
        throw new Error('End date cannot be before start date.');
      if (!category)
        throw new Error('Please provide a category for your event.');
      if (medium === 'offline') {
        if (!location)
          throw new Error('Please provide a location for your event.');
        if (!latitude || isNaN(latitude))
          throw new Error('Latitude must be a valid number.');
        if (!longitude || isNaN(longitude))
          throw new Error('Longitude must be a valid number.');
      }
      if (medium === 'online' && !meetLink)
        throw new Error('Please provide a meeting link for your event.');

      // Build payload
      const payload = {
        title,
        club_id: selectedClub, // Provided club_id
        description,
        location: medium === 'offline' ? location : null,
        participants: [], // Explicitly set to an empty array
        max_participants: maxParticipants || 0,
        latitude: medium === 'offline' ? parseFloat(latitude) : null,
        longitude: medium === 'offline' ? parseFloat(longitude) : null,
        language: language || 'English',
        terms_and_conditions: tnc || '',
        category,
        medium: medium === 'offline' ? 'In Person' : 'Online', // Translate medium values
        start_date: new Date(startDate).toISOString(),
        end_date: endDate ? new Date(endDate).toISOString() : null,
        is_rsvping: acceptingRsvp || false,
        duration: duration || null,
        privacy,
        image: image ? image : null, // Ensure image is null if not provided
      };

      // API call
      const response = await fetch(
        `https://search-my-club-backend.vercel.app/api/event`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload), // Send JSON payload
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create event.');
      }

      // Success
      toast.success('Event created successfully');
      navigate(-1);
    } catch (err) {
      setValidateMessage(err.message);
      toast.error(err.message);
    } finally {
      setSigningin(false);
    }
  };

  const inputs = [
    {
      label: 'Title',
      placeholder: 'Please provide a title for your event.',
      value: title,
      cb: setTitle,
      show: true,
      required: true,
    },
    {
      label: 'Choose a Club',
      value: selectedClub,
      cb: setSelectedClub,
      type: 'select',
      options: clubs
        .filter(club => club.created_by === userId) // Filter clubs created by the user
        .map(club => ({
          label: club.name,
          value: club.id,
        })),
      show: true,
      required: true,
    },
    {
      label: 'Description',
      value: description,
      placeholder: 'Please provide a description of your event.',
      cb: setDescription,
      multiline: true,
      show: true,
      required: true,
      type: 'textarea',
    },
    {
      label: 'Privacy',
      value: privacy,
      placeholder: 'Please provide a medium for your event.',
      cb: setPrivacy,
      options: [
        {
          label: 'Public',
          value: 'public',
        },
        {
          label: 'Private',
          value: 'private',
        },
      ],
      show: true,
      required: true,
    },
    {
      label: 'Medium',
      value: medium,
      placeholder: 'Please provide a medium for your event.',
      cb: setMedium,
      options: [
        {
          label: 'Online',
          value: 'online',
        },
        {
          label: 'In Person',
          value: 'offline',
        },
      ],
      show: true,
      required: true,
    },
    {
      label: 'Start Date-Time',
      value: startDate,
      placeholder: 'Please provide a start date for your event.',
      cb: setStartDate,
      show: true,
      required: true,
      type: 'datetime-local',
    },
    {
      label: 'End Date-Time',
      value: endDate,
      placeholder: 'Please provide an end date for your event.',
      cb: setEndDate,
      show: true,
      type: 'datetime-local',
    },
    {
      label: 'Duration',
      value: duration,
      placeholder: 'Please provide a duration for your event. (hh:mm)',
      cb: setDuration,
      show: true,
      type: 'string',
    },
    {
      label: 'Language',
      value: language,
      placeholder: 'Please provide a language for your event.',
      cb: setLanguage,
      show: true,
      type: 'string',
    },
    {
      label: 'Max Participants (i.e. RSVPs)',
      value: maxParticipants,
      placeholder:
        'Please provide a maximum number of participants for your event.',
      cb: setMaxParticipants,
      type: 'number',
      show: true,
    },
    {
      label: 'Category',
      value: category,
      placeholder: 'Please provide a category for your event.',
      cb: setCategory,
      show: true,
      options: categories,
      required: true,
    },
    {
      label: 'Terms and Conditions',
      value: tnc,
      placeholder: 'Please provide terms and conditions for your event.',
      cb: setTnc,
      multiline: true,
      show: true,
      type: 'textarea',
    },
    {
      label: 'Location Name',
      value: location,
      placeholder: 'Please provide a location for your event.',
      cb: setLocation,
      show: medium === 'offline',
      required: medium === 'offline',
    },
    {
      label: 'Latitude',
      value: latitude,
      placeholder: 'Please provide a latitude for your event.',
      cb: setLatitude,
      inputMode: 'numeric',
      show: medium === 'offline',
      required: medium === 'offline',
    },
    {
      label: 'Longitude',
      value: longitude,
      placeholder: 'Please provide a longitude for your event.',
      cb: setLongitude,
      inputMode: 'numeric',
      show: medium === 'offline',
      required: medium === 'offline',
    },
    {
      label: 'Meet Link',
      value: meetLink,
      placeholder: 'Please provide a meet link for your event.',
      cb: setMeetLink,
      type: 'url',
      show: medium === 'online',
    },
    {
      label: 'Meet ID',
      value: meetId,
      placeholder: 'Please provide a meet ID for your event.',
      cb: setMeetId,
      show: medium === 'online',
    },
    {
      label: 'Meet Password',
      value: meetPassword,
      placeholder: 'Please provide a meet password for your event.',
      cb: setMeetPassword,
      show: medium === 'online',
    },
    // {
    //   label: "Accepting Attendances",
    //   value: acceptingAttendance,
    //   // placeholder: "Please provide a meet password for your event.",
    //   cb: setAcceptingAttendance,
    //   show: true,
    //   options: [
    //     {
    //       label: "Yes",
    //       value: true,
    //     },
    //     {
    //       label: "No",
    //       value: false,
    //     },
    //   ],
    // },
    {
      label: 'Accepting RSVPs',
      value: acceptingRsvp,
      // placeholder: "Please provide a meet password for your event.",
      cb: setAcceptingRsvp,
      show: true,
      options: [
        {
          label: 'Yes',
          value: true,
        },
        {
          label: 'No',
          value: false,
        },
      ],
    },
  ];

  const removeImage = e => {
    e?.preventDefault();
    setImagePreview(prev => null);
    setImage(prev => null);
  };

  return {
    inputs,
    validateMessage,
    signingin,
    setSigningin,
    setValidateMessage,
    imageError,
    setImageError,
    fileRef,
    handleCreateEvent,
    handleImage,
    imagePreview,
    setImagePreview,
    setImage,
    removeImage,
    id,
    fetchingDoc,
  };
}
export default CreateEventLogic;
