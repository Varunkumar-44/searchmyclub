import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'https://search-my-club-backend.vercel.app/';

function LoginLogic() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validateMessage, setValidateMessage] = useState(null);
  const [signingin, setSigningin] = useState(false);

  const navigate = useNavigate();

  const loginUser = async e => {
    e?.preventDefault();
    setSigningin(true);
    setValidateMessage(null);

    try {
      const response = await axios.post(`${API_BASE_URL}api/auth/login`, {
        email,
        password,
      });

      // Extract user_id from the response
      const { user_id, message } = response.data;

      if (user_id) {
        // Save the user_id to localStorage as "token"
        console.log('user_id', user_id);
        window.localStorage.setItem('token', user_id);

        // Show success toast
        toast.success(message || 'Logged in successfully');

        // Navigate to the home page (or any other page after successful login)
        navigate('/', { replace: true });
      } else {
        throw new Error('Login response missing user_id');
      }
    } catch (error) {
      // Set validation message for UI feedback
      setValidateMessage(
        error.response?.data?.message || error.message || 'Login failed'
      );
      toast.error(
        error.response?.data?.message || error.message || 'Login failed'
      );
    } finally {
      setSigningin(false);
    }
  };

  return {
    inputs: [
      {
        label: 'Email',
        placeholder: 'example@email.com',
        value: email,
        cb: setEmail,
        type: 'email',
      },
      {
        label: 'Password',
        placeholder: 'Please pick a strong password',
        value: password,
        cb: setPassword,
        inputMode: 'text',
        keyboard: 'default',
        type: !showPass ? 'password' : 'text',
        rightIcon: (
          <button
            onClick={e => {
              e.preventDefault();
              setShowPass(prev => !prev);
            }}
          >
            {showPass ? '👁️' : '🙈'}
          </button>
        ),
      },
    ],
    validateMessage,
    signingin,
    setSigningin,
    setValidateMessage,
    loginUser,
  };
}

export default LoginLogic;
