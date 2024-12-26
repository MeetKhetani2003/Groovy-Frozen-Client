import { useUser } from '@/zustand/apis/userState';

export const useUsers = () => {
  const { userData, setUserData, getAllUsers } = useUser();
  const getAllUserData = async () => {
    try {
      const response = await getAllUsers();
      if (Array.isArray(response)) {
        setUserData(response);
      } else {
        console.error('API did not return an array:', response);
      }
      return response;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return { userData, getAllUserData };
};
