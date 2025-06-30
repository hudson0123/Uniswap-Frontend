import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect } from 'react'

export default function AuthProvider({children}: PropsWithChildren) {

  const router = useRouter();
  const access = useAuthStore((state) => state.access);
  
  
  useEffect(() => {
    const currentPath = router.pathname;
    const protectedRoutes = currentPath.startsWith('/app') || currentPath.startsWith('/auth/verify')
  
    if (!access && protectedRoutes) {
      router.push('/auth/login');
    }
  }, [router, access])

  return children;
}
