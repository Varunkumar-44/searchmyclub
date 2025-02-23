import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://search-my-club-backend.vercel.app/';

function PhoneLogic() {
  const [phone, setPhone] = useState('');
  const [requesting, setRequesting] = useState(false);
  const [validateMessage, setValidateMessage] = useState(null);

  const navigate = useNavigate();

  const requestOTP = async e => {
    e?.preventDefault();
    setRequesting(true);
    setValidateMessage(null);

    try {
      await axios.post(`${API_BASE_URL}user/request-otp`, {
        phone,
      });

      toast.success('OTP sent successfully');
      navigate('/auth/otp', { state: { phone }, replace: true });
    } catch (error) {
      setValidateMessage(
        error.response?.data?.message || 'Failed to request OTP'
      );
      toast.error(error.response?.data?.message || 'Failed to request OTP');
    } finally {
      setRequesting(false);
    }
  };

  return {
    inputs: [
      {
        label: 'Phone',
        placeholder: 'Enter your phone number',
        value: phone,
        cb: setPhone,
        type: 'text',
      },
    ],
    validateMessage,
    requesting,
    requestOTP,
  };
}

export default PhoneLogic;
