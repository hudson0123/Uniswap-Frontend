import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect } from 'react'

export default function AuthProvider({children}: PropsWithChildren) {

  const router = useRouter();


  useEffect(() => {
    const currentPath = router.pathname;
  
    if (currentPath.startsWith('/app') || currentPath.startsWith('/auth/verify')) {
      router.push('/auth/login');
    }
  }, [router])

  return children;
}
