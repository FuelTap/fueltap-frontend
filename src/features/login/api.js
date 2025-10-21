import { axiosInstance } from '@/api/axios';

export async function login(data) {
  const loginResponse = await axiosInstance.post('/v1/auth/login', data);

  return loginResponse.data;
}
