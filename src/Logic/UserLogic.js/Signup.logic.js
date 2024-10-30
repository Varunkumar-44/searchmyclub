import { useState } from 'react';
import { Account, ID, Databases } from 'appwrite';
import client from '../../appwrite.config.js';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function SignupLogic() {
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [CPassword, setCPassword] = useState('');
  const [validateMessage, setValidateMessage] = useState(null);
  const [signingin, setSigningin] = useState(false);

  const navigate = useNavigate();

  const inputs = [
    {
      label: 'Name',
      name: 'name',
      placeholder: 'John Doe',
      value: name,
      cb: setName,
      required: true,
    },
    {
      label: 'Email',
      name: 'email',
      placeholder: 'example@email.com',
      value: email,
      type: 'email',
      cb: setEmail,
      required: true,
    },
    {
      label: 'Password',
      name: 'password',
      placeholder: 'Please pick a strong password',
      value: password,
      cb: setPassword,
      type: !showPass ? 'password' : 'text',
      required: true,
      rightIcon: (
        <button
          onClick={e => {
            e?.preventDefault();
            setShowPass(prev => !prev);
          }}
        >
          {showPass ? (
            <AiOutlineEye size={24} />
          ) : (
            <AiOutlineEyeInvisible size={24} />
          )}
        </button>
      ),
    },
    {
      label: 'Confirm Password',
      placeholder: 'Please retype password',
      name: 'cpassword',
      value: CPassword,
      cb: setCPassword,
      required: true,
      type: !showCPass ? 'password' : 'text',
      rightIcon: (
        <button
          onClick={e => {
            e?.preventDefault();
            setShowCPass(prev => !prev);
          }}
        >
          {showCPass ? (
            <AiOutlineEye size={24} />
          ) : (
            <AiOutlineEyeInvisible size={24} />
          )}
        </button>
      ),
    },
  ];

  const navigateToPhone = e => {
    e?.preventDefault();
    navigate('/auth/phone');
  };

  const signUpUser = async e => {
    e?.preventDefault();
    if (!name || !email || !password || !CPassword) {
      toast.error('Please fill all fields');
      setValidateMessage('Please fill all fields');
      return;
    }
    if (password !== CPassword) {
      toast.error('Passwords do not match');
      setValidateMessage('Passwords do not match');
      return;
    }
    setSigningin(true);
    setValidateMessage(null);

    const account = new Account(client);
    const database = new Databases(client);

    try {
      // Create user in Appwrite
      const response = await account.create(ID.unique(), email, password, name);

      // Add user to database including the CPassword attribute
      await database.createDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_USERS_COLLECTION_ID,
        ID.unique(),
        {
          Name: name, // Ensure this matches the exact casing
          email: email, // Ensure this matches the exact casing
          password: password, // Include password
          CPassword: CPassword, // Include CPassword (if necessary)
          userId: response.$id,
        }
      );

      // Create session
      const loggedInResponse = await account.createEmailSession(
        email,
        password
      );

      localStorage.setItem('token', JSON.stringify(loggedInResponse));
      toast.success('Signed up successfully');
      navigate('/auth/phone', {
        replace: true,
        state: {
          ...loggedInResponse,
          email,
          password,
        },
      });
    } catch (error) {
      setValidateMessage(error.message);
      toast.error(error.message);
      console.error('Sign Up Error:', error); // Log the error for debugging
    } finally {
      setSigningin(false);
    }
  };

  return {
    inputs,
    validateMessage,
    signingin,
    setSigningin,
    setValidateMessage,
    showPass,
    setShowCPass,
    showCPass,
    setShowPass,
    email,
    setEmail,
    name,
    setName,
    password,
    setPassword,
    CPassword,
    setCPassword,
    signUpUser,
    navigateToPhone,
  };
}

export default SignupLogic;
