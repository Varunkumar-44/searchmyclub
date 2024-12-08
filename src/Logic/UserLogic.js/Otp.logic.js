import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

const API_BASE_URL = 'https://search-my-club-backend.vercel.app/';

function OtpLogic() {
  const [otp, setOtp] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [validateMessage, setValidateMessage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;

  const verifyOTP = async e => {
    e?.preventDefault();
    setVerifying(true);
    setValidateMessage(null);

    try {
      const response = await axios.post(`${API_BASE_URL}user/verify-otp`, {
        email,
        otp,
      });

      localStorage.setItem('token', response.data.token);
      toast.success('OTP verified successfully');
      navigate('/', { replace: true });
    } catch (error) {
      setValidateMessage(
        error.response?.data?.message || 'OTP verification failed'
      );
      toast.error(error.response?.data?.message || 'OTP verification failed');
    } finally {
      setVerifying(false);
    }
  };

  return {
    inputs: [
      {
        label: 'OTP',
        placeholder: 'Enter the OTP',
        value: otp,
        cb: setOtp,
        type: 'text',
      },
    ],
    validateMessage,
    verifying,
    verifyOTP,
  };
}

export default OtpLogic;
