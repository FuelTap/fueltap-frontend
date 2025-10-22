import { axiosInstance } from '@/api/axios';
import { clearUserData } from '@/features/login/userSlice';
import { clearFromStorage } from '@/utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const useLogout = () => {
  const {
    user: { id },
  } = useSelector((store) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function logout() {
    const confirm = window.confirm('Are you sure you want to logout?');
    if (!confirm) return;
    try {
      const response = await axiosInstance.post('v1/auth/logout', {
        userId: id,
      });
      if (response.data) {
        toast.success(response.data.message);
        dispatch(clearUserData());
        clearFromStorage('userData');
        navigate('/login');
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
    }
  }
  return logout;
};

export default useLogout;
