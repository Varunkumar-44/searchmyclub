import React, { useEffect, useState } from 'react';
import Avatar from '../../components/Avatar';
import Input from '../../components/Input';
import { MdVerified } from 'react-icons/md';
import client from '../../appwrite.config';
import { Account as Ac, Databases, Query } from 'appwrite';
import { toast } from 'react-hot-toast';
import Button from '../../components/Button';
import { useUser } from '../../context/userContext';

function Account() {
  const [loading, setLoading] = useState(false);
  const [updateFields, setUpdateFields] = useState(false);

  const { userInfo, setUserInfo } = useUser();

  // const user = localStorage.getItem("spotlight-user");

  const {
    user_id,
    name: userName,
    email: userEmail,
    phone: userPhone,
    emailVerification,
    phoneVerification,
  } = userInfo;

  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState(userPhone);

  const verifyEmail = async e => {
    e.preventDefault();

    try {
      setLoading(true);
      // Simulate email verification logic if required
      toast.success('Verification email sent');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Failed to send verification email');
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    {
      label: 'Name',
      type: 'text',
      name: 'name',
      value: name,
      cb: setName,
      disabled: !updateFields,
      required: true,
    },
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      value: email,
      cb: setEmail,
      disabled: true, // Email is not editable in this UI
      rightIcon: emailVerification ? <Verified /> : <Verify cb={verifyEmail} />,
    },
    {
      label: 'Phone',
      type: 'tel',
      name: 'phone',
      value: phone,
      cb: setPhone,
      disabled: true, // Phone is not editable in this UI
      rightIcon: phoneVerification ? <Verified /> : <Verify />,
    },
  ];

  const revalidateFields = updatedUser => {
    setUserInfo(updatedUser); // Update context
    setName(updatedUser.name);
    setEmail(updatedUser.email);
    setPhone(updatedUser.phone);
    localStorage.setItem('spotlight-user', JSON.stringify(updatedUser)); // Update local storage
  };

  const handleUpdateFields = async e => {
    e.preventDefault();
    try {
      setLoading(true);

      // Make PATCH request to update user info
      const response = await fetch(
        `https://search-my-club-backend.vercel.app/api/user/${user_id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token for authorization
          },
          body: JSON.stringify({
            name,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }

      const updatedUser = await response.json();
      toast.success('Profile updated successfully!');
      revalidateFields(updatedUser); // Update state with the response data
    } catch (err) {
      toast.error(err.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!updateFields) {
      setName(userName);
      setEmail(userEmail);
      setPhone(userPhone);
    }
  }, [updateFields, userName, userEmail, userPhone]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4">
      <Avatar size={'text-3xl'} name={userName} />
      <h1 className="page-title">Hello, {userName}</h1>
      <form
        onSubmit={handleUpdateFields}
        className="flex flex-col gap-4 w-full max-w-[400px]"
      >
        {inputFields?.map((field, index) => (
          <Input key={index} {...field} show={true} />
        ))}
        <button
          className="rounded-[18px] bg-neutral-300 mt-2 p-4 outline outline-1 outline-neutral-300"
          onClick={e => {
            e.preventDefault();
            setUpdateFields(prev => !prev);
          }}
        >
          {updateFields ? 'Cancel' : 'Edit'}
        </button>
        {updateFields && (
          <Button
            type="submit"
            className="primary-btn"
            style="mt-0"
            text={'Save'}
            disabled={!updateFields}
            loading={loading}
          />
        )}
      </form>
    </div>
  );
}

export default Account;

function Verified() {
  return (
    <p className="bg-green-600 rounded-[18px] p-2 py-1 inline-flex text-white gap-1 items-center">
      <MdVerified /> Verified
    </p>
  );
}

function Verify({ cb }) {
  return (
    <button onClick={cb} className="primary-btn">
      Verify
    </button>
  );
}
