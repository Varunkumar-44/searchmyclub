import { useState } from 'react';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://search-my-club-backend.vercel.app/';

function SignupLogic() {
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
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
      label: 'Phone Number',
      name: 'phone',
      placeholder: '+91 1234567890',
      value: phone,
      cb: setPhone,
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

    try {
      // Send request to create a new user in the backend
      const response = await axios.post(
        `${API_BASE_URL}api/auth/signup`,
        {
          name,
          email,
          password,
          phone,
          role: 'member',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.JWT_KEY}`,
          },
        }
      );

      // Create session or token after successful signup
      localStorage.setItem('token', response.data.user_id);

      toast.success('Signed up successfully');
      navigate('/auth/phone', {
        replace: true,
        state: { email, password },
      });
    } catch (error) {
      setValidateMessage(error.response?.data?.message || 'Sign up failed');
      toast.error(error.response?.data?.message || 'Sign up failed');
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
