import { axiosInstance } from '@/api/axios';
import { clearUserData, updateTokens } from '@/features/login/userSlice';
import { clearFromStorage, saveToLocalStorage } from '@/utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const useRefresh = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((store) => store.user);

  const { refreshToken } = userState;
  async function refresh() {
    try {
      console.log('Attempting to refresh with token:', refreshToken);
      const response = await axiosInstance.post('v1/auth/refresh-token', {
        refreshToken,
      });
      console.log('Refresh response:', response.data);

      if (response.data) {
        const { accessToken, refreshToken: newRefreshToken } =
          response.data.data;
        dispatch(
          updateTokens({
            accessToken,
            refreshToken: newRefreshToken,
          })
        );
        saveToLocalStorage('userData', {
          ...userState,
          accessToken,
          refreshToken: newRefreshToken,
        });
        return accessToken;
      }
    } catch (error) {
      if (error.status === 403) {
        dispatch(clearUserData());
        clearFromStorage('userData');
        navigate('/login');
        toast.info('Timeout, please re-login');
      }
      return null;
    }
  }
  return refresh;
};

export default useRefresh;
