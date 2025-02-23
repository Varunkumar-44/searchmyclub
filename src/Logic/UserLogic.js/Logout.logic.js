import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function LogoutLogic() {
  const navigate = useNavigate();

  const logout = async e => {
    e?.preventDefault();

    // const account = async e => {
    //   e?.preventDefault();

    //   try {
    //     // Send API request to invalidate the user's session
    //     const response = await fetch(
    //       `https://search-my-club-backend.vercel.app/api/user/${localStorage.getItem('token')}`, // Replace with your logout API endpoint
    //       {
    //         method: 'GET',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           Authorization: `Bearer ${process.env.JWT_KEY}`, // Include the token
    //         },
    //       }
    //     );

    //     if (!response.ok) {
    //       const errorData = await response.json();
    //       throw new Error(errorData.message || 'Failed to log out');
    //     }

    //     localStorage.removeItem('token');
    //     localStorage.removeItem('spotlight-user');

    //     // Show success message and navigate to login
    //     toast.success('Logged out successfully');
    //     navigate('/');
    //   } catch (error) {
    //     // Show error message
    //     toast.error(error.message || 'Error during logout');
    //   }
    // };

    try {
      localStorage.removeItem('token');
      localStorage.removeItem('spotlight-user');
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };
  return { logout };
}

export default LogoutLogic;
