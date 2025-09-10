import { useQuery } from '@tanstack/react-query';
import { IUser } from '@/@types';
import api from '@/lib/api';
import { useAuthStore } from '@/lib/store';

export default function useCurrentUser() {
  const access = useAuthStore((state) => state.access);

  const { data, error, isPending } = useQuery<IUser>({
    enabled: access !== null,
    queryKey: ['currentUser'],
    queryFn: async () => {
      const res = await api.get('/api/current-user/');
      return res.data;
    },
  });

  return { data, error, isPending };
}
