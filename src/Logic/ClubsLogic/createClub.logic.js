import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import { categories } from './categories'; // Ensure this path is correct

function CreateClubLogic() {
  const [validateMessage, setValidateMessage] = useState(null);
  const [signingin, setSigningin] = useState(false);

  const [searchParams] = useSearchParams();

  const id = searchParams.get('id');

  const navigate = useNavigate();

  const fileRef = useRef(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [fetchedDoc, setFetchedDoc] = useState(null);
  const [fetchingDoc, setFetchingDoc] = useState(false);
  const [imageId, setImageId] = useState(null);

  const handleImage = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageError('');
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const getClubById = useCallback(async () => {
    try {
      setFetchingDoc(true);
      const response = await fetch(
        `https://search-my-club-backend.vercel.app/api/club/${id}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch club data');
      }
      const data = await response.json();
      const { name, description, category, image, imageId } = data;
      setFetchedDoc(data);
      setName(name);
      setDescription(description);
      setCategory(category);
      setImage(image);
      setImagePreview(image);
      setImageId(imageId);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setFetchingDoc(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) getClubById();
  }, [getClubById]);

  const getUpdatedValues = value => {
    const updatedObj = {};
    if (value.name !== fetchedDoc?.name) {
      updatedObj.name = name;
    }
    if (value.description !== fetchedDoc?.description) {
      updatedObj.description = description;
    }
    if (value.category !== fetchedDoc?.category) {
      updatedObj.category = category;
    }
    if (value.imageId !== fetchedDoc?.imageId) {
      updatedObj.imageId = value.imageId;
      updatedObj.image = value.image;
    }
    return updatedObj;
  };

  const handleCreateClub = async e => {
    e?.preventDefault();
    const token = JSON.parse(localStorage.getItem('token'));

    setSigningin(true);
    setValidateMessage(null);
    try {
      if (!name) {
        throw new Error('Please provide a name for your club.');
      }
      if (!description) {
        throw new Error('Please provide a description for your club.');
      }
      if (!category) {
        throw new Error('Please provide a category for your club.');
      }
      if (image === null) {
        throw new Error('Please provide an image for your club.');
      }

      const value = {
        name,
        description,
        category,
        createdBy: token.userId,
        image: imagePreview,
      };

      const updatedValues = id ? getUpdatedValues(value) : value;

      const response = await fetch(
        'https://search-my-club-backend.vercel.app/api/club',
        {
          method: id ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            club_id: id || null,
            user_id: token.userId,
            name: updatedValues.name,
            description: updatedValues.description,
            category: updatedValues.category,
            members: [],
            events: [],
            created_at: new Date().toISOString(),
            __v: 0,
            image: '',
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create/update club');
      }

      toast.success(`Club ${id ? 'updated' : 'created'} successfully`);
      navigate('/dashboard/clubs');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSigningin(false);
    }
  };

  const inputs = [
    {
      label: 'Name',
      placeholder: 'Please provide a name for your club.',
      value: name,
      cb: setName,
      show: true,
      required: true,
    },
    {
      label: 'Description',
      value: description,
      placeholder: 'Please provide a description of your club.',
      cb: setDescription,
      multiline: true,
      show: true,
      required: true,
      type: 'textarea',
    },
    {
      label: 'Category',
      value: category,
      placeholder: 'Please provide a category for your club.',
      cb: setCategory,
      show: true,
      options: categories,
      required: true,
    },
  ];

  const removeImage = e => {
    e?.preventDefault();
    setImagePreview(null);
    setImage(null);
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
    handleCreateClub,
    handleImage,
    imagePreview,
    setImagePreview,
    setImage,
    removeImage,
    id,
    fetchingDoc,
  };
}

export default CreateClubLogic;
