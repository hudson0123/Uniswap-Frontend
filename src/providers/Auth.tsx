import { useAuthStore } from '@/lib/store';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react'

export default function AuthProvider({children}: PropsWithChildren) {

  const router = useRouter();
  const access = useAuthStore((state) => state.access);
  const [ready, setReady] = useState(false);
  
  
  useEffect(() => {
    
    const currentPath = router.pathname;
    const protectedRoutes = currentPath.startsWith('/app') || currentPath.startsWith('/auth/verify')
  
    // If not authenticated and trying to access a protected route, redirect to login
    if (!access && protectedRoutes) {
      router.replace('/auth/login');
      return;
    }

    // If authenticated and trying to access login or register, redirect to app
    if (access && (currentPath === '/auth/login' || currentPath === '/auth/register')) {
      router.replace('/app');
      return;
    }

    setReady(true);
  }, [router, access])

  if (!ready) {
    <div className="flex items-center justify-center h-screen w-full">
          <Image
            width={50}
            height={50}
            className="my-auto mx-auto mt-20"
            alt="loading"
            src={"/loading.svg"}
          />
    </div>
  }
  return children;
}
