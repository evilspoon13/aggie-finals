

/*
'use client';


import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/app/util/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || '/dashboard';
  
  useEffect(() => {
    const handleCallback = async () => {
      try {
        // The auth callback is automatically handled by Supabase
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        // Redirect back to the original page or dashboard
        router.push(returnTo);
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/login?error=Authentication+failed');
      }
    };
    
    handleCallback();
  }, [router, returnTo]);
  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Completing authentication, please wait...</p>
    </div>
  );
}
  */