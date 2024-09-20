'use client';

import { useState, useCallback, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export const useSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<string | null>(null);

  useEffect(() => {
    if (pathname) {
      setActivePath(pathname);
    }
  }, [pathname]);

  const handleNavigation = useCallback((path: string) => {
    setActivePath(path);
    router.push(path);
  }, [router]);

  return { activePath, handleNavigation };
};